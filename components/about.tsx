import Image from "next/image";
import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { about } from "@/lib/content";

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title="A builder who works across code, canvas, and ice."
    >
      <div className="mt-14 grid gap-10 md:grid-cols-[auto_1fr] md:gap-14">
        <Reveal>
          <Image
            src="/images/headshot.png"
            alt="Portrait of Aiden Lim"
            width={896}
            height={1195}
            sizes="200px"
            className="border-border h-40 w-40 rounded-2xl border object-cover object-top shadow-lg shadow-black/40 sm:h-48 sm:w-48 md:h-[200px] md:w-[200px]"
          />
        </Reveal>

        <div>
          <Reveal delay={80}>
            <p className="max-w-2xl text-base leading-[1.75] text-pretty sm:text-lg">
              {about.paragraph}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <dl className="border-border mt-10 grid gap-x-10 gap-y-5 border-t pt-8 sm:grid-cols-2">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-faint font-mono text-xs tracking-[0.18em] uppercase">
                    {fact.label}
                  </dt>
                  <dd className="text-muted mt-2 text-sm leading-relaxed">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
