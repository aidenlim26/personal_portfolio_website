import { ExternalLink } from "@/components/rail";
import { site } from "@/lib/content";

/** Static, not fixed. The name and the two profiles a sceptical reader checks first. */
export default function SiteHeader() {
  return (
    <header className="page-grid pt-7">
      <div className="col-full flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-[var(--rule)] pb-5">
        <a href="#top" className="font-display text-[1.25rem] tracking-[-0.01em] link no-underline">
          {site.name}
        </a>

        <nav aria-label="Profiles">
          <ul className="flex gap-x-7 small">
            <li>
              <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
            </li>
            <li>
              <ExternalLink href={site.github}>GitHub</ExternalLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
