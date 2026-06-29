---
version: 1.0
name: Wave Emotion Cards
description: A gentle companion tool for noticing and recording emotions. The design language centres on "a calm sea after the tide has gone out" — a large soft-grey water surface (the custom gray ramp semantic layer), one clear but unobtrusive teal crest (main) that guides action, and the nine pastel emotion cards that surface only when an emotion appears. The interface recedes; the emotion cards and hand-drawn illustrations are the protagonists. The system deliberately rejects the coldness of medical systems, the scoring pressure of gamification, and the data density of SaaS dashboards; users open the app while emotionally vulnerable, so every visual decision puts "reassurance" first. The typography holds up across all three locales (zh-TW / ja / en). Source of truth is src/app/globals.css and emotion-card-config.ts.

colors:
  main: "#3C9DAE"
  main-tint01: "#85C5D6"
  main-tint02: "#B1DBE5"
  main-tint03: "#E6F6FA"
  main-dark: "#417C88"
  pink: "#C37979"
  pink-tint01: "#D89591"
  pink-tint02: "#E8B0AC"
  pink-dark: "#B17075"
  happy: "#FFE589"
  happy-dark: "#EBD175"
  expectation: "#F8C18F"
  expectation-dark: "#EAB27E"
  relieved: "#CEE5AF"
  relieved-dark: "#B0CC8B"
  unstable: "#E0CACA"
  unstable-dark: "#D7B3B3"
  amazed: "#B4B9E7"
  amazed-dark: "#969DD7"
  sadness: "#C5DDE8"
  sadness-dark: "#A2C5D6"
  hate: "#D6CAC0"
  hate-dark: "#C1B1A4"
  anger: "#E0AEAE"
  anger-dark: "#D19292"
  others: "#EBEBEB"
  others-dark: "#CBCBCB"
  gray-100: "#f8f9fa"
  gray-200: "#f2f6f8"
  gray-300: "#dee2e6"
  gray-400: "#ced4da"
  gray-450: "#c5c9cd"
  gray-500: "#adb5bd"
  gray-600: "#6c757d"
  gray-700: "#495057"
  gray-800: "#343a40"
  gray-900: "#212529"
  background: "#f8f9fa"
  foreground: "#343a40"
  muted: "#f2f6f8"
  muted-foreground: "#adb5bd"
  border: "#dee2e6"
  input: "#dee2e6"
  primary: "#3C9DAE"
  primary-foreground: "#f8f9fa"
  ring: "#3C9DAE"
  background-dark: "#212529"
  foreground-dark: "#f8f9fa"
  muted-dark: "#343a40"
  muted-foreground-dark: "#dee2e6"
  border-dark: "#495057"
  input-dark: "#6c757d"
  ring-dark: "#85C5D6"

typography:
  hero-display:
    cssClass: ".type-hero-display"
    fontFamily: "var(--font-sans) (switches by locale)"
    fontSize: "3rem (md: 6rem)"
    fontWeight: 700
  hero-cta:
    cssClass: ".type-hero-cta"
    fontFamily: "var(--font-sans)"
    fontSize: "1.5rem (md: 1.875rem)"
    fontWeight: 700
  modal-display:
    cssClass: ".type-modal-display"
    fontFamily: "var(--font-sans)"
    fontSize: "1.875rem (md: 3rem)"
    fontWeight: 700
  card-display:
    cssClass: ".type-card-display"
    fontFamily: "var(--font-sans)"
    fontSize: "1.875rem (hover: 2.25rem)"
    fontWeight: 700
  page-title:
    cssClass: ".type-page-title"
    fontFamily: "var(--font-sans)"
    fontSize: "1.5rem"
    fontWeight: 700
    color: "{colors.main}"
  identity:
    cssClass: ".type-identity"
    fontFamily: "var(--font-sans)"
    fontSize: "1.5rem"
    fontWeight: 700
    color: "{colors.foreground}"
  section-title:
    cssClass: ".type-section-title / .type-subsection-title"
    fontFamily: "var(--font-sans)"
    fontSize: "1.25rem"
    fontWeight: 700
    color: "{colors.main}"
  body-lg:
    cssClass: ".type-body-lg"
    fontFamily: "var(--font-sans)"
    fontSize: "1.125rem"
    fontWeight: 400
  body:
    cssClass: ".type-body"
    fontFamily: "var(--font-sans)"
    fontSize: "1rem"
    fontWeight: 400
  body-sm:
    cssClass: ".type-body-sm"
    fontFamily: "var(--font-sans)"
    fontSize: "0.875rem"
    fontWeight: 400
  button:
    cssClass: ".type-button"
    fontFamily: "var(--font-sans)"
    fontSize: "1rem"
    fontWeight: 500
  button-lg:
    cssClass: ".type-button-lg"
    fontFamily: "var(--font-sans)"
    fontSize: "1.125rem"
    fontWeight: 700
  caption:
    cssClass: ".type-caption"
    fontFamily: "var(--font-sans)"
    fontSize: "0.75rem"
    fontWeight: 400

rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.75rem"
  2xl: "1rem"
  full: "9999px"

spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  2xl: "2rem"

components:
  button-main:
    backgroundColor: "{colors.main}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    fontWeight: 700
    rounded: "{rounded.full}"
    padding: "8px 16px"
    height: "36px"
  button-main-hover:
    backgroundColor: "{colors.main-dark}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
  button-main-outline:
    backgroundColor: "transparent"
    textColor: "{colors.main}"
    border: "2px solid {colors.main}"
    typography: "{typography.button}"
    fontWeight: 700
    rounded: "{rounded.full}"
    padding: "8px 16px"
  button-pink:
    backgroundColor: "{colors.pink}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  button-pink-hover:
    backgroundColor: "{colors.pink-dark}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
  button-pink-outline:
    backgroundColor: "transparent"
    textColor: "{colors.pink}"
    border: "2px solid {colors.pink}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  emotion-card:
    backgroundColor: "one of the nine category fills, e.g. {colors.happy}"
    border: "4px solid transparent → hover border-{slug}-dark"
    typography: "{typography.section-title}"
    rounded: "{rounded.xl}"
    padding: "12px → hover 8px"
    size: "140px × 140px"
  emotion-category-card:
    backgroundColor: "one of the nine category fills"
    rounded: "{rounded.xl}"
    size: "236px × 140px"
  input-pill:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    border: "2px solid {colors.input}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "8px 20px"
  input-pill-focus:
    backgroundColor: "{colors.background}"
    border: "2px solid {colors.main}"
    rounded: "{rounded.full}"
  card-container:
    backgroundColor: "{colors.background} or {colors.muted}"
    border: "2px solid {colors.main-tint02}"
    rounded: "{rounded.lg}"
  modal:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  header:
    backgroundColor: "{colors.muted}"
    typography: "{typography.button}"
    shadow: "shadow-md + backdrop-blur"
    height: "68px (lg: 77px)"
---

# Design System: Wave Emotion Cards

> **Source of truth:** the tokens in the frontmatter map to the `@theme` block and the `:root` / `.dark` variables in `src/app/globals.css`, plus `src/components/emotion/emotion-card-config.ts`. This document describes "how to use"; the source code is authoritative for the values.

## 1. Overview

**Creative North Star: "The Gentle Tide"**

This is a tool that accompanies users as they notice their emotions. The visual language is like a calm sea after the tide has gone out: a large soft-grey water surface (the gray ramp semantic layer), one clear but unobtrusive teal crest (`{colors.main}`) that guides action, and the nine pastel cards that surface only when an emotion appears. The interface itself recedes; the emotion cards and hand-drawn illustrations are the protagonists.

Users are often guided to start using it in counselling, coaching, or educational settings, then continue recording on their own from a phone or desktop browser. They may be emotionally vulnerable at the moment of use, so the interface must feel reassuring and free of pressure. The system deliberately rejects: the coldness of medical systems (the white-background, blue-text appointment-system look), the scoring / badge / check-in pressure of gamification, the data density of SaaS dashboards, and any visual language that makes users feel they are "being judged".

