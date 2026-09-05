import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { simulator } from "@/lib/content";

const stats = [
  { value: "15", label: "Autonomous bots" },
  { value: "80%", label: "Real market data" },
  { value: "20%", label: "Bot transaction volume" },
];

export default function Simulator() {
  return (
    <Section
      id="simulator"
      index="03"
      eyebrow="Technical Project"
      title="HFT Trading Simulator"
      lead="A closed-loop market where fifteen quantitative bots trade only against each other, and the price they move is the price they see."
    >
      <Reveal delay={80}>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <p className="text-faint font-mono text-xs tracking-[0.18em] uppercase">
            {simulator.stack}
          </p>
          <a
            href={simulator.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-fg hover:border-border-strong border-border inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-xs tracking-wide transition-colors"
          >
            View repository
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <dl className="border-border mt-12 grid gap-8 border-y py-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display text-gradient block text-4xl font-medium tracking-tight sm:text-5xl">
                  {stat.value}
                </span>
                <span className="text-faint mt-2 block font-mono text-xs tracking-[0.18em] uppercase">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {simulator.details.map((detail, index) => (
          <Reveal
            as="li"
            key={detail.title}
            delay={180 + index * 70}
            className="bg-surface p-6 sm:p-8"
          >
            <span
              className="text-faint font-mono text-[0.7rem] tracking-[0.18em]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-3 text-lg font-medium tracking-tight">
              {detail.title}
            </h3>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              {detail.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
