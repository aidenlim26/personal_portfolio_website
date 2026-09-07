"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import OvertureFrame from "@/components/overture-frame";
import { ExternalLink } from "@/components/rail";
import { overture, type OvertureLink } from "@/lib/content";
import { TIMELINE } from "@/lib/watch-parts";

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
 * four stop captions listed beneath it, each with all of its sub-blocks. On a
 * wide viewport with WebGL and no reduced-motion preference, the client swaps
 * in the scroll-driven scene: the same caption elements are tracked over the
 * canvas and their sub-blocks swipe through one at a time as the scroll
 * advances.
 *
 * The container's height comes from the timeline, so the scroll is exactly
 * as long as the sequence needs. The captions are plain elements, not
 * headings: each section's h2 lives in the section itself, further down.
 */

const sceneStyle = { "--overture-length": `${Math.round(100 + TIMELINE.travelVh)}vh` } as CSSProperties;
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
      const captions = Array.from(list.children) as HTMLElement[];
      handle = mountScene({
        root,
        stage,
        captions,
        blocks: captions.map((el) => Array.from(el.querySelectorAll<HTMLElement>(".overture-block"))),
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
    <section
      ref={rootRef}
      id="overture"
      aria-label={overture.label}
      className="overture"
      data-mode={mode}
      style={sceneStyle}
    >
      <div ref={stageRef} className="overture-stage">
        <a href={overture.skipHref} className="overture-skip link">
          {overture.skip}
        </a>

        <div className="overture-frame">
          <OvertureFrame label={overture.label} />
        </div>

        <ul ref={listRef} className="overture-captions">
          {overture.stops.map((stop) => (
            <li key={stop.part} className="overture-caption">
              <p className="overture-part">{stop.part}</p>
              <p className="overture-section">{stop.section}</p>
              <ul className="overture-blocks">
                {stop.blocks.map((block, i) => (
                  <li key={i} className="overture-block">
                    {"title" in block && block.title ? <strong>{block.title}: </strong> : null}
                    {block.text}
                  </li>
                ))}
              </ul>
              {"link" in stop && stop.link ? <CaptionLink link={stop.link} /> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CaptionLink({ link }: { link: OvertureLink }) {
  if (link.external) return <ExternalLink href={link.href}>{link.label}</ExternalLink>;
  return (
    <a href={link.href} className="link">
      {link.label}
    </a>
  );
}