**Key Characteristics:**
- The pill (`{rounded.full}`) button is the only shape for primary actions; sharp right angles do not belong to this product.
- A single custom gray ramp (including a 450 half-step) + semantic tokens, with no second grayscale anywhere in the system.
- The nine emotion colors are used only for emotion classification itself (cards, category buttons, charts), never repurposed as interface decoration or status colors.
- Mostly flat, layered by tone (tonal layering); shadows are reserved for elements that "float".
- The three-locale fonts (zh-TW / ja / en) switch automatically by locale, and the type scale and layout hold up in each.
- Roundness is friendliness: teal guides, pink draws attention, and the pastels plus hand-drawn illustrations convey the personality of a "non-judgemental listener".

## 2. Colors

A soft, low-saturation pastel family, led by a single teal lead voice, with pink as a more emotionally intense second voice, and the nine emotion swatches as the content protagonists.

> **Source pages:** the home hero (`/`), `/explore` (emotion card selection and recording flow), `/records` (review and analysis), `/account`, `/about-emotions`.

### Primary — Main Teal
The brand lead voice. Headings, links, primary actions, focus ring, selected states.
- **Main** (`{colors.main}` — `#3C9DAE`): `h1`–`h3` get this color automatically from global styles; `--primary` and `--ring` are this color, so Shadcn components align with the brand out of the box.
- **Main Dark** (`{colors.main-dark}` — `#417C88`): the hover state of solid teal buttons.
- **Main Tint 01** (`{colors.main-tint01}` — `#85C5D6`): ProgressBar completed state, dark-mode focus ring, hover support.
- **Main Tint 02** (`{colors.main-tint02}` — `#B1DBE5`): the signature border for content blocks (`border-2 border-main-tint02`), search / date field borders.
- **Main Tint 03** (`{colors.main-tint03}` — `#E6F6FA`): the lightest background, the hover fill of tint-outline buttons.

### Secondary — Warm Pink
The more emotionally intense second voice.
- **Pink** (`{colors.pink}` — `#C37979`): high-emotion CTAs (sign-up, home hero) and actions that need the user's attention, such as delete / confirm.
- **Pink Dark** (`{colors.pink-dark}` — `#B17075`): the hover state of solid pink buttons.
- **Pink Tint 01** (`{colors.pink-tint01}` — `#D89591`): the fill of the emotion card "add" floating button (turns `{colors.pink}` on hover).
- **Pink Tint 02** (`{colors.pink-tint02}` — `#E8B0AC`): support, light fills.

### Tertiary — The Nine Emotion Colors (Emotion Palette)
The only data swatches. Each color also has a `-dark` step, used exclusively for card borders and hover feedback. The TS side mirrors them in `emotionCategoryColors` in `emotion-card-config.ts` (for SVGs such as Recharts that cannot read CSS variables).

| Category slug | Base | Dark (border / hover) |
|---|---|---|
| happy | `{colors.happy}` `#FFE589` | `{colors.happy-dark}` `#EBD175` |
| expectation | `{colors.expectation}` `#F8C18F` | `{colors.expectation-dark}` `#EAB27E` |
| relieved | `{colors.relieved}` `#CEE5AF` | `{colors.relieved-dark}` `#B0CC8B` |
| unstable | `{colors.unstable}` `#E0CACA` | `{colors.unstable-dark}` `#D7B3B3` |
| amazed | `{colors.amazed}` `#B4B9E7` | `{colors.amazed-dark}` `#969DD7` |
| sadness | `{colors.sadness}` `#C5DDE8` | `{colors.sadness-dark}` `#A2C5D6` |
| hate | `{colors.hate}` `#D6CAC0` | `{colors.hate-dark}` `#C1B1A4` |
| anger | `{colors.anger}` `#E0AEAE` | `{colors.anger-dark}` `#D19292` |
| others | `{colors.others}` `#EBEBEB` | `{colors.others-dark}` `#CBCBCB` |

The category display order is fixed by `emotionCategoryOrder`: happy → expectation → relieved → unstable → amazed → sadness → hate → anger → others.

### Neutral — Custom Gray Ramp
The system's only grayscale family (including the 450 half-step).

