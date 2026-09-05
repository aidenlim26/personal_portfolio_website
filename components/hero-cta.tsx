"use client";

import { useCallback, useEffect, useRef } from "react";
import DotBorderButton from "@/components/ui/dot-border-button";

/** Window between a Tab keypress and the resulting focus change. */
const TAB_GRACE_MS = 600;

/**
 * The Dot Border Button renders inside a sandboxed iframe, which shapes this
 * component in two ways:
 *
 *  1. Pointer events over an iframe never reach the parent document, so a
 *     plain `onClick` on the wrapper cannot see a click that lands on the
 *     button — and covering the frame with a transparent hit-area would
 *     swallow the hover that drives the whole dotted-border animation.
 *     What the parent *can* observe is focus: clicking the frame blurs the
 *     window and makes the iframe `document.activeElement`. We treat that
 *     transition as the click.
 *  2. Tabbing into the frame produces the same focus transition, so a recent
 *     Tab keypress suppresses it — otherwise keyboard users would be scrolled
 *     away mid-traversal.
 *
 * The wrapper is a real anchor, so the CTA is keyboard-operable, has a working
 * href before hydration, and supports open-in-new-tab.
 */
export default function HeroCta() {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const frameFocusedRef = useRef(false);
  const lastTabAtRef = useRef(0);

  const goToProjects = useCallback(() => {
    const target = document.getElementById("projects");
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", "#projects");

    // Pull focus back out of the frame so tab order stays in this document.
    frameFocusedRef.current = false;
    wrapperRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const isFrameFocused = () => {
      const active = document.activeElement;
      return (
        active instanceof HTMLIFrameElement &&
        wrapperRef.current?.contains(active) === true
      );
    };

    // Only a *transition* into the frame counts, so switching apps while the
    // frame already holds focus doesn't fire a stray scroll.
    const syncFrameFocus = () => {
      window.setTimeout(() => {
        const focused = isFrameFocused();
        const entered = focused && !frameFocusedRef.current;
        frameFocusedRef.current = focused;

        if (!entered) return;
        if (Date.now() - lastTabAtRef.current < TAB_GRACE_MS) return;
        goToProjects();
      }, 0);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") lastTabAtRef.current = Date.now();
    };

    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("blur", syncFrameFocus);
    window.addEventListener("focus", syncFrameFocus);
    document.addEventListener("focusin", syncFrameFocus);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("blur", syncFrameFocus);
      window.removeEventListener("focus", syncFrameFocus);
      document.removeEventListener("focusin", syncFrameFocus);
    };
  }, [goToProjects]);

  return (
    <a
      ref={wrapperRef}
      href="#projects"
      aria-label="View my work — jump to the Timelit project"
      onClick={(event) => {
        event.preventDefault();
        goToProjects();
      }}
      className="block h-28 w-64 cursor-pointer rounded-lg"
    >
      <DotBorderButton mode="dark" className="h-full w-full rounded-lg" />
    </a>
  );
}
