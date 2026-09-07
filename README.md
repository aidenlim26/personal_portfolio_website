# Aiden Lim — Personal Portfolio

Single-page portfolio built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.
Fully static — deploys to Vercel with no extra configuration.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Structure

| Path | Purpose |
| --- | --- |
| `lib/content.ts` | All copy and data for every section — the single place to edit content. |
| `app/globals.css` | Design tokens (`@theme`), the 12-column grid, the type scale. |
| `components/` | One component per section, plus the `section.tsx` / `rail.tsx` / `logo-tile.tsx` primitives. |
| `app/opengraph-image.tsx` | The link-preview card, generated at build time from `lib/content.ts`. |
| `app/fonts/` | Glyph subsets of Newsreader and Archivo used only by the link-preview card. |
| `app/icon.svg` | Favicon. |

## Design

One ground colour, `--cream`, across the whole page. Text and hairline rules are `--ink`; secondary
text is `--muted` (5.8:1 on the cream). `--ochre` is declared but unused: it is reserved for the
focused watch part in the Phase 2 scene and must not appear on headings, links, borders or decoration.

Two families: **Newsreader** for display (loaded with the `opsz` axis — without it the face ships at
text optical size and looks spindly at heading sizes) and **Archivo** for body and UI.

Rules the build holds to:

- No cards, panels, boxes or section background changes. Hairline rules only where a divider is needed.
- No all-caps labels, no numbered section markers, no middle-dot meta strings — dates, roles and
  institutions live in the marginalia rail in columns 9–12.
- No arrows appended to link text. Links are ink, underlined.
- Only two images on the site: the AI Club logo and the Timelit logo, each a 64px tile inside its own
  section. Nothing else is illustrated.
- Nothing animates on load or scroll. The only motion is the link underline and the focus ring.

## Things to know before changing it

- Phase 2 inserts the watch scene directly after the hero. `app/page.tsx` marks the slot.
- The five painting and hockey photographs still in `public/images/` are not referenced anywhere.
