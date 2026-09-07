import { ExternalLink, RailItem, RailLines } from "@/components/rail";
import Section from "@/components/section";
import TodoNote from "@/components/todo-note";
import { simulator } from "@/lib/content";

/** No panel and no photograph. Its weight comes from the order book in the hero. */
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
      <TodoNote>{simulator.todo}</TodoNote>
    </Section>
  );
}
