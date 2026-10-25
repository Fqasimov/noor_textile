# Noor Textile: Design System

## World: Təzhib (the illuminated manuscript)

The site is built like an illuminated Azerbaijani manuscript, the tradition of Nizami's *Xəmsə*, produced in Tabriz and Shirvan. Noor's flagship cushion, «Xosrov və Şirin», reproduces a miniature from exactly such a manuscript.

Every page is a white folio set in black ink, with gold leaf for rulings and illumination and silver for the quieter second rule. Black lacquer appears only where a bound book has it: the front cover (the intro), the back cover (the footer), and the primary action.

**Refused:** navy, cream or parchment grounds, pill buttons, cards, eyebrow labels above headings, italic accent words, gradient text, and glass.

## Colour

Only four families: black, white, gold, silver.

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0b0b0c` | Text and primary buttons |
| `ink-soft` | `#2b2b2e` | Body copy |
| `paper` | `#ffffff` | The folio ground |
| `wash` | `#f4f4f3` | Neutral plate behind product photographs (never cream) |
| `line` | `#e4e4e2` | Quiet dividers |
| `silver` | `#b9bcc0` | Second rule, input underlines, scrollbar |
| `silver-ink` | `#6a6d71` | Secondary text (5:1 on white) |
| `gold` | `#b08d3e` | Rulings, illumination, large display words only |
| `gold-light` | `#dcc386` | Gold on lacquer, text selection |
| `gold-deep` | `#7a5f22` | Small gold text that must pass contrast |
| `lacquer` | `#0a0a0a` | Covers |

Gold is never used for small text on white; use `gold-deep`.

## Type

- **Display:** Bodoni Moda (variable, optical size 6–96, weight about 420). Its hairlines sharpen with size, which suits couture. Used for headings, product names and the colophon. Numerals are lining.
- **Text and interface:** Jost (variable). A geometric sans that echoes the N and R of the wordmark. Body text is 16–17px with line height 1.6–1.8.
- **Small capitals** (`.smallcaps`): Jost at 0.72rem, tracking 0.22em. Used for navigation and buttons only, never as a label above a heading.
- Prices and counts use Jost with tabular numerals. Bodoni numerals are not used at small sizes.

## Manuscript devices (components)

| Device | Where | Implementation |
|---|---|---|
| **Sərlövhə** (illuminated headpiece) | Opens every section, replacing eyebrow labels | `ornament/SerlovheBand.vue`: the logo's own scroll ornament tiled between gold and silver rules, with a lobed cartouche holding the `h2` |
| **Cədvəl** (ruled frame) | Photographs as miniatures | `.cedvel`: 1px gold rule, 4px paper gap, 1px silver rule |
| **Breaking the frame** | Hero miniature | The photo rises above the top of its ruled frame, as a tree breaks the border in Tabriz painting |
| **Fihrist** (table of contents) | Hero primary action | Categories with dotted leaders and counts; each opens the catalogue filtered to that category |
| **Masnavi columns** | About text | Two columns divided by a centred gold rule |
| **Verse rosette** | End of paragraphs, value titles, colophon | `ornament/GoldRosette.vue` |
| **Rəkabə** (catchword) | Foot of each section | `ornament/CatchWord.vue` repeats the next section's name and links to it |
| **Ruled catalogue** | Product grid | Gold hairlines between columns and silver lines between rows, with no card boxes |
| **Lacquer covers** | Intro and footer | Black lacquer, tooled double frame (gold and dark silver), with a triangular colophon in the footer |

## Motion

There is one authored moment, the **cover opening**:

1. The tooled frame draws on.
2. The logo is illuminated: the gold frames draw, TEXTILE rises, N and R slide in, and a sheen passes once.
3. The lacquer cover swings open on its left hinge (`rotateY(-96deg)`, 1.15s, `cubic-bezier(0.77, 0, 0.175, 1)`).
4. Behind it, the headpiece unrolls from its centre and the hero text settles.

Everything else is functional and quick, following Emil Kowalski's rules:

- the tab underline slides in 300ms, using a strong ease-out
- the catalogue reflows with FLIP (`TransitionGroup`)
- buttons press to `scale(0.97)`
- image crossfades add 2px of blur
- the drawer enters in 450ms and exits in 300ms
- hover effects only run on devices that can hover
- reduced motion is respected

Nothing animates up from scale 0, and no section has its own scroll-triggered entrance.

The same intro exists as a Remotion composition in `video/` for exporting an MP4.

## Browser surfaces

These are themed from the palette:

- text selection is gold-light
- the caret is gold
- the focus ring is 1px gold, offset 4px
- the scrollbar is thin silver
- link underline offset is 0.3em

## Content rules

- Copy is Azerbaijani and states facts the client gave us. No invented claims.
- Prices are in ₼ (AZN). Items without a price read "Qiymət sorğu ilə" and link to WhatsApp.
