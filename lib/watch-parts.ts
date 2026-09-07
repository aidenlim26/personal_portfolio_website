/**
 * The watch movement, as numbers. Shared by the static SVG frame (rendered on
 * the server) and the Three.js scene (built on the client), so the two agree
 * about what the movement looks like. No Three.js import here.
 *
 * Units are arbitrary. Y is up. The mainplate sits at y = 0 and every other
 * part is stacked above it. `lift` is how far a part rises when the movement
 * is fully exploded.
 */
import { overture } from "@/lib/content";

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

/* --------------------------------------------------------------------------
   Timeline. The scroll is measured in blocks: one block is the distance over
   which one caption sub-block is shown. Every segment below is a length in
   blocks, so lengthening one sub-block lengthens the whole sequence in step.

     [explode][move][stop 0 blocks][move][stop 1 blocks]...[move][reassemble]

   During a stop's hold the camera stays on its part and the sub-blocks swipe
   through one by one. Between stops the outgoing focus falls while the
   incoming one rises over the same interval, so the camera glides straight
   from part to part.
-------------------------------------------------------------------------- */

/** Scroll distance for one sub-block, in vh. About two trackpad swipes. */
export const BLOCK_VH = 150;
/** Explode and reassemble ramps, in blocks. */
const EXPLODE = 0.6;
/** Camera travel from one part to the next, in blocks. */
const MOVE = 0.6;
/** Fraction of a block over which one sub-block hands off to the next. */
const SWIPE = 0.3;

export type TimelineStop = {
  /** Focus starts rising here. */
  riseStart: number;
  /** Focus reaches 1; first sub-block is centred half a block later. */
  holdStart: number;
  /** Last sub-block ends; focus starts falling. */
  holdEnd: number;
  /** Focus reaches 0. */
  fallEnd: number;
  count: number;
};

export type Timeline = {
  /** Total scroll travel, in vh (container height minus the 100vh stage). */
  travelVh: number;
  /** Length of one block as a fraction of progress. */
  blockLen: number;
  explodeEnd: number;
  reassembleStart: number;
  stops: TimelineStop[];
};

export function buildTimeline(counts: number[]): Timeline {
  const total =
    EXPLODE + MOVE + counts.reduce((a, b) => a + b, 0) + MOVE * (counts.length - 1) + MOVE + EXPLODE;
  const u = (blocks: number) => blocks / total;
  const stops: TimelineStop[] = [];
  let t = EXPLODE;
  for (const count of counts) {
    stops.push({
      riseStart: u(t),
      holdStart: u(t + MOVE),
      holdEnd: u(t + MOVE + count),
      fallEnd: u(t + MOVE + count + MOVE),
      count,
    });
    t += MOVE + count;
  }
  return {
    travelVh: total * BLOCK_VH,
    blockLen: u(1),
    explodeEnd: u(EXPLODE + MOVE),
    reassembleStart: u(t),
    stops,
  };
}

export const TIMELINE = buildTimeline(overture.stops.map((stop) => stop.blocks.length));

/** Fraction of the scroll at which each stop's first sub-block is centred. */
export const STOP_AT = TIMELINE.stops.map((stop) => stop.holdStart + TIMELINE.blockLen / 2);

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/** 0 when assembled, 1 when fully exploded. Explodes on the way in, reassembles on the way out. */
export function explodeAmount(p: number) {
  return smoothstep(0, TIMELINE.explodeEnd, p) * (1 - smoothstep(TIMELINE.reassembleStart, 1, p));
}

/**
 * How strongly each stop is in focus at progress p: a plateau of 1 across the
 * stop's hold, with smoothstep ramps that crossfade into the neighbours, so
 * the weights sum to at most 1 and to exactly 1 during a hold or a move.
 */
export function focusWeights(p: number) {
  return TIMELINE.stops.map(
    (s) => smoothstep(s.riseStart, s.holdStart, p) * (1 - smoothstep(s.holdEnd, s.fallEnd, p)),
  );
}

export type BlockState = {
  /** Vertical offset in caption heights: +1 waiting below, 0 shown, -1 gone above. */
  offset: number;
  opacity: number;
};

/**
 * Sub-block positions for one stop at progress p. Block j is fully shown for
 * the middle of its block; it swipes in from below over SWIPE of a block at
 * its start and out above at its end. The first block never enters and the
 * last never exits: the caption's own fade handles those edges.
 */
export function blockStates(p: number, stop: number): BlockState[] {
  const s = TIMELINE.stops[stop];
  const local = (p - s.holdStart) / TIMELINE.blockLen;
  const half = SWIPE / 2;
  return Array.from({ length: s.count }, (_, j) => {
    const enter = j === 0 ? 1 : smoothstep(j - half, j + half, local);
    const exit = j === s.count - 1 ? 0 : smoothstep(j + 1 - half, j + 1 + half, local);
    return { offset: 1 - enter - exit, opacity: enter * (1 - exit) };
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
