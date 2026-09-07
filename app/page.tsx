import AiClub from "@/components/ai-club";
import Credentials from "@/components/credentials";
import EServices from "@/components/e-services";
import Hero from "@/components/hero";
import Hockey from "@/components/hockey";
import Paintings from "@/components/paintings";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import Simulator from "@/components/simulator";
import Stats from "@/components/stats";
import Timelit from "@/components/timelit";
import WhoIAm from "@/components/who-i-am";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-sm bg-surface px-4 py-3 text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <WhoIAm />
        <Stats />
        <AiClub />
        <EServices />
        <Timelit />
        <Simulator />
        <Paintings />
        <Hockey />
        <Credentials />
      </main>

      <SiteFooter />
    </>
  );
}