| Token | Value | Token | Value |
|---|---|---|---|
| `{colors.gray-100}` | `#f8f9fa` | `{colors.gray-500}` | `#adb5bd` |
| `{colors.gray-200}` | `#f2f6f8` | `{colors.gray-600}` | `#6c757d` |
| `{colors.gray-300}` | `#dee2e6` | `{colors.gray-700}` | `#495057` |
| `{colors.gray-400}` | `#ced4da` | `{colors.gray-800}` | `#343a40` |
| `{colors.gray-450}` | `#c5c9cd` | `{colors.gray-900}` | `#212529` |

### Semantic Layer (flips with dark mode)
Defined in `:root` and `.dark`. Every light/dark divergence is resolved through this layer; never hand-write `gray-* dark:gray-*`.

| Semantic token | Light | Dark |
|---|---|---|
| `bg-background` / `text-foreground` | gray-100 / gray-800 | gray-900 / gray-100 |
| `bg-muted` | gray-200 `#f2f6f8` | gray-800 `#343a40` |
| `text-muted-foreground` | gray-500 `#adb5bd` | gray-300 `#dee2e6` |
| `border-border` | gray-300 `#dee2e6` | gray-700 `#495057` |
| `border-input` | gray-300 `#dee2e6` | gray-600 `#6c757d` |
| `--primary` / `--ring` | main `#3C9DAE` | main `#3C9DAE` / main-tint01 `#85C5D6` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |

### Named Rules
- **The Emotion-Only Rule.** The nine emotion colors may only appear on emotion cards, category buttons, and emotion charts. They must not be repurposed as general interface decoration or status colors.
- **The One-Gray Rule.** Neutrals use only the in-house gray ramp and semantic tokens. `slate-*`, `zinc-*`, `stone-*`, and `neutral-*` are all forbidden.
- **The Semantic-Pair Rule.** Any "light color paired with `dark:` color" construction (e.g. `text-gray-800 dark:text-gray-100`) must use a semantic token instead (`text-foreground`). New code may no longer hand-write such pairs.

## 3. Typography

### Font Family
Switches automatically by locale (`html:lang()` sets `--font-sans`, all including system-font fallbacks):
- **zh-TW / zh-* (`--font-sans-zh`):** Noto Sans TC → "PingFang TC" → "Microsoft JhengHei" → "Noto Sans CJK TC" → sans-serif.
- **ja (`--font-sans-ja`):** Noto Sans JP → "Hiragino Sans" → "Yu Gothic" → "Meiryo" → "Noto Sans CJK JP" → sans-serif.
- **en (`--font-sans-en`):** Inter → Arial → Helvetica → sans-serif.

A single sans-serif family, with hierarchy made from type scale and weight. The rounded feel of Noto Sans matches the brand's gentle tone.

### Hierarchy
`h1`–`h3` automatically pick up their size, 700 weight, and brand color (main) from global styles — no class needed. All other text uses the semantic type classes (defined in `globals.css`).

| Token / Class | Size | Weight | Color | Use |
|---|---|---|---|---|
| `{typography.hero-display}` `.type-hero-display` | 3rem (md 6rem) | 700 | — | home hero display heading |
| `{typography.hero-cta}` `.type-hero-cta` | 1.5rem (md 1.875rem) | 700 | — | hero CTA text |
| `{typography.modal-display}` `.type-modal-display` | 1.875rem (md 3rem) | 700 | — | large card heading inside a modal |
| `{typography.card-display}` `.type-card-display` | 1.875rem (hover 2.25rem) | 700 | — | category card display text |
| `h1` | 2.25rem | 700 | main | top-level page heading |
| `{typography.page-title}` `.type-page-title` / `h2` | 1.5rem | 700 | main | page title |
| `{typography.identity}` `.type-identity` | 1.5rem | 700 | foreground | identity labels such as user name |
| `{typography.section-title}` `.type-section-title` / `.type-subsection-title` / `h3` | 1.25rem | 700 | main | section / subsection title |
| `{typography.body-lg}` `.type-body-lg` | 1.125rem | 400 | inherit | body (large) |
| `{typography.body}` `.type-body` | 1rem | 400 | inherit | body (default) |
| `{typography.body-sm}` `.type-body-sm` | 0.875rem | 400 | inherit | body (small) |
| `{typography.button}` `.type-button` | 1rem | 500 | inherit | button text (built into Button) |
| `{typography.button-lg}` `.type-button-lg` | 1.125rem | 700 | inherit | large button text |
| `{typography.caption}` `.type-caption` | 0.75rem | 400 | inherit | captions, support text, ProgressBar numbers |

