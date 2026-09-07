import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

// Newsreader's `opsz` axis defaults to 16. next/font drops every non-weight
// axis unless it is asked for, so without this the display face ships at text
// optical size and looks spindly at 39px and above.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Used in one place only — the hero's order book — so it must not delay the
// hero paint. It swaps in over the system mono.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const description =
  "Aiden Lim is sixteen, lives in Hong Kong, and works on three surfaces: ice, canvas, and a text editor.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ice, canvas, and a text editor`,
  description,
  openGraph: {
    title: `${site.name} — ice, canvas, and a text editor`,
    description,
    url: site.url,
    siteName: site.name,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ice, canvas, and a text editor`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#e9edef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
