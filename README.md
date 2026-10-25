# Noor Textile — website

A new site for [Noor Textile](https://noortextile.az), a premium Azerbaijani home textile brand that makes embroidered cushions, tablecloths, napkins and kids' room textile.

The page flows in this order:

1. **Logo intro**: on white, NOOR is laid in gold, TEXTILE appears in black inside the O's, then the camera flies through the first O and the site opens through it. It plays once per browser session. Click anywhere or press **Keç** to skip it.
2. **Hero**: full-screen product photographs with one headline, two actions and a link to the product on screen.
3. **Collections** (`#kolleksiyalar`): four image tiles, each opening the catalogue already filtered.
4. **Feature**: «Xosrov və Şirin» seen through the logo's O-frame, with direct add-to-cart.
5. **About and partners** (`#haqqimizda`, `#terefdaslar`): "Noor means light". On black, a soft gold light follows the pointer and reveals the brand ornament.
6. **Catalogue** (`#kataloq`): category tabs, accent-insensitive search (`sufre` finds `Süfrə`), sorting, and one clear action per product.
7. **Product pages** (`/kataloq/<slug>`), a **cart bar** that appears once something is in the cart, and a **cart drawer** that sends the order to WhatsApp as a ready-written message (no backend needed).

**Live preview:** https://claude.ai/artifact/5fMC3jFQu4r914DQ8EEe9f (private until shared from its Share menu).

## Stack

- **Vue 3** (`<script setup>`, TypeScript) + **Vue Router** + **Vite**
- **Tailwind CSS 4**, with design tokens in `src/styles.css`
- Animations use Vue `<Transition>` / `<TransitionGroup>` and CSS. They follow Emil Kowalski's guidance:
  - strong ease-out curves
  - nothing animates up from `scale(0)`
  - press feedback on buttons
  - hover effects only on devices that can hover
  - reduced-motion support
- Self-hosted fonts:
  - **Bodoni Moda** (display) and **Jost** (text and interface), through Fontsource.
  - Both cover the Azerbaijani glyphs (ə Ə ğ ş ı İ) and ₼.
- The visual system ("seeing through the O": black, white, metallic gold and silver) is documented in **`DESIGN.md`**.

## Run

```bash
npm install
npm run dev              # http://localhost:5173
npm run build            # type-check + production build → dist/
npm run preview
npm run build:artifact   # single-page build for the claude.ai preview → dist-artifact/page/
```

The production build uses real URLs (`/kataloq/<slug>`), so the host must send unknown paths to `index.html` (the default on Vercel and Netlify).

### Logo animation video (Remotion)

The site's intro is native SVG/CSS (`src/components/IntroOverlay.vue`). A matching Remotion composition lives in `video/`, which is a separate React tool for exporting the intro as an MP4 for social media:

```bash
cd video && npm install
npm run studio     # preview
npm run render     # → video/out/noor-intro.mp4
```

Both read the same logo paths (`src/logo/logo-paths.ts`) and use the same timings.

## Brand palette

Only black, white, gold and silver. The full token table, type rules and manuscript components are in `DESIGN.md`.

## Logo

`src/logo/logo-paths.ts` (rendered by `src/components/NoorLogo.vue`) holds a **vector rebuild** of the client's wordmark (`assets/brand/logo-wordmark-original.png`):

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
- **Remotion licence** (only for the `video/` export tool). Companies with more than 3 employees need a [Remotion company licence](https://remotion.pro/license).

## Project layout

```
assets/                 original client material (photos, logos, screenshots)
public/images/          web-ready crops (captions removed)
public/partners/        partner logos (monochrome, transparent)
src/components/         intro, logo, header, footer, home sections, catalogue, cart
src/views/              home, product, 404
src/composables/        cart, intro and scroll-reveal state
src/data/               products, partners, site config
src/logo/               vector logo paths
scripts/                artifact build
video/                  Remotion composition for the MP4 export
BRAND_BRIEF.md          brand / product analysis
```
