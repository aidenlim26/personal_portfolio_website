import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { site } from "@/lib/content";

const links = [
  { href: site.github, label: site.githubHandle, name: "GitHub", Icon: GithubIcon, external: true },
  { href: site.linkedin, label: site.linkedinHandle, name: "LinkedIn", Icon: LinkedinIcon, external: true },
  { href: `mailto:${site.email}`, label: site.email, name: "Email", Icon: MailIcon, external: false },
];

export default function SiteFooter() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="section">
      <div className="page-grid">
        <div className="col-head">
          <h2 id="contact-heading" className="h2">
            Get in touch
          </h2>
        </div>

        <div className="col-full mt-9">
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10">
            {links.map(({ href, label, name, Icon, external }) => (
              <li key={name}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-baseline gap-3 link-quiet"
                >
                  <Icon className="h-[0.9em] w-[0.9em] shrink-0 translate-y-[0.06em] text-rink" />
                  <span className="sr-only">{name}: </span>
                  {label}
                  {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
