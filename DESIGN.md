# Noor Textile: Design System

## Idea: seeing through the O

*Noor* means light. The wordmark has two O's, each an ornamental frame. The site is built on that one image: the brand is a window you look through.

- The intro flies the camera **through the first O**, and the site opens through it.
- The flagship piece is shown **inside an O-frame** (`RingWindow`).
- On black, the brand's ornament only appears where **light** falls (`LightSection`).

Everything else stays quiet: white space, large photography, one serif voice, and very few controls.

**Refused:**
- navy and cream
- repeating ornament bands
- boxed cards and eyebrow labels
- pill buttons
- more than one primary action per screen

## Colour

Only black, white, gold and silver, with the two metals rendered as metal rather than flat tones.

| Token | Value | Role |
|---|---|---|
| `ink` | `#0d0c0a` | Warm black: text and primary buttons |
| `ink-soft` | `#3a3833` | Body copy |
| `paper` | `#ffffff` | Ground |
| `wash` | `#f4f3f1` | Neutral plate behind product photographs |
| `line` | `#e7e5e1` | Dividers |
| `silver` / `silver-ink` | `#b7b9bd` / `#6b6c70` | Quiet structure / secondary text (5:1 on white) |
| `gold` / `gold-light` / `gold-deep` | `#b38b3a` / `#e9cf8c` / `#7d5d1e` | Single-tone gold where foil can't be used |
| `night` | `#0b0a08` | The light section and the footer |
| `.foil` / `.foil-fill` | 6-stop gradient `#7d5d1e → #f3dfa0 → #8a6a26` | Metallic gold for the wordmark, the word "işıq", active states, cart count |

## Type

- **Bodoni Moda** (display, weight 460 with optical sizing): headings, product names, large statements.
- **Jost**: body, interface, prices (tabular numerals). It echoes the geometric N and R of the wordmark.
- `.smallcaps` (Jost, 0.7rem, tracking 0.22em) is for buttons and the header only.

## Pages and usage

- **Header:**
  - On the left, a menu (full-screen, large Bodoni links, opening with a clip reveal) and a link to the catalogue.
  - The wordmark sits in the centre.
  - On the right, the cart with a gold count.
  - The header is transparent over the hero photograph and turns white after scrolling.
- **Hero:**
  - Full-bleed photographs cross-fade with a slow zoom.
  - One headline and two actions.
  - A shoppable credit names the product on screen.
  - Progress ticks let visitors switch photos.
- **Collections:** four tall image tiles. Each one opens the catalogue already filtered.
- **Feature:** «Xosrov və Şirin» seen through the O-frame, with its story, size, price and a direct "add to cart".
- **Light section:** "«Noor» işıq deməkdir", three values, and the partner marks in silver on black.
- **Catalogue:**
  - The category tabs have a sliding foil underline.
  - Search ignores accents, and there is a sort control.
  - Each card has one always-visible action: add to cart, or ask on WhatsApp when there is no price.
- **Cart bar:** once the cart has something in it, a black bar rises at the bottom with the item count, the total and "Sifariş". The cart is never more than one tap away.
- **Cart drawer:** visible labels, the total, and the order sent to WhatsApp as a ready-written message.
- **Footer:** contacts, then the wordmark in foil across the full width.

## Motion

- **The authored moment:** the intro (`IntroOverlay.vue`).
  1. The gold frames draw on, N and R slide in, and a sheen passes once.
  2. TEXTILE rises in black.
  3. A 1.35s quartic ease-in-out zoom flies through the gap between E and X, while a circular mask opens the site through the O.

  Clicking anywhere or pressing "Keç" starts the fly-through immediately.
- **Ambient:** the hero cross-fade with slow zoom, the cross-fade inside the O-frame, and the light that follows the pointer with a lag (it drifts on its own on touch screens).
- **Functional** (Emil Kowalski's rules):
  - press feedback of `scale(0.97)`
  - the tab underline slides in 300ms with a strong ease-out
  - the catalogue reflows with FLIP
  - crossfades use a 2px blur
  - drawers enter in 450ms and exit in 300ms
  - hover effects only run on devices that can hover
  - reduced motion is honoured everywhere

The same intro exists as a Remotion composition in `video/` for exporting an MP4.

## Implementation notes

- **Artifact viewer reset:** the viewer adds an unlayered `img { max-width: 100% }` rule, which beats Tailwind's layered utilities. Images that need a size other than "fill the parent" are therefore sized with inline styles (see the partner logos).
- **Logo artwork:** everything is drawn from the vector paths in `src/logo/logo-paths.ts`.
