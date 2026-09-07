import Image from "next/image";
import OrderBook from "@/components/order-book";
import { hero } from "@/lib/content";

const PANEL_SIZES = "(min-width: 78rem) 366px, (min-width: 48rem) 30vw, 88vw";

/**
 * The triptych. Everything else on this page is quiet; this is the one bold
 * thing, and the three labels beneath it are the page's only structural
 * markers — they replace the seven numbered eyebrows outright.
 *
 * The arrival animation is pure CSS with `animation-fill-mode: backwards`, so
 * there is no client component here and nothing stays hidden if the animation
 * never runs.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-[8vh] pb-[10vh]">
      <div className="page-grid">
        <h1 id="hero-heading" className="col-full h1">
          {hero.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="col-full mt-[7vh] grid gap-y-8 sm:grid-cols-3 sm:gap-0">
          <figure className="panel-in" style={{ "--panel-delay": "120ms" } as React.CSSProperties}>
            <div className="relative aspect-3/4 overflow-hidden bg-ink/5">
              <Image
                src="/images/hockey-celebration-portrait.jpg"
                alt="Two players in red embrace on the ice after a goal while a third skates in behind them."
                width={787}
                height={1050}
                sizes={PANEL_SIZES}
                quality={85}
                preload
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.875rem] text-rink">
              {hero.panels.ice}
            </figcaption>
          </figure>

          <figure className="panel-in" style={{ "--panel-delay": "210ms" } as React.CSSProperties}>
            <div className="relative aspect-3/4 overflow-hidden bg-ink/5">
              <Image
                src="/images/blossoms-detail.jpg"
                alt="Detail of an oil painting: purple blossoms spilling from a gold vase on a window sill."
                width={1500}
                height={2000}
                sizes={PANEL_SIZES}
                quality={85}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.875rem] text-rink">
              {hero.panels.canvas}
            </figcaption>
          </figure>

          <figure className="panel-in" style={{ "--panel-delay": "300ms" } as React.CSSProperties}>
            <div className="aspect-3/4 overflow-hidden">
              <OrderBook />
            </div>
            <figcaption className="mt-3 text-[0.875rem] text-rink">
              {hero.panels.code}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