### Named Rules
- **The Type-Class Rule.** Tailwind size utilities like `text-sm`, `text-xl`, and any arbitrary sizes are forbidden. Sizes may only come from `.type-*` classes or `h1`–`h3`; if a step is missing, register it in `globals.css` first, then use it.
- **All three locales matter equally.** Every type-scale decision must hold up in zh-TW, ja, and en.

## 4. Layout

### Spacing System
- **Base unit:** Tailwind's standard 0.25rem (4px) scale.
- **Common tokens:** `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.2xl}` 32px.
- **Page container:** `max-w-7xl` centred, horizontal padding `px-4 sm:px-6 lg:px-8`.
- **Header height:** published through the `--header-height` variable (SSR fallback 68px, 77px at lg and above); the Header uses a ResizeObserver to keep it in sync with the real height in real time, and sticky offsets and viewport calculations all follow it.

### Whitespace Philosophy
The interface gives way to content: neutral grays form the skeleton, whitespace is generous, and the emotion cards and illustrations become the focus. The emotion card grid and the record list breathe with consistent gaps, avoiding dashboard-style dense layouts.

## 5. Elevation & Depth

The system is primarily flat and layered by tone (tonal layering): the page is `background`, secondary surfaces are `muted`, and boundaries rely on `border`. Shadows belong only to things that "float".

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | no shadow; separated with `bg-muted` or `border-border` / `border-main-tint02` | content cards, panels |
| Sticky chrome | `shadow-md` + `backdrop-blur-sm` | the fixed top Header |
| Floating control | `shadow` | small round buttons floating on cards (emotion card add/remove buttons), the back-to-top button |
| Popover | `shadow-lg` | the dropdown and popover layer |

### Named Rules
- **The Flat-Surface Rule.** Content cards and panels get no shadow. Only things that float (sticky header, popover, floating button) have shadows.

## 6. Shapes

### Border Radius Scale
Based on `--radius: 0.625rem` (10px), with the rest derived from it.

| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 0.375rem (6px) | small chrome, icon containers |
| `{rounded.md}` | 0.5rem (8px) | Shadcn default, icon buttons, nav links |
| `{rounded.lg}` | 0.625rem (10px) | default content container |
| `{rounded.xl}` | 0.75rem (12px) | emotion cards, category cards |
| `{rounded.2xl}` | 1rem (16px) | modals, large containers |
| `{rounded.full}` | 9999px | all buttons, inputs, floating round buttons, ProgressBar dots |

### Imagery Geometry
The centre of an emotion card is a 64px (`h-16 w-16`) circular hand-drawn illustration (`rounded-full overflow-hidden`), which `group-hover:scale-110` on interaction. The illustration source is `/images/emoCards/{id}.svg`. The rounded illustration and the pill are the brand's shape signature.

## 7. Components

Component personality: rounded, clear, never pushy.

### Buttons
**Shape:** pill (`{rounded.full}`). The Shadcn `Button` (`src/components/ui/button.tsx`) is the single source, with `.type-button` built into the text. Brand variants:

- **`variant="main"`** — `button-main`: solid teal, white text, 700 weight, hover turns `{colors.main-dark}`. The default primary action.
- **`variant="main-outline"`** — `button-main-outline`: 2px teal border, teal text, 700, hover fills with teal (dark hover text turns gray-900). Secondary action.
- **`variant="main-tint-outline"`**: 2px `{colors.main-tint01}` border and text, hover fill `{colors.main-tint03}`.
- **`variant="pink"`** — `button-pink`: solid pink, white text, hover turns `{colors.pink-dark}`. High-emotion CTAs and delete confirmation.
- **`variant="pink-outline"`**: 2px pink border, hover light pink fill (`pink/10`). The cancel button in delete flows.

**Sizes:** `default` h-9 (36px) `px-4 py-2`; `sm` h-8 (32px) `px-3`; `lg` h-10 (40px) `px-6`; `icon` size-9, `icon-sm` size-8, `icon-lg` size-10. Focus state: `focus-visible:ring-ring/50 ring-[3px]`.

