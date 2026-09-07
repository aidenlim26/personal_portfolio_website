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
| `app/globals.css` | Design tokens (`@theme`), the 12-column grid, the type scale, and the whole motion budget. |
| `components/` | One component per section, plus the `section.tsx` / `rail.tsx` primitives. |
| `app/opengraph-image.jpg` | The link-preview card. It is a screenshot of the live hero — regenerate it if the hero changes. |
| `app/icon.svg` | Favicon: the triptych, three panels. |

## Design system

The palette is sampled rather than picked: `--ice` is rink ice, `--ink` and `--rink` are the boards
behind it, `--ochre` is the gold vase in *A riot of blossoms* and `--moss` the coastal ridge in
*Peaceful homeland*. Both paintings appear on the page, so every colour has a visible source.

Two families: **Newsreader** for display (loaded with the `opsz` axis — without it the face ships at
text optical size and looks spindly at heading sizes) and **Archivo** for body and UI. JetBrains
Mono appears in exactly one place, the hero's order book, and is not preloaded.

Rules the build holds to:

- No all-caps labels, no numbered section markers, no middle-dot meta strings — dates, roles and
  institutions live in the marginalia rail in columns 9–12.
- No arrows appended to link text. Links are underlined.
- Vertical padding on a section is set by exactly one rule (`.section`), so no two rules can cancel.
- The motion budget is four items and they are all in `globals.css`: the hero panels' arrival, the
  stats count-up, the painting wipe, and user-triggered transitions. Nothing else animates.

## Things to know before changing it

- **`images.qualities`** in `next.config.ts` must list any `quality` value used by `next/image`.
  Next 16 defaults the allowlist to `[75]` and silently coerces anything else.
- **`priority` is deprecated** in Next 16. The hero's first panel uses `preload`; the second uses
  `loading="eager"` because two candidate LCP images should not both be preloaded.
- **`components/stats.tsx`** starts at its settled values and drops to zero only on a client that is
  actually going to animate, so the figures are correct without JavaScript.
- Search the source for `TODO(aiden)` — there are three, and two of them render on the page.
