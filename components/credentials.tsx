import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/reveal";
import Section from "@/components/section";
import { credentials } from "@/lib/content";

export default function Credentials() {
  return (
    <Section
      id="credentials"
      index="06"
      eyebrow="Verified Credentials"
      title="Machine learning mathematics, certified end to end."
      lead={`${credentials.issuer} · ${credentials.issued}. Every certificate below links to its official verification page.`}
    >
      <ul className="mt-14 grid gap-6 sm:grid-cols-2">
        {credentials.items.map((item, index) => (
          <Reveal as="li" key={item.href} delay={index * 70}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-border hover:border-border-strong focus-visible:border-border-strong bg-surface block h-full cursor-pointer overflow-hidden rounded-2xl border shadow-lg shadow-black/30 transition-colors"
            >
              <Image
                src={item.image}
                alt={`Certificate: ${item.title}`}
                width={2200}
                height={1700}
                sizes="(min-width: 640px) 45vw, 90vw"
                className="w-full opacity-85 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <div className="border-border flex items-start justify-between gap-4 border-t p-5 sm:p-6">
                <div>
                  <span className="text-faint font-mono text-[0.7rem] tracking-[0.18em] uppercase">
                    {item.short}
                  </span>
                  <h3 className="text-fg mt-2 text-sm leading-snug font-medium text-balance sm:text-base">
                    {item.title}
                  </h3>
                </div>
                <span className="text-faint group-hover:text-cyan-accent mt-1 shrink-0 transition-colors">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">
                    Verify this credential (opens in a new tab)
                  </span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={200}>
        <div className="border-border mt-12 border-t pt-8">
          <h3 className="text-faint font-mono text-xs tracking-[0.18em] uppercase">
            Skills
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {credentials.skills.map((skill) => (
              <li
                key={skill}
                className="border-border text-muted rounded-full border px-4 py-2 text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
