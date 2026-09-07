import { hero } from "@/lib/content";

/**
 * The name, a location, and one line of identification. No tagline, no quote.
 * Phase 2 places the watch scene directly after this.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-[clamp(5rem,14vh,9rem)] pb-[clamp(4rem,12vh,8rem)]">
      <div className="page-grid">
        <h1 id="hero-heading" className="col-full h1">
          {hero.name}
        </h1>

        <div className="col-full mt-10 flex flex-col gap-1 sm:flex-row sm:gap-x-10">
          <p className="m-0">{hero.location}</p>
          <p className="m-0 max-w-[48ch] text-pretty">
            {hero.roles[0]}. {hero.roles[1]}.
          </p>
        </div>
      </div>
    </section>
  );
}
