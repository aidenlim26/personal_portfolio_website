import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <Section id="experience" index="05" eyebrow="Experience" title="E-Services Group">
      <Reveal delay={80}>
        <p className="text-faint mt-10 font-mono text-xs tracking-[0.18em] uppercase">
          {experience.role}
          <span className="text-border-strong px-3" aria-hidden="true">
            /
          </span>
          {experience.location}
          <span className="text-border-strong px-3" aria-hidden="true">
            /
          </span>
          {experience.period}
        </p>
      </Reveal>

      <ul className="mt-10 space-y-6">
        {experience.details.map((detail, index) => (
          <Reveal
            as="li"
            key={detail}
            delay={120 + index * 70}
            className="border-border flex gap-5 border-t pt-6"
          >
            <span
              aria-hidden="true"
              className="text-faint mt-1 font-mono text-[0.7rem] tracking-[0.18em]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-muted max-w-3xl text-sm leading-relaxed sm:text-base">
              {detail}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
