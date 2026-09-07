import { ExternalLink } from "@/components/rail";
import Section from "@/components/section";
import { credentials } from "@/lib/content";

/** A plain list. No cards, no grid, and no illegible certificate screenshots. */
export default function Credentials() {
  return (
    <Section id="credentials" title={credentials.heading}>
      <ul className="border-t border-[var(--rule)]">
        {credentials.items.map((item) => (
          <li
            key={item.href}
            className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-[var(--rule)] py-5"
          >
            <span className="max-w-[46ch]">{item.title}</span>
            <span className="flex items-baseline gap-6 text-[0.875rem]">
              <span className="text-rink">{credentials.issuer}</span>
              <ExternalLink href={item.href}>Verify</ExternalLink>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
