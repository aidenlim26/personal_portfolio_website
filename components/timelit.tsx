import { ExternalLink, RailItem, RailLines } from "@/components/rail";
import { timelit } from "@/lib/content";

/**
 * The one raised panel on the page, and the only element carrying a shadow.
 * Card discipline: importance is what earns a surface, not habit.
 */
export default function Timelit() {
  return (
    <section id="timelit" aria-labelledby="timelit-heading" className="section">
      <div className="page-grid">
        <div className="col-head">
          <div className="rounded-[4px] bg-surface p-7 shadow-[0_1px_2px_rgba(23,28,33,0.06),0_16px_40px_-20px_rgba(23,28,33,0.28)] sm:p-10">
            <h2 id="timelit-heading" className="h2">
              {timelit.heading}
            </h2>

            <div className="mt-6">
              {timelit.paragraphs.map((paragraph) => (
                <p key={paragraph} className="prose-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <aside className="col-rail" aria-label="Details for Timelit">
          <div className="rail">
            <RailLines lines={timelit.rail} />
            <RailItem>
              <ExternalLink href={timelit.url}>{timelit.urlLabel}</ExternalLink>
            </RailItem>
          </div>
        </aside>
      </div>
    </section>
  );
}
