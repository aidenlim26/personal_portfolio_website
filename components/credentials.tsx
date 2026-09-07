import { ExternalLink } from "@/components/rail";
import Section from "@/components/section";
import { credentials } from "@/lib/content";

/** Certificates with their verification links, then education. Plain rows. */
export default function Credentials() {
  return (
    <Section id="credentials" title={credentials.heading}>
      <ul className="border-t border-[var(--rule)]">
        {credentials.certificates.map((item) => (
          <li
            key={item.href}
            className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-[var(--rule)] py-5"
          >
            <span className="max-w-[46ch] text-pretty">{item.title}</span>
            <span className="flex items-baseline gap-6 small">
              <span className="text-muted">{credentials.issuer}</span>
              <ExternalLink href={item.href}>Verify</ExternalLink>
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-10 border-t border-[var(--rule)]">
        {credentials.education.map((item) => (
          <li key={item.title} className="border-b border-[var(--rule)] py-5">
            <p className="m-0">{item.title}</p>
            <p className="m-0 mt-1 max-w-[52ch] text-pretty small text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
