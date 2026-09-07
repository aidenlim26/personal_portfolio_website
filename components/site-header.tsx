import { nav, site } from "@/lib/content";

/**
 * Static, not fixed. A blurred bar pinned over a light page is the single most
 * recognisable generated-portfolio component; this one scrolls away and takes
 * the scrollspy, the backdrop filter and the hamburger with it. The lowercase
 * links rhyme with the ice / canvas / code labels under the hero panels.
 */
export default function SiteHeader() {
  return (
    <header className="page-grid pt-7">
      <div className="col-full flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-[var(--rule)] pb-5">
        <a
          href="#top"
          className="font-display text-[1.25rem] tracking-[-0.01em] link-quiet decoration-transparent"
        >
          {site.name}
        </a>

        <nav aria-label="Sections">
          <ul className="flex gap-x-7">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-[0.875rem] link-quiet">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
