import LogoTile from "@/components/logo-tile";
import { ExternalLink, RailItem, RailLines } from "@/components/rail";
import Section from "@/components/section";
import { timelit } from "@/lib/content";

export default function Timelit() {
  return (
    <Section
      id="timelit"
      title={timelit.heading}
      mark={<LogoTile src={timelit.logo.src} alt={timelit.logo.alt} />}
      rail={
        <>
          <RailLines lines={timelit.rail} />
          <RailItem>
            <ExternalLink href={timelit.url}>{timelit.urlLabel}</ExternalLink>
          </RailItem>
        </>
      }
    >
      {timelit.paragraphs.map((paragraph) => (
        <p key={paragraph} className="prose-body">
          {paragraph}
        </p>
      ))}
    </Section>
  );
}
