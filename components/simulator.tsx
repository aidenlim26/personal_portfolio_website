import { ExternalLink, RailItem, RailLines } from "@/components/rail";
import Section from "@/components/section";
import { simulator } from "@/lib/content";

export default function Simulator() {
  return (
    <Section
      id="simulator"
      title={simulator.heading}
      rail={
        <>
          <RailLines lines={simulator.rail} />
          <RailItem>
            <ExternalLink href={simulator.repo}>{simulator.repoLabel}</ExternalLink>
          </RailItem>
        </>
      }
    >
      {simulator.paragraphs.map((paragraph) => (
        <p key={paragraph} className="prose-body">
          {paragraph}
        </p>
      ))}
    </Section>
  );
}
