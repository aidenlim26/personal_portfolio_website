import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { aiClub } from "@/lib/content";

export default function AiClub() {
  return (
    <Section
      id="ai-club"
      index="04"
      eyebrow="Leadership Case Study"
      title="AI Club"
      lead={
        <>
          {aiClub.role}
          <span className="text-border-strong px-3" aria-hidden="true">
            /
          </span>
          <span className="whitespace-nowrap">{aiClub.period}</span>
        </>
      }
    >
      <ol className="border-border mt-14 border-l">
        {aiClub.pillars.map((pillar, index) => (
          <Reveal
            as="li"
            key={pillar.title}
            delay={index * 70}
            className="group relative pb-12 pl-8 last:pb-0 sm:pl-12"
          >
            <span
              aria-hidden="true"
              className="bg-ink border-border-strong absolute top-1.5 -left-[5px] block h-2.5 w-2.5 rounded-full border"
            />
            <span
              aria-hidden="true"
              className="text-faint font-mono text-[0.7rem] tracking-[0.18em]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-2 text-xl font-medium tracking-tight sm:text-2xl">
              {pillar.title}
            </h3>
            <p className="text-muted mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">
              {pillar.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
