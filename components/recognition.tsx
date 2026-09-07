import Section from "@/components/section";
import { recognition } from "@/lib/content";

/** A plain list. No images. */
export default function Recognition() {
  return (
    <Section id="recognition" title={recognition.heading}>
      <ul className="border-t border-[var(--rule)]">
        {recognition.items.map((item) => (
          <li key={item.title} className="border-b border-[var(--rule)] py-5">
            <p className="m-0 max-w-[52ch] text-pretty">{item.title}</p>
            <p className="m-0 mt-1 max-w-[52ch] text-pretty small text-muted">
              {item.details.join(". ")}.
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
