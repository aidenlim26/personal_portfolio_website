import Image from "next/image";
import RevealWipe from "@/components/reveal-wipe";
import TodoNote from "@/components/todo-note";
import { paintings } from "@/lib/content";

/**
 * No container, no radius, no card. The two paintings hang side by side at a
 * shared width, wider than the text column, and they are the largest things on
 * the page — which is the correct weight for the work that won the awards.
 */
export default function Paintings() {
  return (
    <section id="painting" aria-labelledby="painting-heading" className="section">
      <div className="page-grid">
        <div className="col-head">
          <h2 id="painting-heading" className="h2">
            {paintings.heading}
          </h2>
          <TodoNote>{paintings.todo}</TodoNote>
        </div>
      </div>

      <div className="mt-[8vh] w-full px-[clamp(1.25rem,5vw,3.5rem)]">
        <div className="flex flex-col items-start gap-[8vh] md:flex-row md:gap-8">
          {paintings.works.map((work) => (
            <figure key={work.title} className="w-full md:flex-1">
              <RevealWipe>
                <Image
                  src={work.image}
                  alt={work.alt}
                  width={work.width}
                  height={work.height}
                  sizes="(min-width: 48rem) 48vw, 92vw"
                  quality={85}
                  className="h-auto w-full"
                />
              </RevealWipe>

              <figcaption className="mt-6 max-w-[52ch]">
                <span className="block font-display text-[1.563rem] leading-tight italic">
                  {work.title}
                </span>
                <span className="mt-2 block">{work.award}</span>
                <span className="rail">
                  {work.rail.map((line) => (
                    <span key={line} className="rail-item block">
                      {line}
                    </span>
                  ))}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
