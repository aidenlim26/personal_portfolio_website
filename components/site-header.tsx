"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/content";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // Scrollspy: highlight whichever section currently owns the upper viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = nav
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Back at the hero, no section owns the nav.
      if (window.scrollY < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on Escape so keyboard users are never trapped.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-border bg-ink/80 border-b backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="font-display text-fg -mx-2 inline-flex min-h-11 items-center rounded-md px-2 text-sm font-medium tracking-tight transition-opacity hover:opacity-70"
        >
          {site.name}
          <span className="text-cyan-accent" aria-hidden="true">
            .
          </span>
        </a>

        <nav aria-label="Section navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`rounded-md px-3 py-2 font-mono text-xs tracking-wide transition-colors ${
                    active === item.id
                      ? "text-fg bg-white/5"
                      : "text-faint hover:text-fg hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="text-muted hover:text-fg -mr-2 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-white/5 md:hidden"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Section navigation"
        hidden={!open}
        className="border-border bg-ink/95 border-t backdrop-blur-md md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 sm:px-6">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
                className={`block rounded-md px-3 py-3 font-mono text-sm tracking-wide transition-colors ${
                  active === item.id ? "text-fg bg-white/5" : "text-muted"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