The Shadcn native variants (`default`, `outline`, `ghost`, `link`, `secondary`, `destructive`) are reserved for utility UI (icon buttons, dropdown triggers); `default` is already aligned with the brand teal (`--primary`). For links, wrap a `Link` with `asChild`. New code must not hand-roll `<button className="rounded-full bg-main ...">`.

### Emotion Cards (signature)
- **EmotionCard:** 140×140, `{rounded.xl}`, category fill (`bg-{slug}`), 4px transparent border; on interaction, hover shows `border-{slug}-dark` and shrinks padding from 12px to 8px (`hover:p-2`). A 64px circular illustration in the centre (hover scale-110) + `.type-subsection-title` card name (two-character names get a non-breaking space via `formatEmotionCardName`).
  - **Action floating button:** `absolute -top-2 -right-2`, `h-7 w-7 rounded-full shadow`. `add` uses a `{colors.pink-tint01}` fill (turns pink on hover) + PlusCircle; `remove` uses the same color + XCircle; `added` uses `gray-800/80` (dark `gray-100/80`) + Check, not clickable.
- **EmotionCategoryCard:** 236×140 horizontal category card, same set of category swatches.
- **Single swatch source:** category color styles are always obtained via `getEmotionCardCategoryStyle(slug)` (returns `bg` / `hoverBorder` / `border`); category buttons additionally have `categoryBtnColors` (70%-opacity fill, full color on hover). **Do not re-copy the swatch map inside components.**

### Cards / Containers
- **Corner:** content containers `{rounded.lg}`–`{rounded.2xl}`; modals use `{rounded.2xl}`.
- **Background:** `bg-background` (same layer as the page) or `bg-muted` (secondary panels).
- **Border:** the brand light frame `border-2 border-main-tint02` (`{colors.main-tint02}`) is the signature border for content blocks (explore, emo-cards containers, and the bottom edge of sticky title bars).

### Inputs / Fields
- **Style:** pill-shaped `{rounded.full}`, `border-2 border-input`, `bg-background`, inner padding `px-5 py-2`, `.type-body`.
- **Focus:** `focus:border-main` (turns brand color); the global focus ring is teal (`--ring`).
- **Search and date fields:** the same pill vocabulary, with a `{colors.main-tint02}` border.

### Modal
- **ConfirmModal** (`src/components/ui/ConfirmModal.tsx`) is the only confirmation-dialog base: `bg-background {rounded.2xl} p-8`, centred illustration, configurable title color (default pink), with actions placed in `Button` brand variants. New confirmation flows (delete, unsubscribe, save results, etc.) must compose it and must not re-build the overlay.

### Navigation
- **Header (`src/components/layout/Header.tsx`):** sticky `top-0 z-50`, `bg-muted` + `shadow-md` + `backdrop-blur-sm`, `max-w-7xl` container. Desktop is a three-column grid (nav | logo | actions); mobile is logo + ThemeToggle + MobileNav.
- **Nav link:** `.type-button rounded-md px-3 py-2`, default `text-foreground`, hover and current turn `text-main` (dark hover uses `{colors.main-tint01}`).
- **Logged-out actions:** sign-in is a `main-outline` pill, sign-up is a `pink` pill.

### ProgressBar (signature)
The five-step progress bar for the Explore flow (`src/components/explore/ProgressBar.tsx`), width 320px (sm 380px):
- **Base line** 2px `bg-gray-300`, **progress line** 2px `bg-main-tint01` (`width: (current-1)/4 ×100%`, `transition 300ms`).
- **Dots** `w-7 h-7 rounded-full`, `.type-caption` 700: completed = `bg-main-tint01 text-white` (clickable, turns main on hover); current = `bg-background border-2 border-main-tint01 text-main-tint01`; incomplete = `bg-background border-2 border-gray-450 text-gray-450` (dark `text-gray-300`).

## 8. Motion

Shared variants are defined in `src/components/ui/motion.tsx` (framer-motion). Durations 0.2–0.5s, with entrances always `ease-out`.

