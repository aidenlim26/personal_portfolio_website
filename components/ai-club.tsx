"use client";

import { useState } from "react";
import { RailLines } from "@/components/rail";
import Section from "@/components/section";
import { aiClub } from "@/lib/content";

/**
 * A plain accordion — no panel, no card, no border box. The first item is open
 * on load and is the scoliosis programme rather than the founding story: in a
 * sixty-second read, the most specific thing has to be the thing that is
 * already showing.
 */
export default function AiClub() {
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set([0]));

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  return (
    <Section
      id="ai-club"
      title={aiClub.heading}
      rail={<RailLines lines={aiClub.rail} />}
    >
      <p className="prose-body">{aiClub.lead}</p>

      <div className="mt-10 border-t border-[var(--rule)]">
        {aiClub.items.map((item, index) => {
          const isOpen = open.has(index);
          const panelId = `ai-club-panel-${index}`;

          return (
            <div key={item.title} className="border-b border-[var(--rule)]">
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full cursor-pointer items-baseline justify-between gap-6 py-5 text-left h3"
                >
                  {item.title}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[1.25rem] leading-none font-normal text-rink"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                inert={!isOpen}
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                className={
                  "grid transition-[grid-template-rows,opacity] duration-[240ms] ease-out motion-reduce:transition-none " +
                  (isOpen ? "opacity-100" : "opacity-0")
                }
              >
                <div className="overflow-hidden">
                  <p className="prose-body pb-6">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
