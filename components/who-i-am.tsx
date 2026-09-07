import { RailLines } from "@/components/rail";
import Section from "@/components/section";
import { about } from "@/lib/content";

export default function WhoIAm() {
  return (
    <Section
      id="about"
      title={about.heading}
      rail={<RailLines lines={about.rail} />}
    >
      <p className="prose-body">{about.paragraph}</p>
    </Section>
  );
}
