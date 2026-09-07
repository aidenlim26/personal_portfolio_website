import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: ReactNode;
  /**
   * Dates, roles, institutions, verification links. Rendered once: the grid
   * puts it in columns 9–12 on desktop and, below `md`, source order drops it
   * directly beneath the heading as a small block.
   */
  rail?: ReactNode;
  children: ReactNode;
};

export default function Section({ id, title, rail, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="section">
      <div className="page-grid">
        <div className="col-head">
          <h2 id={`${id}-heading`} className="h2">
            {title}
          </h2>
        </div>

        {rail ? (
          <aside className="col-rail" aria-label={`Details for ${id}`}>
            <div className="rail">{rail}</div>
          </aside>
        ) : null}

        <div className="col-body mt-9">{children}</div>
      </div>
    </section>
  );
}
