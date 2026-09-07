"use client";

import { useEffect, useRef, useState } from "react";
import OvertureFrame from "@/components/overture-frame";
import { overture } from "@/lib/content";

type Mode = "static" | "scene";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The overture. Server-rendered as a static exploded-view drawing with the
 * four stop captions listed beneath it. On a wide viewport with WebGL and no
 * reduced-motion preference, the client swaps in the scroll-driven scene and
 * the same caption elements are tracked over the canvas instead.
 *
 * The captions are plain elements, not headings: each section's h2 lives in
 * the section itself, further down.
 */
export default function Overture() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [mode, setMode] = useState<Mode>("static");

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const list = listRef.current;
    if (!root || !stage || !list) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 48rem)");
    let handle: { dispose(): void } | null = null;
    let cancelled = false;

    const teardown = () => {
      handle?.dispose();
      handle = null;
      setMode("static");
    };

    const evaluate = async () => {
      const wanted = !reduced.matches && wide.matches && hasWebGL();
      if (wanted === Boolean(handle)) return;
      if (!wanted) {
        teardown();
        return;
      }
      const { mountScene } = await import("@/components/watch-scene");
      if (cancelled || handle || reduced.matches || !wide.matches) return;
      handle = mountScene({
        root,
        stage,
        captions: Array.from(list.children) as HTMLElement[],
        onLost: teardown,
      });
      setMode("scene");
    };

    void evaluate();
    reduced.addEventListener("change", evaluate);
    wide.addEventListener("change", evaluate);

    return () => {
      cancelled = true;
      reduced.removeEventListener("change", evaluate);
      wide.removeEventListener("change", evaluate);
      handle?.dispose();
      handle = null;
    };
  }, []);

  return (
    <section ref={rootRef} id="overture" aria-label={overture.label} className="overture" data-mode={mode}>
      <div ref={stageRef} className="overture-stage">
        <a href="#ai-club" className="overture-skip link">
          {overture.skip}
        </a>

        <div className="overture-frame">
          <OvertureFrame label={overture.label} />
        </div>

        <ul ref={listRef} className="overture-captions">
          {overture.stops.map((stop) => (
            <li key={stop.href} className="overture-caption">
              <p className="overture-part">{stop.part}</p>
              <p className="overture-section">{stop.section}</p>
              <p className="overture-sentence">{stop.sentence}</p>
              <a href={stop.href} className="link">
                {stop.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
