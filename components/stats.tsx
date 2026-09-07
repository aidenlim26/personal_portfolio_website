"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/content";

const DURATION = 1100;
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const format = (n: number) => Math.round(n).toLocaleString("en-GB");

/**
 * The only count-up on the site. Runs once, on first intersection.
 *
 * `progress` starts as null, meaning "settled": the server, and any client
 * without JavaScript, render the real figures. Only a client that is actually
 * going to animate drops them to zero, and it starts observing in the same
 * effect, so the reset and the count-up are the same gesture.
 *
 * Each figure reserves the width of its settled value with an invisible copy,
 * so a band of tabular numerals cannot reflow while it counts. Assistive tech
 * reads the settled value; the animating figure is hidden from it.
 */
export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setProgress(1);
      return;
    }

    setProgress(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setProgress(easeOut(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} aria-label="By the numbers" className="section">
      <div className="page-grid">
        <dl className="col-full grid gap-x-10 gap-y-9 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const settled = format(stat.value) + stat.suffix;
            const running = format(stat.value * (progress ?? 1)) + stat.suffix;

            return (
              <div
                key={stat.label}
                className={
                  "border-t border-[var(--rule)] pt-6 first:border-t-0 first:pt-0 " +
                  "lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
                }
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="m-0">
                  <span className="relative block font-display text-[clamp(2.25rem,1.2rem+2.8vw,4rem)] leading-none tracking-[-0.015em] tnum">
                    <span aria-hidden="true" className="invisible">
                      {settled}
                    </span>
                    <span aria-hidden="true" className="absolute inset-0">
                      {running}
                    </span>
                    <span className="sr-only">{settled}</span>
                  </span>
                  <span className="mt-4 block text-[0.875rem] text-rink">
                    {stat.label}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
