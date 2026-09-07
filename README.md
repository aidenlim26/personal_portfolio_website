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
| `lib/watch-parts.ts` | The watch movement as numbers: part sizes, stop positions, the explode curve and the camera path. Shared by the SVG frame and the 3D scene. |
| `components/overture.tsx` | The overture container. Server-renders the static frame and the four captions; the client swaps in the scene when it can. |
| `components/overture-frame.tsx` | The static exploded-view drawing, an isometric SVG generated from `lib/watch-parts.ts`. |
| `components/watch-scene.ts` | The Three.js scene. Loaded on demand, only on a wide viewport with WebGL and no reduced-motion preference. |
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
- Nothing animates on load. The only motion is the link underline, the focus ring, and the
  overture below the hero, which follows the user's own scrolling and never plays on its own.

## The overture

A scroll-driven exploded watch movement sits directly below the hero. It is a line drawing in 3D:
cream fills so parts occlude, ink crease edges, an inverted hull for silhouettes. No lights, no
materials, no textures, no post-processing. The part in focus is outlined in ochre.

- Native scroll only. The stage is `position: sticky` inside a 900vh container (`--overture-length`
  in `globals.css`), so the whole sequence takes 800vh of travel; scene state is a pure function of
  scroll position (`cameraState`, `explodeAmount`, `focusWeights`). The drawn progress chases the
  scroll progress with a ~140ms exponential ease so stepped wheel input glides; the frame loop runs
  only until the two settle. Nothing snaps and nothing plays on its own.
- Four stops: rotor → AI Club, balance wheel → Timelit, gear train → HFT Trading Simulator,
  mainspring barrel → E-Services Group. Captions are real DOM text tracked to each part's projected
  position; a caption link that receives keyboard focus scrolls its stop into view.
- Fallbacks share one path: reduced motion, no WebGL, a lost context, JavaScript off, and viewports
  under 48rem all get the server-rendered SVG frame with the captions listed beneath it.
- Device pixel ratio is capped at 2, frames are drawn only on scroll, on resize and while the ease
  is settling, and only while the container is on screen. Everything is disposed on unmount.

## Things to know before changing it

- `three` is the only runtime dependency beyond Next and React; `@types/three` is dev-only.
- `images.qualities` in `next.config.ts` must list every `quality` value used by `next/image`.
- The five painting and hockey photographs still in `public/images/` are not referenced anywhere.
