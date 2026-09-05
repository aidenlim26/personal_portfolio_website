import { ArrowDown } from "lucide-react";
import HeroCta from "@/components/hero-cta";
import { hero, site } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Decorative backdrop: engineering grid, faded out toward the edges. */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_34%_at_50%_26%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[26%] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.16),transparent_62%)] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-24 sm:px-8 lg:px-12">
        <p className="text-faint font-mono text-xs tracking-[0.22em] uppercase">
          {site.location}
          <span className="text-border-strong px-3" aria-hidden="true">
            /
          </span>
          Student Founder
        </p>

        <h1
          id="hero-heading"
          className="font-display mt-8 max-w-4xl text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
        >
          I build things — from AI products to{" "}
          <span className="text-gradient">
            <span className="whitespace-nowrap">award-winning</span> paintings
          </span>
          .
        </h1>

        <p className="text-muted mt-8 max-w-xl text-base leading-relaxed sm:text-lg">
          {hero.subhead}
        </p>

        <div className="mt-10 -ml-[38px]">
          <HeroCta />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to the About section"
        className="text-faint hover:text-fg absolute inset-x-0 bottom-8 mx-auto hidden h-11 w-11 items-center justify-center rounded-full transition-colors sm:flex"
      >
        <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </a>
    </section>
  );
}
