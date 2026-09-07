import Credentials from "@/components/credentials";
import Hero from "@/components/hero";
import Overture from "@/components/overture";
import Recognition from "@/components/recognition";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

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
        <Recognition />
        <Credentials />
      </main>

      <SiteFooter />
    </>
  );
}
