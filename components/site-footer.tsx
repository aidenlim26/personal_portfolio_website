import { ExternalLink } from "@/components/rail";
import { contact, site } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="section">
      <div className="page-grid">
        <div className="col-head">
          <h2 id="contact-heading" className="h2">
            {contact.heading}
          </h2>
        </div>

        <div className="col-body mt-8">
          <ul className="flex flex-col gap-3">
            <li>
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </li>
            <li>
              <ExternalLink href={site.linkedin}>{site.linkedinHandle}</ExternalLink>
            </li>
            <li>
              <ExternalLink href={site.github}>{site.githubHandle}</ExternalLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
