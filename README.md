# Luxury Wedding Invite — Next.js

A JSON-driven, fully animated luxury wedding invitation. Switch between three
hand-built themes — **Botanical**, **Modern**, **Classic** — live, with scroll
parallax and Framer Motion reveals on every section.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Built with Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion.

## Everything is driven by one file: `data/themes.json`

```
data/themes.json
├── activeTheme          # which theme loads first ("botanical" | "modern" | "classic")
├── themes               # the visual identity of each theme
│   └── <id>
│       ├── palette      # bg / surface / ink / muted / accent / accentSoft / line
│       ├── fonts        # display / body / label  → CSS font variables
│       └── floral       # decorative motif: "wildflower" | "geometric" | "ornament"
└── content              # the actual invite copy + CARD DATA (shared by all themes)
    ├── couple, kicker, dateShort, dateLong, venue, countdownTarget
    ├── invitation       # the "With great joy" block
    ├── story            # "How it bloomed" + image
    ├── festivities      # title + cards[]  ← the schedule cards
    ├── gallery          # title + images[] (each with its own parallax `depth`)
    ├── rsvp             # form labels, options, deadline
    └── footer
```

Change names, dates, the schedule, photos, or colours — **no component edits
needed.** The countdown reads `content.countdownTarget` (ISO date) and ticks live.

## Add your own theme

Drop a new object under `themes` and point `activeTheme` (or the switcher) at it:

```jsonc
"vintage": {
  "id": "vintage",
  "name": "Vintage",
  "tagline": "Sepia & dusty rose",
  "palette": { "bg": "#f3ece1", "ink": "#3a2e28", "accent": "#9b6a52", ... },
  "fonts": {
    "display": "var(--font-playfair)",
    "body": "var(--font-ebgaramond)",
    "label": "var(--font-jost)"
  },
  "floral": "ornament"
}
```

Fonts are loaded in `app/layout.tsx` as CSS variables
(`--font-cormorant`, `--font-playfair`, `--font-fraunces`, `--font-ebgaramond`,
`--font-jost`). Reference them from a theme's `fonts` block, or add a new
`next/font/google` import to introduce another typeface.

## How the motion works

- `components/ui/Motion.tsx` — `<Reveal>` (scroll fade-up with blur) and
  `<Parallax>` (scroll-linked vertical drift), plus `useParallaxValue`.
- `Hero` layers three floral depths that move at different scroll speeds.
- `Gallery` gives each photo its own parallax travel from its JSON `depth`.
- Switching theme cross-fades palette variables and replays section reveals.
- All motion respects `prefers-reduced-motion`.

## Project layout

```
app/            layout (fonts), globals.css, page.tsx
components/      ThemeProvider, ThemeSwitcher
components/ui/   Motion (reveal/parallax), FloralAccent (theme-aware SVG)
components/sections/  Hero, Invitation, OurStory, Festivities, Gallery, Rsvp, Footer
data/themes.json  ← the single source of truth
lib/theme.ts      types + palette→CSS-vars helper
```
