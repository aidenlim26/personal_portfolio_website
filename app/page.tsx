import About from "@/components/about";
import AiClub from "@/components/ai-club";
import Beyond from "@/components/beyond";
import Credentials from "@/components/credentials";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Simulator from "@/components/simulator";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import Timelit from "@/components/timelit";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="bg-surface text-fg border-border sr-only rounded-md border px-4 py-3 text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Timelit />
        <Simulator />
        <AiClub />
        <Experience />
        <Credentials />
        <Beyond />
      </main>

      <SiteFooter />
    </>
  );
}
