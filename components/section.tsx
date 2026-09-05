import type { ReactNode } from "react";
import Reveal from "@/components/reveal";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  index,
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`border-border border-t ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 md:py-28 lg:px-12">
        <Reveal>
          <p className="text-faint font-mono text-xs tracking-[0.22em] uppercase">
            <span aria-hidden="true">{index}</span>
            <span className="text-border-strong px-3" aria-hidden="true">
              /
            </span>
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="font-display mt-6 max-w-3xl text-3xl leading-[1.1] font-medium tracking-tight text-balance sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          {lead ? (
            <p className="text-muted mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {lead}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
