import * as THREE from "three";
import {
  CAMERA,
  PARTS,
  STOP_AT,
  STOP_PARTS,
  STOP_RADIUS,
  cameraState,
  circlePoints,
  explodeAmount,
  focusWeights,
  gearPoints,
  partCenter,
  semicirclePoints,
  spiralPoints,
  type StopPart,
  type Vec2,
} from "@/lib/watch-parts";

/**
 * The scroll-driven scene. Loaded only on a wide viewport with WebGL and no
 * reduced-motion preference, and only after hydration, so nothing here runs
 * on the server or on mobile.
 *
 * Rendering is a line drawing: every part is a cream fill (which occludes
 * whatever is behind it) plus ink crease edges, plus an inverted hull for the
 * silhouette. No lights, no materials beyond MeshBasicMaterial, no textures.
 *
 * The render loop is event-driven: a frame is drawn on scroll and resize,
 * and only while the container is on screen. Scene state is a pure function
 * of scroll progress (see lib/watch-parts.ts); nothing here eases over time.
 */

const CREAM = 0xf6f1e7;
const INK = 0x1c1a17;
const OCHRE = 0xb8862f;
const MUTED = 0x645d52;
/** Outline width as a fraction of camera distance, so it stays about 1.5px. */
const OUTLINE_PER_DISTANCE = 0.0015;

export type SceneHandle = { dispose(): void };

type MountOptions = {
  root: HTMLElement;
  stage: HTMLElement;
  captions: HTMLElement[];
  onLost: () => void;
};

type Piece = { object: THREE.Object3D; baseY: number; lift: number };
type Part = {
  pieces: Piece[];
  line: THREE.LineBasicMaterial;
  hull: THREE.MeshBasicMaterial;
};
type Hull = { mesh: THREE.Mesh; extent: number };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function shapeFrom(outline: Vec2[], holes: Vec2[][] = []) {
  // Shape space is XY; after rotateX(-90°) shape Y becomes -Z, so negate Z
  // here to keep the same handedness as the SVG frame.
  const shape = new THREE.Shape(outline.map(([x, z]) => new THREE.Vector2(x, -z)));
  for (const hole of holes) {
    shape.holes.push(new THREE.Path(hole.map(([x, z]) => new THREE.Vector2(x, -z))));
  }
  return shape;
}

function extrudeY(shapes: THREE.Shape | THREE.Shape[], depth: number) {
  const geometry = new THREE.ExtrudeGeometry(shapes, { depth, bevelEnabled: false, curveSegments: 4 });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

/** A closed profile of [radius, y] pairs, turned about Y. Winding is made outward. */
function lathe(profile: Vec2[]) {
  const geometry = new THREE.LatheGeometry(
    profile.map(([r, y]) => new THREE.Vector2(r, y)),
    72,
  );
  // The inverted hull relies on outward winding. Check it from the faces
  // themselves rather than from vertex normals, which average away on
  // profiles with inner walls.
  const index = geometry.index!;
  const pos = geometry.attributes.position;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const n = new THREE.Vector3();
  let radial = 0;
  for (let i = 0; i < index.count; i += 3) {
    a.fromBufferAttribute(pos, index.getX(i));
    b.fromBufferAttribute(pos, index.getX(i + 1));
    c.fromBufferAttribute(pos, index.getX(i + 2));
    n.subVectors(b, a).cross(c.sub(a));
    const cx = (a.x + b.x + c.x) / 3;
    const cz = (a.z + b.z + c.z) / 3;
    radial += n.x * cx + n.z * cz;
  }
  if (radial < 0) geometry.scale(1, 1, -1);
  return geometry;
}

function lineFrom(points: Vec2[], y: number, material: THREE.Material) {
  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map(([x, z]) => new THREE.Vector3(x, y, z)),
  );
  return new THREE.Line(geometry, material);
}

