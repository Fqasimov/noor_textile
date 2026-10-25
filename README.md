# Noor Textile — website

A new site for [Noor Textile](https://noortextile.az), a premium Azerbaijani home textile brand that makes embroidered cushions, tablecloths, napkins and kids' room textile.

The page flows in this order:

1. **Logo intro**: the NOOR TEXTILE wordmark animates in, rendered with Remotion. It plays once per browser session. Clicking anywhere or pressing **Keç** skips it, and it collapses to a static logo when `prefers-reduced-motion` is set.
2. **Hero**: the brand statement, with arched mihrab-style image frames.
3. **About us** (`#haqqimizda`): the brand story and values, followed by a **partners** grid (`#terefdaslar`).
4. **Catalogue** (`#kataloq`): the full product range. It has a sticky toolbar with category tabs, search (accent-insensitive, so `sufre` finds `Süfrə`), sorting, and quick add-to-cart.
5. **Product pages** (`/kataloq/[slug]`): a gallery, details, a quantity picker, add to cart / WhatsApp order, and related products.
6. **Cart drawer**: it sends the finished order to WhatsApp as a pre-filled message. No backend is needed.

## Stack

- **Next.js 16** (App Router, every page statically generated) + React 19 + TypeScript
- **Tailwind CSS 4**, with design tokens in `src/app/globals.css`
- **Motion** for UI transitions. These follow Emil Kowalski's guidance:
  - strong ease-out curves
  - nothing animates up from `scale(0)`
  - press feedback on buttons
  - hover effects only on devices that can hover
  - reduced-motion support
- **Remotion** for the logo intro. It plays in the browser with `@remotion/player` and can also be rendered to MP4 for social media.
- Self-hosted fonts:
  - **Cormorant Garamond** (display) and **Manrope** (UI), through Fontsource.
  - Both cover the Azerbaijani glyphs (ə Ə ğ ş ı İ) and ₼.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint         # type-check
```

### Logo animation (Remotion)

```bash
npm run remotion:studio                       # edit / preview the intro
npm run remotion:render                       # → out/noor-intro.mp4 (for Instagram etc.)
```

The composition lives in `src/remotion/LogoReveal.tsx`. The site and the video share it, so both always match.

## Brand palette

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0b1020` | dark navy-black: intro, hero, footer |
| `navy` / `navy-2` | `#141c33` / `#1f2a4a` | navy surfaces |
| `gold` / `gold-soft` / `gold-deep` | `#b8975a` / `#d9c18f` / `#8a6d35` | accents, ornaments, CTAs |
| `silver` / `silver-soft` | `#a9abae` / `#d8d9db` | logo letters, secondary text on dark |
| `paper` / `mist` / `line` | `#fbf9f5` / `#f2eee7` / `#e5dfd4` | light surfaces and hairlines |

## Logo

`src/components/logo/` holds a **vector rebuild** of the client's wordmark (`assets/brand/logo-wordmark-original.png`):

- **N, R and TEXTILE** use Montserrat glyph outlines, fitted to the original letter boxes.
- **The O-frame ornaments** were redrawn as stroke paths. The source PNG is only 348×158, which is too small to trace cleanly. Strokes also let the intro "draw" the frames on.

**Recommended:** ask the client for the original vector logo (AI/SVG/PDF) and replace the paths in `logo-paths.ts`.

## Editing content

| What | Where |
|---|---|
| Products: name, price, size, colour, description, photos | `src/data/products.ts` |
| Contact details: phone, WhatsApp, email, address, Instagram | `src/data/site.ts` |
| Partner logos | `src/data/partners.ts` + `public/partners/` |
| Product photos | `public/images/products/` |

To mark a product as **price on request**, set `price: null`. To show a photo shot on a white background so it blends into the card, set `cutout: true`.

## Before launch: to confirm with the client

- **Contacts.** The phone (+994 77 597 47 87), email and address come from the old site. Confirm them, and confirm the correct Instagram handle (`@noor_textile` or `@noortextile`).
- **Product names.** Several marketplace listings had no product name, so these are descriptive placeholders:
  - "Nar ağacı", "Heyvan naxışları", "Uzun yastıq, narıncı", "Tünd sarı ornament", "Terrakota medalyon", "Gül çələngi", "Firuzə süfrə-xalça", "Ağ süfrə xalçası"
  - "Qədim Gəncə" was spelled "Gədim Gəncə" in the listing.
- **Missing details:**
  - prices for Palm Summer, Palma and the kids' items
  - the full size of Qədim Gəncə (the listing was cut off at "50×1…")
  - sizes for Muğan and Terrakota medalyon
  - the real size of the long orange cushion (the listing said 45×45)
- **Photos:**
  - 16 product images were cropped from marketplace screenshots and are low resolution. Replace them with the original photos.
  - The two kids' images look like AI-rendered mockups. Use real product photos once they exist.
- **Partner logos.** Get permission to display the partners' logos.
- **Remotion licence.** Companies with more than 3 employees need a [Remotion company licence](https://remotion.pro/license).

## Project layout

```
assets/                 original client material (photos, logos, screenshots)
public/images/          web-ready crops (captions removed)
public/partners/        partner logos (monochrome, transparent)
src/app/                routes: home, /kataloq/[slug], 404, favicon
src/components/         intro, logo, layout, home sections, catalog, product, cart
src/data/               products, partners, site config
src/remotion/           logo reveal composition
BRAND_BRIEF.md          brand / product analysis
```
