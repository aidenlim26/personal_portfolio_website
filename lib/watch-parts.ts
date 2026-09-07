/**
 * The watch movement, as numbers. Shared by the static SVG frame (rendered on
 * the server) and the Three.js scene (built on the client), so the two agree
 * about what the movement looks like. No Three.js import here.
 *
 * Units are arbitrary. Y is up. The mainplate sits at y = 0 and every other
 * part is stacked above it. `lift` is how far a part rises when the movement
 * is fully exploded.
 */
export type Vec2 = readonly [number, number];

export const PARTS = {
  plate: { y: 0, radius: 1.75, hole: 0.16, thickness: 0.08, lift: 0 },
  barrel: {
    x: -0.8,
    z: 0.38,
    y: 0.08,
    radius: 0.62,
    height: 0.26,
    wall: 0.05,
    floor: 0.04,
    hub: 0.1,
    lift: 0.55,
    spring: { r0: 0.13, r1: 0.5, turns: 5 },
  },
  train: {
    y: 0.08,
    lift: 1.05,
    thickness: 0.07,
    gears: [
      { x: 0.12, z: -0.32, r: 0.46, teeth: 24, lift: 0 },
      { x: 0.7, z: -0.02, r: 0.31, teeth: 16, lift: 0.14 },
      { x: 1.02, z: -0.52, r: 0.21, teeth: 11, lift: 0.28 },
    ],
    center: { x: 0.58, z: -0.28 },
  },
  balance: {
    x: 0.5,
    z: 0.9,
    y: 0.16,
    radius: 0.5,
    tube: 0.045,
    hub: 0.07,
    spokeWidth: 0.05,
    lift: 1.55,
    spring: { r0: 0.08, r1: 0.36, turns: 4 },
  },
  rotor: { y: 0.32, radius: 1.3, hole: 0.14, thickness: 0.07, lift: 2.2 },
} as const;

/** Stop order along the scroll, and the part each stop focuses. */
export const STOP_PARTS = ["rotor", "balance", "train", "barrel"] as const;
export type StopPart = (typeof STOP_PARTS)[number];

/** Approximate radius of each focused part, for framing and caption offsets. */
export const STOP_RADIUS: Record<StopPart, number> = {
  rotor: 1.3,
  balance: 0.56,
  train: 0.9,
  barrel: 0.62,
};

/** Camera distance when a part is fully in focus: enough to see the whole part. */
const STOP_DISTANCE: Record<StopPart, number> = {
  rotor: 4.6,
  balance: 2.4,
  train: 3.0,
  barrel: 2.5,
};

const CAMERA = {
  farDistance: 8.2,
  azimuthStart: 0.72,
  azimuthTravel: 1.15,
  elevationFar: 0.6,
  elevationNear: 0.42,
  fov: 30,
} as const;

export { CAMERA };

const STOP_WIDTH = 0.11;

/** Fraction of the scroll at which each stop is centred. */
export const STOP_AT = STOP_PARTS.map((_, i) => (i + 0.5) / STOP_PARTS.length);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** 0 when assembled, 1 when fully exploded. Explodes on the way in, reassembles on the way out. */
export function explodeAmount(p: number) {
  return smoothstep(0, 0.16, p) * (1 - smoothstep(0.84, 1, p));
}

/** How strongly each stop is in focus at progress p. The bumps never overlap. */
export function focusWeights(p: number) {
  return STOP_AT.map((t) => {
    const u = Math.min(1, Math.abs(p - t) / STOP_WIDTH);
    const w = 1 - u * u;
    return w * w;
  });
}

/** Centre of each part in world space at a given explode amount. */
export function partCenter(part: StopPart | "plate", e: number): [number, number, number] {
  switch (part) {
    case "plate":
      return [0, PARTS.plate.thickness / 2, 0];
    case "barrel": {
      const b = PARTS.barrel;
      return [b.x, b.y + b.lift * e + b.height / 2, b.z];
    }
    case "train": {
      const t = PARTS.train;
      return [t.center.x, t.y + t.lift * e + 0.15, t.center.z];
    }
    case "balance": {
      const b = PARTS.balance;
      return [b.x, b.y + b.lift * e + b.tube, b.z];
    }
    case "rotor": {
      const r = PARTS.rotor;
      return [0, r.y + r.lift * e + r.thickness / 2, 0];
    }
  }
}

export type CameraState = {
  position: [number, number, number];
  target: [number, number, number];
};

/** One continuous eased camera path. Pure function of progress. */
export function cameraState(p: number): CameraState {
  const e = explodeAmount(p);
  const f = focusWeights(p);
  const focus = Math.min(1, f.reduce((a, b) => a + b, 0));

  const overview: [number, number, number] = [0, 0.35 + 1.05 * e, 0];
  const target: [number, number, number] = [
    overview[0] * (1 - focus),
    overview[1] * (1 - focus),
    overview[2] * (1 - focus),
  ];
  STOP_PARTS.forEach((part, i) => {
    if (f[i] === 0) return;
    const c = partCenter(part, e);
    target[0] += c[0] * f[i];
    target[1] += c[1] * f[i];
    target[2] += c[2] * f[i];
  });

  let distance = CAMERA.farDistance * (1 - focus);
  STOP_PARTS.forEach((part, i) => {
    distance += STOP_DISTANCE[part] * f[i];
  });
  const azimuth = CAMERA.azimuthStart + CAMERA.azimuthTravel * p;
  const elevation = CAMERA.elevationFar - (CAMERA.elevationFar - CAMERA.elevationNear) * focus;

  const position: [number, number, number] = [
    target[0] + distance * Math.cos(elevation) * Math.sin(azimuth),
    target[1] + distance * Math.sin(elevation),
    target[2] + distance * Math.cos(elevation) * Math.cos(azimuth),
  ];

  return { position, target };
}

/* --------------------------------------------------------------------------
   2D outlines. All in the XZ plane of the part, centred on its own axis.
   Returned as [x, z] pairs so the SVG and the extrude shapes share them.
-------------------------------------------------------------------------- */

export function circlePoints(r: number, n = 72): Vec2[] {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [r * Math.cos(a), r * Math.sin(a)] as const;
  });
}

/** A spur gear: trapezoid teeth around a root circle. */
export function gearPoints(r: number, teeth: number): Vec2[] {
  const depth = Math.min(0.08, r * 0.2);
  const root = r - depth;
  const pts: Vec2[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const angles = [
      [a, root],
      [a + step * 0.18, r],
      [a + step * 0.42, r],
      [a + step * 0.6, root],
    ] as const;
    for (const [angle, radius] of angles) {
      pts.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
    }
  }
  return pts;
}

/** A half disc, flat edge along the x axis. The rotor. */
export function semicirclePoints(r: number, n = 48): Vec2[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = Math.PI * (i / n);
    return [r * Math.cos(a), r * Math.sin(a)] as const;
  });
}

/** An Archimedean spiral. Springs. */
export function spiralPoints(r0: number, r1: number, turns: number, steps = 160): Vec2[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const a = t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    return [r * Math.cos(a), r * Math.sin(a)] as const;
  });
}
