import { RailLines } from "@/components/rail";
import Section from "@/components/section";
import { eServices } from "@/lib/content";

export default function EServices() {
  return (
    <Section
      id="e-services"
      title={eServices.heading}
      rail={<RailLines lines={eServices.rail} />}
    >
      {eServices.paragraphs.map((paragraph) => (
        <p key={paragraph} className="prose-body">
          {paragraph}
        </p>
      ))}
    </Section>
  );
}
