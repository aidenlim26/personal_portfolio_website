# Aiden Lim — Personal Portfolio

Single-page scrolling portfolio built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**. Fully static — deploys to Vercel with no extra configuration.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

## Structure

| Path | Purpose |
| --- | --- |
| `lib/content.ts` | All copy and data for every section — the single place to edit content. |
| `app/globals.css` | Design tokens (`@theme`), base styles, reveal animation, grid backdrop. |
| `components/` | One component per section, plus `section.tsx` / `reveal.tsx` primitives. |
| `components/ui/` | shadcn-style component directory holding the Dot Border Button. |
| `public/images/` | Headshot, Timelit logo, certificates, and paintings. |

## Notes

- **Timelit title.** Set by `TIMELIT_ROLE` in `lib/content.ts` — change that one value to swap it everywhere.
- **The Dot Border Button** (`components/ui/dot-border-button.tsx`) is vendored verbatim and renders inside a sandboxed iframe. Because pointer events never cross an iframe boundary, `components/hero-cta.tsx` detects the click through the resulting focus change rather than an `onClick`. See the comments in that file before changing it.
- The design system (fonts, palette, motion tier) is documented inline in `app/globals.css`.
