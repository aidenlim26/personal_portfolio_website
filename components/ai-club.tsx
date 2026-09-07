import LogoTile from "@/components/logo-tile";
import { RailLines } from "@/components/rail";
import Section from "@/components/section";
import { aiClub } from "@/lib/content";

/** Plain prose under three short subheadings. Nothing is folded away. */
export default function AiClub() {
  return (
    <Section
      id="ai-club"
      title={aiClub.heading}
      mark={<LogoTile src={aiClub.logo.src} alt={aiClub.logo.alt} />}
      rail={<RailLines lines={aiClub.rail} />}
    >
      <p className="prose-body">{aiClub.lead}</p>

      <div className="mt-8 flex flex-col gap-6">
        {aiClub.items.map((item) => (
          <div key={item.title}>
            <h3 className="h3">{item.title}</h3>
            <p className="prose-body mt-1">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