- **fadeIn:** opacity 0→1 (in 0.4s / exit 0.2s).
- **fadeInUp:** y 20→0 + opacity (0.5s ease-out). `<FadeIn>` / `<FadeInWhenVisible>` wrappers are synonyms (viewport once).
- **scaleIn:** scale 0.95→1 + opacity (0.3s ease-out) — modals, pop-ups.
- **slideInRight:** x 100%→0 (0.3s ease-out) — drawers / side panels.
- **stagger:** container `staggerChildren 0.08` + `delayChildren 0.1`, children `staggerItem` (y 15→0, 0.4s).

### Named Rules
- **The Shared-Motion Rule.** Animations use the shared variants in motion.tsx (fadeIn / fadeInUp / scaleIn / stagger); do not write separate transition values inside components.
- Full `prefers-reduced-motion` support is on the backlog.

## 9. Do's and Don'ts

### Do
- **Do** use utilities for brand colors (`text-main`, `bg-pink`); register new swatches in the `@theme` block of `globals.css` before use.
- **Do** use semantic tokens for light/dark: `text-foreground`, `text-muted-foreground`, `bg-background`, `bg-muted`, `border-border`, `border-input`.
- **Do** use `<Button variant="main|main-outline|pink|pink-outline">` for primary actions (wrap a `Link` with `asChild`).
- **Do** use only `.type-*` classes or `h1`–`h3` for type scale; leave button text to Button's built-in `.type-button`.
- **Do** get chart colors from `emotionCategoryColors` (`emotion-card-config.ts`), kept in sync with `globals.css`.
- **Do** use the shared variants in motion.tsx for animation, with 0.2–0.5s durations and ease-out.
- **Do** always go through `getEmotionCardCategoryStyle()` for category colors.

### Don't
- **Don't** use raw hex or `text-[#...]` / `border-[#...]` arbitrary values (the one exception: chart constants in SVG attributes that cannot read CSS variables, which must note the corresponding token).
- **Don't** use `slate-*`, `zinc-*`, `stone-*`, `neutral-*`, or any neutral that isn't the in-house gray ramp.
- **Don't** hand-write light/dark pairs like `text-gray-800 dark:text-gray-100`; use semantic tokens.
- **Don't** use `text-md` (it doesn't exist) or any Tailwind size utility.
- **Don't** use the nine emotion colors for non-emotion purposes (buttons, alerts, decoration).
- **Don't** re-build modal overlays, confirmation dialogs, or the category swatch map: use ConfirmModal and `getEmotionCardCategoryStyle()`.
- **Don't** make it feel like a cold medical system, gamified scoring, or a KPI dashboard (the PRODUCT.md anti-references).
- **Don't** use thick colored side borders on cards (`border-l-4` and the like) or gradient text.

## 10. Responsive Behavior

### Breakpoints (Tailwind defaults)
| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 48rem (768px) | hero-display 3rem, hero-cta 1.5rem, modal-display 1.875rem; Header collapses to logo + MobileNav |
| md | ≥ 48rem (768px) | hero-display 6rem, hero-cta 1.875rem, modal-display 3rem |
| lg | ≥ 64rem (1024px) | Header expands to a three-column grid, `--header-height` rises to 77px |

### Touch Targets & A11y
- Target WCAG 2.1 AA. Minimum button height 36px (`default`), interactive round buttons 28px (`h-7 w-7`).
- The focus ring uses the brand color (`--ring`); all interactive elements must have a visible focus state (`focus-visible:ring-[3px]`).
- Theme support is light / dark / system, with the preference stored in the user profile.

## 11. Iteration Guide

1. Focus on one component at a time.
2. Reference tokens and component names directly (`{colors.main}`, `{button-main}`, `{rounded.full}`, `getEmotionCardCategoryStyle()`).
3. Register new swatches in the `@theme` block of `globals.css` and new type steps as `.type-*` first, then use them on screen.
4. Add new variants as separate entries; do not overwrite existing tokens.
5. Default body text is `.type-body` (1rem); support text is `.type-caption`.
6. Always route light/dark through semantic tokens; never hand-write `dark:` grayscale pairs.
7. The nine emotion colors are content colors, not interface colors — this rule cannot be broken.
