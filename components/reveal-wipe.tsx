"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * One clip-path wipe, once, when the element first enters. The only thing on
 * this page that reveals on scroll — the paintings, and nothing else.
 *
 * The animation lives in globals.css so `prefers-reduced-motion` can flatten
 * it there; if JS never runs, `data-shown` never flips and the content is
 * simply visible.
 */
export default function RevealWipe({ children }: { children: ReactNode }) {
  const [shown, setShown] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setNode = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return (
    <div ref={setNode} data-shown={shown} className="wipe-in">
      {children}
    </div>
  );
}
