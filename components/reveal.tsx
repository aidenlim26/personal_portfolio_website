"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in milliseconds. */
  delay?: number;
  as?: "div" | "li";
};

/**
 * Fades content up 12px the first time it scrolls into view. The animation
 * itself lives in globals.css so `prefers-reduced-motion` and the `<noscript>`
 * fallback can both unpin the content without touching this component.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setNode = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    observerRef.current = observer;
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const shared = {
    ref: setNode,
    className: `reveal ${className}`.trim(),
    "data-visible": visible,
    style: delay
      ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
      : undefined,
  };

  return as === "li" ? (
    <li {...shared}>{children}</li>
  ) : (
    <div {...shared}>{children}</div>
  );
}
