import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { timelit } from "@/lib/content";

export default function Timelit() {
  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Featured Project"
      title={
        <span className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Image
            src="/images/timelit-logo.png"
            alt=""
            aria-hidden="true"
            width={1566}
            height={1574}
            sizes="80px"
            className="border-border h-16 w-16 rounded-[18px] border object-cover sm:h-20 sm:w-20"
          />
          {timelit.name}
        </span>
      }
      lead={
        <>
          Timelit is an AI-powered scheduling assistant. Its AI agent,{" "}
          <strong className="text-fg font-medium">Aura</strong>, learns your
          habits to proactively suggest optimal times, manage conflicts, and
          streamline your day.
        </>
      }
    >
      <Reveal delay={80}>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <p className="text-faint font-mono text-xs tracking-[0.18em] uppercase">
            {timelit.role}
            <span className="text-border-strong px-3" aria-hidden="true">
              /
            </span>
            {timelit.period}
          </p>

          <a
            href={timelit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-accent group border-cyan-accent/40 hover:border-cyan-accent hover:bg-cyan-accent/10 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-xs tracking-wide transition-colors"
          >
            <span
              aria-hidden="true"
              className="bg-cyan-accent inline-block h-1.5 w-1.5 rounded-full"
            />
            {timelit.urlLabel}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Reveal>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {timelit.details.map((detail, index) => (
          <Reveal
            as="li"
            key={detail}
            delay={120 + index * 60}
            className="bg-surface p-6 sm:p-8"
          >
            <span
              className="text-faint font-mono text-[0.7rem] tracking-[0.18em]"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-muted mt-3 text-sm leading-relaxed sm:text-base">
              {detail}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
