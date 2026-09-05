import Image from "next/image";
import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { beyond } from "@/lib/content";

export default function Beyond() {
  return (
    <Section
      id="beyond"
      index="07"
      eyebrow="Beyond the Resume"
      title="Gold medals on two very different surfaces."
    >
      <Reveal delay={80}>
        <div className="border-border bg-surface mt-12 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 rounded-2xl border p-6 sm:p-8">
          <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
            {beyond.athletics.title}
          </h3>
          <p className="text-faint font-mono text-xs tracking-[0.18em] uppercase">
            {beyond.athletics.role}
            <span className="text-border-strong px-3" aria-hidden="true">
              /
            </span>
            {beyond.athletics.period}
          </p>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {beyond.paintings.map((painting, index) => (
          <Reveal key={painting.image} delay={140 + index * 90}>
            <figure className="border-border bg-surface h-full overflow-hidden rounded-2xl border">
              <div className="overflow-hidden bg-black/40">
                <Image
                  src={painting.image}
                  alt={painting.alt}
                  width={painting.width}
                  height={painting.height}
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="aspect-4/5 w-full scale-105 object-cover transition-transform duration-500 ease-out hover:scale-[1.09] motion-reduce:transition-none"
                />
              </div>
              <figcaption className="p-6 sm:p-8">
                <h3 className="font-display text-lg leading-snug font-medium tracking-tight text-balance sm:text-xl">
                  {painting.title}
                </h3>
                <p className="text-faint mt-4 font-mono text-xs tracking-[0.18em] uppercase">
                  {painting.issuer}
                  <span className="text-border-strong px-3" aria-hidden="true">
                    /
                  </span>
                  Theme: {painting.theme}
                </p>
                {painting.note ? (
                  <p className="text-muted mt-4 text-sm leading-relaxed">
                    {painting.note}
                  </p>
                ) : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
