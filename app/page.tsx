import AiClub from "@/components/ai-club";
import Credentials from "@/components/credentials";
import EServices from "@/components/e-services";
import Hero from "@/components/hero";
import Overture from "@/components/overture";
import Recognition from "@/components/recognition";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import Simulator from "@/components/simulator";
import Timelit from "@/components/timelit";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only bg-cream px-4 py-3 text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <Overture />
        <AiClub />
        <Timelit />
        <Simulator />
        <EServices />
        <Recognition />
        <Credentials />
      </main>

      <SiteFooter />
    </>
  );
}
