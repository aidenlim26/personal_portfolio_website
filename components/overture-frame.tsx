import {
  PARTS,
  circlePoints,
  gearPoints,
  semicirclePoints,
  spiralPoints,
  type Vec2,
} from "@/lib/watch-parts";

/**
 * The static exploded-view frame: an isometric line drawing of the movement
 * generated from the same numbers the 3D scene uses. Server-rendered inline
 * SVG, so it is present with JavaScript off, under reduced motion, without
 * WebGL, and on mobile. Ink lines, cream fills, nothing else.
 */

const S = 100;
const INK = "#1c1a17";
const CREAM = "#f6f1e7";
const MUTED = "#645d52";

let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;

function iso(x: number, y: number, z: number): Vec2 {
  const px = (x - z) * 0.866 * S;
  const py = ((x + z) * 0.5 - y) * S;
  if (px < minX) minX = px;
  if (px > maxX) maxX = px;
  if (py < minY) minY = py;
  if (py > maxY) maxY = py;
  return [px, py];
}

const depthOf = (x: number, z: number) => x + z;

function d(points: Vec2[], close = true) {
  const parts = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`);
  return parts.join(" ") + (close ? " Z" : "");
}

type Piece = { d: string; fill?: boolean; stroke?: string; dashed?: boolean };

/** A prism: an outline in the part's XZ plane, swept from y0 to y1. */
function prism(
  outline: Vec2[],
  cx: number,
  cz: number,
  y0: number,
  y1: number,
  holes: Vec2[][] = [],
): Piece[] {
  const n = outline.length;
  const top = outline.map(([x, z]) => iso(cx + x, y1, cz + z));
  const bottom = outline.map(([x, z]) => iso(cx + x, y0, cz + z));

  let iMin = 0;
  let iMax = 0;
  top.forEach((p, i) => {
    if (p[0] < top[iMin][0]) iMin = i;
    if (p[0] > top[iMax][0]) iMax = i;
  });

  const arc = (dir: 1 | -1) => {
    const out: number[] = [];
    let i = iMin;
    for (;;) {
      out.push(i);
      if (i === iMax) break;
      i = (i + dir + n) % n;
    }
    return out;
  };
  const avgDepth = (idx: number[]) =>
    idx.reduce((s, i) => s + depthOf(cx + outline[i][0], cz + outline[i][1]), 0) / idx.length;
  const forward = arc(1);
  const backward = arc(-1);
  const near = avgDepth(forward) >= avgDepth(backward) ? forward : backward;

  const band = [...near.map((i) => top[i]), ...near.slice().reverse().map((i) => bottom[i])];
  const topPath =
    d(top) + holes.map((h) => " " + d(h.map(([x, z]) => iso(cx + x, y1, cz + z)))).join("");

  return [{ d: d(bottom), fill: true }, { d: d(band), fill: true }, { d: topPath, fill: true }];
}

function polyline(points: Vec2[], cx: number, cz: number, y: number, stroke = INK): Piece {
  return { d: d(points.map(([x, z]) => iso(cx + x, y, cz + z)), false), stroke };
}

function buildPieces() {
  minX = minY = Infinity;
  maxX = maxY = -Infinity;

  const e = 1;
  const groups: { depth: number; pieces: Piece[] }[] = [];

  // Mainplate
  {
    const p = PARTS.plate;
    groups.push({
      depth: depthOf(0, 0) + p.y,
      pieces: prism(circlePoints(p.radius), 0, 0, p.y, p.y + p.thickness, [circlePoints(p.hole, 36)]),
    });
  }

  // Mainspring barrel: an open cup with the spring coiled inside.
  {
    const b = PARTS.barrel;
    const y0 = b.y + b.lift * e;
    const y1 = y0 + b.height;
    const inner = circlePoints(b.radius - b.wall);
    const pieces: Piece[] = [];
    // Bottom, then the far inner wall, floor, spring, hub, then near outer wall and rim.
    const outer = prism(circlePoints(b.radius), b.x, b.z, y0, y1, [inner]);
    pieces.push(outer[0]);
    const innerWall = prism(inner, b.x, b.z, y0 + b.floor, y1);
    // innerWall[1] is the near band of the inner cylinder; we want the far one,
    // which is what remains visible inside the cup. Draw the whole inner
    // cylinder's bottom face (the floor) and its far band by drawing the
    // bottom face then covering the near half with the outer band later.
    pieces.push({ d: innerWall[0].d, fill: true });
    pieces.push(polyline(spiralPoints(b.spring.r0, b.spring.r1, b.spring.turns), b.x, b.z, y0 + b.floor + 0.005));
    pieces.push(...prism(circlePoints(b.hub, 36), b.x, b.z, y0 + b.floor, y1 + 0.1));
    pieces.push(outer[1], outer[2]);
    groups.push({ depth: depthOf(b.x, b.z) + y0, pieces });
  }

  // Gear train
  {
    const t = PARTS.train;
    for (const g of t.gears) {
      const y0 = t.y + (t.lift + g.lift) * e;
      groups.push({
        depth: depthOf(g.x, g.z) + y0,
        pieces: prism(gearPoints(g.r, g.teeth), g.x, g.z, y0, y0 + t.thickness, [circlePoints(0.05, 24)]),
      });
    }
  }

  // Balance wheel: a ring, three spokes, a hub and the hairspring.
  {
    const b = PARTS.balance;
    const y0 = b.y + b.lift * e;
    const y1 = y0 + b.tube * 2;
    const pieces: Piece[] = [];
    pieces.push(...prism(circlePoints(b.radius + b.tube), b.x, b.z, y0, y1, [circlePoints(b.radius - b.tube)]));
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
      pieces.push(
        polyline(
          [
            [b.hub * Math.cos(a), b.hub * Math.sin(a)],
            [(b.radius - b.tube) * Math.cos(a), (b.radius - b.tube) * Math.sin(a)],
          ],
          b.x,
          b.z,
          y1,
        ),
      );
    }
    pieces.push(...prism(circlePoints(b.hub, 30), b.x, b.z, y0, y1 + 0.05));
    pieces.push(polyline(spiralPoints(b.spring.r0, b.spring.r1, b.spring.turns), b.x, b.z, y1 + 0.06));
    groups.push({ depth: depthOf(b.x, b.z) + y0, pieces });
  }

  // Rotor: a half disc with a hub at the pivot.
  {
    const r = PARTS.rotor;
    const y0 = r.y + r.lift * e;
    const hub = 0.3;
    const outline: Vec2[] = [
      ...semicirclePoints(r.radius),
      ...circlePoints(hub, 40)
        .filter(([, z]) => z <= 0)
        .sort((a, b) => Math.atan2(a[1], a[0]) - Math.atan2(b[1], b[0]))
        .reverse(),
    ];
    groups.push({
      depth: depthOf(0, 0) + y0,
      pieces: prism(outline, 0, 0, y0, y0 + r.thickness, [circlePoints(r.hole, 30)]),
    });
  }

  // Central axis, drawn first so everything sits over it.
  const axisTop = PARTS.rotor.y + PARTS.rotor.lift + PARTS.rotor.thickness + 0.35;
  const axis: Piece = {
    d: d([iso(0, -0.3, 0), iso(0, axisTop, 0)], false),
    stroke: MUTED,
    dashed: true,
  };

  groups.sort((a, b) => a.depth - b.depth);
  return { pieces: [axis, ...groups.flatMap((g) => g.pieces)] };
}

export default function OvertureFrame({ label }: { label: string }) {
  const { pieces } = buildPieces();
  const pad = 24;
  const viewBox = `${(minX - pad).toFixed(0)} ${(minY - pad).toFixed(0)} ${(maxX - minX + pad * 2).toFixed(0)} ${(maxY - minY + pad * 2).toFixed(0)}`;

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      fill="none"
      stroke={INK}
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {pieces.map((piece, i) => (
        <path
          key={i}
          d={piece.d}
          fill={piece.fill ? CREAM : "none"}
          fillRule="evenodd"
          stroke={piece.stroke ?? INK}
          strokeDasharray={piece.dashed ? "6 6" : undefined}
        />
      ))}
    </svg>
  );
}
