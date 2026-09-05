import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import Reveal from "@/components/reveal";
import { site } from "@/lib/content";

const links = [
  { href: site.github, label: site.githubHandle, name: "GitHub", Icon: GithubIcon, external: true },
  { href: site.linkedin, label: site.linkedinHandle, name: "LinkedIn", Icon: LinkedinIcon, external: true },
  { href: `mailto:${site.email}`, label: site.email, name: "Email", Icon: Mail, external: false },
];

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      className="border-border border-t"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 md:py-20 lg:px-12">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-faint font-mono text-xs tracking-[0.22em] uppercase"
          >
            Contact
          </h2>

          <ul className="mt-8 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-10">
            {links.map(({ href, label, name, Icon, external }) => (
              <li key={name}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-muted hover:text-fg -mx-2 inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 text-sm transition-colors"
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="sr-only">{name}: </span>
                  {label}
                  {external ? (
                    <span className="sr-only">(opens in a new tab)</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-faint border-border mt-12 border-t pt-8 font-mono text-xs">
            © {new Date().getFullYear()} {site.name}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