export function mountScene({ root, stage, captions, onLost }: MountOptions): SceneHandle {
  let disposed = false;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(CREAM, 1);
  const canvas = renderer.domElement;
  canvas.className = "overture-canvas";
  canvas.setAttribute("aria-hidden", "true");
  stage.prepend(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(CAMERA.fov, 1, 0.1, 60);

  const fill = new THREE.MeshBasicMaterial({
    color: CREAM,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  const inkLine = new THREE.LineBasicMaterial({ color: INK });
  // The hull carries the same polygon offset as the fill so the two keep
  // their depth relationship at grazing angles; only the lines sit in front.
  const hullOptions = {
    side: THREE.BackSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  } as const;
  const inkHull = new THREE.MeshBasicMaterial({ color: INK, ...hullOptions });
  const axisMaterial = new THREE.LineDashedMaterial({ color: MUTED, dashSize: 0.07, gapSize: 0.05 });

  const parts = new Map<StopPart | "plate", Part>();
  const hulls: Hull[] = [];
  const makePart = (key: StopPart | "plate") => {
    const part: Part =
      key === "plate"
        ? { pieces: [], line: inkLine, hull: inkHull }
        : {
            pieces: [],
            line: new THREE.LineBasicMaterial({ color: INK }),
            hull: new THREE.MeshBasicMaterial({ color: INK, ...hullOptions }),
          };
    parts.set(key, part);
    return part;
  };

  /** Fill + crease edges + silhouette hull, as one group at a local origin. */
  const outlined = (geometry: THREE.BufferGeometry, part: Part, extent: number) => {
    const group = new THREE.Group();
    group.add(new THREE.Mesh(geometry, fill));
    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 24), part.line));
    const hull = new THREE.Mesh(geometry, part.hull);
    hulls.push({ mesh: hull, extent });
    group.add(hull);
    return group;
  };

  const place = (part: Part, object: THREE.Object3D, x: number, baseY: number, z: number, lift: number) => {
    object.position.set(x, baseY, z);
    scene.add(object);
    part.pieces.push({ object, baseY, lift });
  };

  // Mainplate
  {
    const p = PARTS.plate;
    const part = makePart("plate");
    const g = lathe([
      [p.hole, 0],
      [p.radius, 0],
      [p.radius, p.thickness],
      [p.hole, p.thickness],
      [p.hole, 0],
    ]);
    place(part, outlined(g, part, p.radius), 0, p.y, 0, p.lift);
  }

  // Mainspring barrel
  {
    const b = PARTS.barrel;
    const part = makePart("barrel");
    const cup = lathe([
      [b.hub, 0],
      [b.radius, 0],
      [b.radius, b.height],
      [b.radius - b.wall, b.height],
      [b.radius - b.wall, b.floor],
      [b.hub, b.floor],
      [b.hub, 0],
    ]);
    const arbor = lathe([
      [0, 0],
      [b.hub, 0],
      [b.hub, b.height + 0.1],
      [0, b.height + 0.1],
    ]);
    const group = new THREE.Group();
    group.add(outlined(cup, part, b.radius));
    group.add(outlined(arbor, part, b.hub));
    group.add(lineFrom(spiralPoints(b.spring.r0, b.spring.r1, b.spring.turns), b.floor + 0.006, part.line));
    place(part, group, b.x, b.y, b.z, b.lift);
  }

  // Gear train
  {
    const t = PARTS.train;
    const part = makePart("train");
    for (const gear of t.gears) {
      const g = extrudeY(shapeFrom(gearPoints(gear.r, gear.teeth), [circlePoints(0.05, 24)]), t.thickness);
      const arbor = lathe([
        [0, -0.06],
        [0.05, -0.06],
        [0.05, t.thickness + 0.1],
        [0, t.thickness + 0.1],
      ]);
      const group = new THREE.Group();
      group.add(outlined(g, part, gear.r));
      group.add(outlined(arbor, part, 0.05));
      place(part, group, gear.x, t.y, gear.z, t.lift + gear.lift);
    }
  }

  // Balance wheel
  {
    const b = PARTS.balance;
    const part = makePart("balance");
    const ring = new THREE.TorusGeometry(b.radius, b.tube, 6, 72);
    ring.rotateX(Math.PI / 2);
    ring.translate(0, b.tube, 0);
    const spokes = [0, 1, 2].map((i) => {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
      const w = b.spokeWidth / 2;
      const r0 = b.hub * 0.8;
      const r1 = b.radius;
      const c = Math.cos(a);
      const s = Math.sin(a);
      const pts: Vec2[] = [
        [r0 * c - w * s, r0 * s + w * c],
        [r1 * c - w * s, r1 * s + w * c],
        [r1 * c + w * s, r1 * s - w * c],
        [r0 * c + w * s, r0 * s - w * c],
      ];
      return shapeFrom(pts);
    });
    const spokeGeometry = extrudeY(spokes, b.tube);
    spokeGeometry.translate(0, b.tube / 2, 0);
    const hub = lathe([
      [0, 0],
      [b.hub, 0],
      [b.hub, b.tube * 2 + 0.05],
      [0, b.tube * 2 + 0.05],
    ]);
    const group = new THREE.Group();
    group.add(outlined(ring, part, b.radius));
    group.add(outlined(spokeGeometry, part, b.radius));
    group.add(outlined(hub, part, b.hub));
    group.add(lineFrom(spiralPoints(b.spring.r0, b.spring.r1, b.spring.turns), b.tube * 2 + 0.06, part.line));
    place(part, group, b.x, b.y, b.z, b.lift);
  }

  // Rotor
  {
    const r = PARTS.rotor;
    const part = makePart("rotor");
    const hubR = 0.3;
    const outline: Vec2[] = [
      ...semicirclePoints(r.radius),
      ...Array.from({ length: 21 }, (_, i) => {
        const a = Math.PI + (Math.PI * i) / 20;
        return [hubR * Math.cos(a), hubR * Math.sin(a)] as const;
      }),
    ];
    const g = extrudeY(shapeFrom(outline, [circlePoints(r.hole, 30)]), r.thickness);
    const hub = lathe([
      [0, -0.05],
      [r.hole * 0.7, -0.05],
      [r.hole * 0.7, r.thickness + 0.08],
      [0, r.thickness + 0.08],
    ]);
    const group = new THREE.Group();
    group.add(outlined(g, part, r.radius));
    group.add(outlined(hub, part, r.hole));
    place(part, group, 0, r.y, 0, r.lift);
  }

  // Central axis, dashed, from below the plate to above the rotor.
  const axisGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, -0.3, 0),
    new THREE.Vector3(0, 1, 0),
  ]);
  const axis = new THREE.Line(axisGeometry, axisMaterial);
  scene.add(axis);

  // ---- per-frame state ----------------------------------------------------

  const ink = new THREE.Color(INK);
  const ochre = new THREE.Color(OCHRE);
  const projected = new THREE.Vector3();
  const target = new THREE.Vector3();
  const edge = new THREE.Vector3();
  const right = new THREE.Vector3();
  let width = 1;
  let height = 1;
  let inView = false;
  let frame = 0;

  const progress = () => {
    const rect = root.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    return travel > 0 ? clamp(-rect.top / travel, 0, 1) : 0;
  };

  const apply = (p: number) => {
    const e = explodeAmount(p);
    const f = focusWeights(p);

    for (const part of parts.values()) {
      for (const piece of part.pieces) {
        piece.object.position.y = piece.baseY + piece.lift * e;
      }
    }
    STOP_PARTS.forEach((key, i) => {
      const part = parts.get(key)!;
      part.line.color.copy(ink).lerp(ochre, f[i]);
      part.hull.color.copy(part.line.color);
    });

    const top = PARTS.rotor.y + PARTS.rotor.lift * e + PARTS.rotor.thickness + 0.35;
    axisGeometry.setFromPoints([new THREE.Vector3(0, -0.3, 0), new THREE.Vector3(0, top, 0)]);
    axis.computeLineDistances();

    const cam = cameraState(p);
    camera.position.set(...cam.position);
    camera.lookAt(...cam.target);
    camera.updateMatrixWorld();

    // Silhouette width follows camera distance so it reads as a constant
    // pen weight. Expand in the part's plane only: scaling in Y would lift
    // the hull's far wall above the fill's top face and read as a dark cap.
    for (const { mesh, extent } of hulls) {
      mesh.parent!.getWorldPosition(target);
      const s = 1 + (OUTLINE_PER_DISTANCE * camera.position.distanceTo(target)) / extent;
      mesh.scale.set(s, 1, s);
    }

    STOP_PARTS.forEach((key, i) => {
      const el = captions[i];
      if (!el) return;
      const c = partCenter(key, e);
      projected.set(c[0], c[1], c[2]).project(camera);
      const x = ((projected.x + 1) / 2) * width;
      const y = ((1 - projected.y) / 2) * height;
      // Projected half-width of the part, so the caption clears its outline.
      right.setFromMatrixColumn(camera.matrixWorld, 0);
      edge.set(c[0], c[1], c[2]).addScaledVector(right, STOP_RADIUS[key]).project(camera);
      const half = Math.abs(((edge.x + 1) / 2) * width - x);
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      let left = x + half + 28;
      if (left + w > width - 24) left = x - half - 28 - w;
      if (left < 24) left = 24;
      const topPx = clamp(y - h / 2, 24, height - h - 24);
      el.style.transform = `translate(${left.toFixed(1)}px, ${topPx.toFixed(1)}px)`;
      el.style.opacity = f[i].toFixed(3);
      el.dataset.active = f[i] > 0.05 ? "true" : "false";
    });
  };

  const render = () => {
    frame = 0;
    if (disposed) return;
    apply(progress());
    renderer.render(scene, camera);
  };

  const schedule = () => {
    if (disposed || !inView || frame) return;
    frame = requestAnimationFrame(render);
  };

  const resize = () => {
    if (disposed) return;
    const rect = stage.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    render();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);

  const intersection = new IntersectionObserver(
    (entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      if (inView) schedule();
    },
    { threshold: 0 },
  );
  intersection.observe(root);

  window.addEventListener("scroll", schedule, { passive: true });

  // A caption link that receives keyboard focus brings its stop into view,
  // so the overlay is reachable by Tab even though it is only fully visible
  // at its own scroll position.
  const focusHandlers = captions.map((el, i) => {
    const handler = () => {
      const rect = root.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const top = rect.top + window.scrollY + STOP_AT[i] * travel;
      window.scrollTo({ top, behavior: "auto" });
    };
    el.addEventListener("focusin", handler);
    return handler;
  });

  const contextLost = (event: Event) => {
    event.preventDefault();
    if (!disposed) onLost();
  };
  canvas.addEventListener("webglcontextlost", contextLost);

  resize();

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    canvas.removeEventListener("webglcontextlost", contextLost);
    resizeObserver.disconnect();
    intersection.disconnect();
    captions.forEach((el, i) => {
      el.removeEventListener("focusin", focusHandlers[i]);
      el.style.transform = "";
      el.style.opacity = "";
      delete el.dataset.active;
    });

    const materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
        object.geometry.dispose();
        const m = object.material as THREE.Material | THREE.Material[];
        (Array.isArray(m) ? m : [m]).forEach((mat) => materials.add(mat));
      }
    });
    materials.forEach((m) => m.dispose());
    renderer.dispose();
    canvas.remove();
  };

  return { dispose };
}
