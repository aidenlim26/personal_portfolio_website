import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hero, site } from "@/lib/content";

export const alt = `${site.name}. ${hero.roles.join(". ")}. ${hero.location}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Both files are Google Fonts subsets containing only the glyphs this card
// uses, so the image builds offline and the bundle stays a few kilobytes.
const newsreader = readFile(join(process.cwd(), "app/fonts/newsreader-og-subset.ttf"));
const archivo = readFile(join(process.cwd(), "app/fonts/archivo-og-subset.ttf"));

export default async function Image() {
  const [newsreaderData, archivoData] = await Promise.all([newsreader, archivo]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f6f1e7",
          color: "#1c1a17",
        }}
      >
        <div
          style={{
            fontFamily: "Newsreader",
            fontSize: 148,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {hero.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Archivo",
            fontSize: 30,
            lineHeight: 1.5,
          }}
        >
          <div>{hero.location}</div>
          <div>{`${hero.roles[0]}. ${hero.roles[1]}.`}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreaderData, style: "normal", weight: 400 },
        { name: "Archivo", data: archivoData, style: "normal", weight: 400 },
      ],
    },
  );
}
