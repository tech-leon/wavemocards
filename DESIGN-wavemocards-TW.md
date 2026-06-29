---
version: 1.0
name: Wave Emotion Cards 浪潮情緒卡
description: 溫柔陪伴的情緒覺察與紀錄工具。設計語言以「退潮後平靜的海面」為核心 — 大面積柔灰水面（自訂 gray ramp 語意層）、一道清楚但不刺眼的 teal 浪頭（main）引導動作，以及只在情緒出現時才浮現的九色 pastel 卡片。介面退位，情緒卡與手繪插圖才是主角。系統明確拒絕醫療系統的冰冷、遊戲化計分壓力、SaaS dashboard 的數據密集感；使用者在情緒脆弱時打開 app，所有視覺決策以「安心」為先。三語（zh-TW / ja / en）排版皆成立。Source of truth 為 src/app/globals.css 與 emotion-card-config.ts。

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
    fontFamily: "var(--font-sans)（依 locale 切換）"
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
    backgroundColor: "{colors.happy} 等九色分類底"
    border: "4px solid transparent → hover border-{slug}-dark"
    typography: "{typography.section-title}"
    rounded: "{rounded.xl}"
    padding: "12px → hover 8px"
    size: "140px × 140px"
  emotion-category-card:
    backgroundColor: "九色分類底"
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
    backgroundColor: "{colors.background} 或 {colors.muted}"
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

# Design System: Wave Emotion Cards 浪潮情緒卡

> **Source of truth**：frontmatter 的 token 對應 `src/app/globals.css` 的 `@theme` 與 `:root` / `.dark` 變數，以及 `src/components/emotion/emotion-card-config.ts`。本文件描述「怎麼用」；數值以原始碼為準。

## 1. Overview

**Creative North Star: 「溫柔的浪潮（The Gentle Tide）」**

這是一個陪伴使用者覺察情緒的工具。視覺語言像退潮後平靜的海面：大面積的柔灰水面（gray ramp 語意層）、一道清楚但不刺眼的 teal 浪頭（`{colors.main}`）引導動作，以及只在情緒出現時才浮現的九色 pastel 卡片。介面本身退位，情緒卡與手繪插圖才是主角。

使用者常在諮商、輔導或教育場景被引導開始使用，之後自行在手機或桌面瀏覽器記錄。使用當下情緒可能脆弱，介面必須讓人安心、不能有壓力感。本系統明確拒絕：醫療系統的冰冷（白底藍字掛號系統風）、遊戲化的計分／徽章／打卡壓力、SaaS dashboard 的數據密集感，以及任何讓使用者覺得「被評價」的視覺語言。

**Key Characteristics:**
- 藥丸（pill / `{rounded.full}`）按鈕是唯一的主要動作形狀；尖銳直角不屬於這個產品。
- 一套自訂 gray ramp（含 450 階）+ 語意 token，全系統無第二套灰階。
- 情緒九色只用於情緒分類本身（卡片、分類按鈕、圖表），絕不挪作介面裝飾或狀態色。
- 扁平為主，以色階分層（tonal layering）；陰影只給「漂浮」的元素。
- 三語（zh-TW / ja / en）字體依 locale 自動切換，字級與排版皆成立。
- 圓潤即友善：teal 引導、pink 留意，pastel 與手繪插圖傳遞「不批判的傾聽者」性格。

## 2. Colors

柔和低飽和的 pastel 家族，由一個 teal 主聲部領奏，pink 作為情感較強的副聲部，九色情緒票作為內容主角。

> **Source pages:** 首頁 hero（`/`）、`/explore`（情緒卡選擇與紀錄流程）、`/records`（回顧與分析）、`/account`、`/about-emotions`。

### Primary — Main Teal
品牌主聲部。標題、連結、主要動作、focus ring、選取狀態。
- **Main** (`{colors.main}` — `#3C9DAE`)：`h1`–`h3` 由全域樣式自動套用此色；`--primary` 與 `--ring` 即此色，因此 Shadcn 元件天生對齊品牌。
- **Main Dark** (`{colors.main-dark}` — `#417C88`)：實心 teal 按鈕的 hover 態。
- **Main Tint 01** (`{colors.main-tint01}` — `#85C5D6`)：ProgressBar 完成態、dark mode focus ring、hover 輔助。
- **Main Tint 02** (`{colors.main-tint02}` — `#B1DBE5`)：內容區塊招牌框線（`border-2 border-main-tint02`）、搜尋／日期欄邊框。
- **Main Tint 03** (`{colors.main-tint03}` — `#E6F6FA`)：最淺背景、tint-outline 按鈕 hover 底。

### Secondary — Warm Pink
情感強度較高的副聲部。
- **Pink** (`{colors.pink}` — `#C37979`)：高情感 CTA（註冊、首頁 hero）與刪除／確認這類需要使用者留意的動作。
- **Pink Dark** (`{colors.pink-dark}` — `#B17075`)：實心 pink 按鈕 hover 態。
- **Pink Tint 01** (`{colors.pink-tint01}` — `#D89591`)：情緒卡「加入」浮動鈕底色（hover 轉 `{colors.pink}`）。
- **Pink Tint 02** (`{colors.pink-tint02}` — `#E8B0AC`)：輔助、淺底。

### Tertiary — 情緒九色（Emotion Palette）
唯一的資料色票。每色另有 `-dark` 深一階，專供卡片 border 與 hover 回饋。TS 端鏡像在 `emotion-card-config.ts` 的 `emotionCategoryColors`（供 Recharts 等吃不到 CSS 變數的 SVG 用）。

| 分類 slug | Base | Dark（border / hover） |
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

分類顯示順序固定為 `emotionCategoryOrder`：happy → expectation → relieved → unstable → amazed → sadness → hate → anger → others。

### Neutral — 自訂 Gray Ramp
系統唯一的灰階家族（含 450 半階）。

| Token | Value | Token | Value |
|---|---|---|---|
| `{colors.gray-100}` | `#f8f9fa` | `{colors.gray-500}` | `#adb5bd` |
| `{colors.gray-200}` | `#f2f6f8` | `{colors.gray-600}` | `#6c757d` |
| `{colors.gray-300}` | `#dee2e6` | `{colors.gray-700}` | `#495057` |
| `{colors.gray-400}` | `#ced4da` | `{colors.gray-800}` | `#343a40` |
| `{colors.gray-450}` | `#c5c9cd` | `{colors.gray-900}` | `#212529` |

### Semantic Layer（隨 dark mode 翻轉）
定義於 `:root` 與 `.dark`。所有「亮色／暗色」明暗分歧都透過這層解決，不手寫 `gray-* dark:gray-*`。

| 語意 token | Light | Dark |
|---|---|---|
| `bg-background` / `text-foreground` | gray-100 / gray-800 | gray-900 / gray-100 |
| `bg-muted` | gray-200 `#f2f6f8` | gray-800 `#343a40` |
| `text-muted-foreground` | gray-500 `#adb5bd` | gray-300 `#dee2e6` |
| `border-border` | gray-300 `#dee2e6` | gray-700 `#495057` |
| `border-input` | gray-300 `#dee2e6` | gray-600 `#6c757d` |
| `--primary` / `--ring` | main `#3C9DAE` | main `#3C9DAE` / main-tint01 `#85C5D6` |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |

### Named Rules
- **The Emotion-Only Rule.** 情緒九色只能出現在情緒卡、分類按鈕、情緒圖表。禁止挪作一般介面裝飾或狀態色。
- **The One-Gray Rule.** 中性色只用自家 gray ramp 與語意 token。`slate-*`、`zinc-*`、`stone-*`、`neutral-*` 一律禁止。
- **The Semantic-Pair Rule.** 凡「亮色配 `dark:` 暗色」的成對寫法（如 `text-gray-800 dark:text-gray-100`），都改用語意 token（`text-foreground`）。新 code 不允許再手寫這種配對。

## 3. Typography

### Font Family
依 locale 自動切換（`html:lang()` 切 `--font-sans`，皆含系統字 fallback）：
- **zh-TW / zh-* (`--font-sans-zh`)**：Noto Sans TC → "PingFang TC" → "Microsoft JhengHei" → "Noto Sans CJK TC" → sans-serif。
- **ja (`--font-sans-ja`)**：Noto Sans JP → "Hiragino Sans" → "Yu Gothic" → "Meiryo" → "Noto Sans CJK JP" → sans-serif。
- **en (`--font-sans-en`)**：Inter → Arial → Helvetica → sans-serif。

單一無襯線家族，靠字級與字重做層次。圓體感的 Noto Sans 與品牌的柔和語氣一致。

### Hierarchy
`h1`–`h3` 由全域樣式自動取得字級、700 字重與品牌色（main），不需加 class。其餘文字一律使用 semantic type classes（定義於 `globals.css`）。

| Token / Class | Size | Weight | Color | Use |
|---|---|---|---|---|
| `{typography.hero-display}` `.type-hero-display` | 3rem（md 6rem） | 700 | — | 首頁 hero 大標 |
| `{typography.hero-cta}` `.type-hero-cta` | 1.5rem（md 1.875rem） | 700 | — | hero CTA 文字 |
| `{typography.modal-display}` `.type-modal-display` | 1.875rem（md 3rem） | 700 | — | modal 內卡片大標 |
| `{typography.card-display}` `.type-card-display` | 1.875rem（hover 2.25rem） | 700 | — | 分類卡展示字 |
| `h1` | 2.25rem | 700 | main | 頁面最高標題 |
| `{typography.page-title}` `.type-page-title` / `h2` | 1.5rem | 700 | main | 頁面標題 |
| `{typography.identity}` `.type-identity` | 1.5rem | 700 | foreground | 使用者名稱等身分標識 |
| `{typography.section-title}` `.type-section-title` / `.type-subsection-title` / `h3` | 1.25rem | 700 | main | 區塊／子區塊標題 |
| `{typography.body-lg}` `.type-body-lg` | 1.125rem | 400 | inherit | 內文（大） |
| `{typography.body}` `.type-body` | 1rem | 400 | inherit | 內文（預設） |
| `{typography.body-sm}` `.type-body-sm` | 0.875rem | 400 | inherit | 內文（小） |
| `{typography.button}` `.type-button` | 1rem | 500 | inherit | 按鈕文字（Button 內建） |
| `{typography.button-lg}` `.type-button-lg` | 1.125rem | 700 | inherit | 大按鈕文字 |
| `{typography.caption}` `.type-caption` | 0.75rem | 400 | inherit | 註解、輔助文字、ProgressBar 數字 |

### Named Rules
- **The Type-Class Rule.** 禁止 `text-sm`、`text-xl` 等 Tailwind 字級 utility 與任何 arbitrary 字級。字級只能來自 `.type-*` classes 或 `h1`–`h3`；缺哪一階就先在 `globals.css` 註冊再用。
- **三語並重。** 任何字級決策必須在 zh-TW、ja、en 三種語言下都成立。

## 4. Layout

### Spacing System
- **Base unit**：0.25rem（4px）的 Tailwind 標準刻度。
- **常用 tokens**：`{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.2xl}` 32px。
- **頁面容器**：`max-w-7xl` 置中，水平 padding `px-4 sm:px-6 lg:px-8`。
- **Header 高度**：透過 `--header-height` 變數發佈（SSR fallback 68px，lg 以上 77px）；Header 用 ResizeObserver 即時同步真實高度，sticky 偏移與視窗計算都跟著它。

### Whitespace Philosophy
介面退位給內容：中性灰階做骨架，留白寬鬆，讓情緒卡與插圖成為焦點。情緒卡網格與紀錄列表之間以一致的 gap 呼吸，避免 dashboard 式的密集排版。

## 5. Elevation & Depth

系統以扁平與色階分層（tonal layering）為主：頁面是 `background`，次要表面是 `muted`，邊界靠 `border`。陰影只屬於「漂浮」的東西。

| Level | Treatment | Use |
|---|---|---|
| 0（flat） | 無陰影，用 `bg-muted` 或 `border-border`／`border-main-tint02` 區隔 | 內容卡片、面板 |
| Sticky chrome | `shadow-md` + `backdrop-blur-sm` | 固定頂部的 Header |
| Floating control | `shadow` | 浮在卡片上的小圓鈕（情緒卡加減鈕）、回到頂部按鈕 |
| Popover | `shadow-lg` | dropdown 與 popover 層 |

### Named Rules
- **The Flat-Surface Rule.** 內容卡片與面板不加陰影。會浮起來的（sticky header、popover、floating button）才有影子。

## 6. Shapes

### Border Radius Scale
基準 `--radius: 0.625rem`（10px），其餘以此推導。

| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 0.375rem (6px) | 小型 chrome、icon 容器 |
| `{rounded.md}` | 0.5rem (8px) | Shadcn 預設、icon 按鈕、nav link |
| `{rounded.lg}` | 0.625rem (10px) | 內容容器預設 |
| `{rounded.xl}` | 0.75rem (12px) | 情緒卡、分類卡 |
| `{rounded.2xl}` | 1rem (16px) | Modal、大型容器 |
| `{rounded.full}` | 9999px | 所有按鈕、輸入框、浮動圓鈕、ProgressBar dots |

### Imagery Geometry
情緒卡中央為 64px（`h-16 w-16`）圓形手繪插圖（`rounded-full overflow-hidden`），互動時 `group-hover:scale-110`。插圖來源 `/images/emoCards/{id}.svg`。圓潤的插圖與藥丸是品牌的形狀簽名。

## 7. Components

元件性格：圓潤、明確、不咄咄逼人。

### Buttons
**Shape:** 藥丸（`{rounded.full}`）。Shadcn `Button`（`src/components/ui/button.tsx`）是唯一來源，文字內建 `.type-button`。品牌 variants：

- **`variant="main"`** — `button-main`：實心 teal、白字、700 字重，hover 轉 `{colors.main-dark}`。預設主要動作。
- **`variant="main-outline"`** — `button-main-outline`：2px teal 邊框、teal 字、700，hover 填滿 teal（dark hover 文字轉 gray-900）。次要動作。
- **`variant="main-tint-outline"`**：2px `{colors.main-tint01}` 邊框與字，hover 底 `{colors.main-tint03}`。
- **`variant="pink"`** — `button-pink`：實心 pink、白字，hover 轉 `{colors.pink-dark}`。高情感 CTA 與確認刪除。
- **`variant="pink-outline"`**：2px pink 邊框，hover 淡 pink 底（`pink/10`）。刪除流程的取消鈕。

**Sizes**：`default` h-9（36px）`px-4 py-2`；`sm` h-8（32px）`px-3`；`lg` h-10（40px）`px-6`；`icon` size-9、`icon-sm` size-8、`icon-lg` size-10。Focus 態：`focus-visible:ring-ring/50 ring-[3px]`。

Shadcn 原生 variants（`default`、`outline`、`ghost`、`link`、`secondary`、`destructive`）保留給工具性 UI（icon 鈕、dropdown trigger）；`default` 已對齊品牌 teal（`--primary`）。連結用 `asChild` 包 `Link`。新 code 禁止手刻 `<button className="rounded-full bg-main ...">`。

### Emotion Cards（signature）
- **EmotionCard**：140×140，`{rounded.xl}`，分類底色（`bg-{slug}`），4px 透明 border；互動時 hover 顯示 `border-{slug}-dark` 並把 padding 由 12px 縮到 8px（`hover:p-2`）。中央 64px 圓形插圖（hover scale-110）+ `.type-subsection-title` 卡名（雙字名以 `formatEmotionCardName` 加不斷行空格）。
  - **Action 浮動鈕**：`absolute -top-2 -right-2`，`h-7 w-7 rounded-full shadow`。`add` 用 `{colors.pink-tint01}` 底（hover 轉 pink）+ PlusCircle；`remove` 同色 + XCircle；`added` 用 `gray-800/80`（dark `gray-100/80`）+ Check，不可點。
- **EmotionCategoryCard**：236×140 橫式分類卡，同一套分類色票。
- **單一色票來源**：分類色樣式一律經 `getEmotionCardCategoryStyle(slug)` 取得（回傳 `bg` / `hoverBorder` / `border`）；分類按鈕另有 `categoryBtnColors`（70% 透明底，hover 滿色）。**不得在元件內重抄色票 map。**

### Cards / Containers
- **Corner：** 內容容器 `{rounded.lg}`～`{rounded.2xl}`；modal 用 `{rounded.2xl}`。
- **Background：** `bg-background`（與頁面同層）或 `bg-muted`（次要面板）。
- **Border：** 品牌淺框 `border-2 border-main-tint02`（`{colors.main-tint02}`）是內容區塊的招牌框線（explore、emo-cards 容器與 sticky 標題列下緣）。

### Inputs / Fields
- **Style：** 藥丸形 `{rounded.full}`，`border-2 border-input`、`bg-background`，內距 `px-5 py-2`，`.type-body`。
- **Focus：** `focus:border-main`（轉品牌色），全域 focus ring 為 teal（`--ring`）。
- **搜尋與日期欄：** 同藥丸語彙，邊框用 `{colors.main-tint02}`。

### Modal
- **ConfirmModal**（`src/components/ui/ConfirmModal.tsx`）是唯一的確認對話框基底：`bg-background {rounded.2xl} p-8`、置中插圖、標題色可指定（預設 pink）、actions 放 `Button` 品牌 variants。新確認流程（刪除、取消訂閱、存檔結果等）必須組合它，不得重刻 overlay。

### Navigation
- **Header（`src/components/layout/Header.tsx`）：** sticky `top-0 z-50`、`bg-muted` + `shadow-md` + `backdrop-blur-sm`，`max-w-7xl` 容器。桌機三欄 grid（nav｜logo｜actions），行動版 logo + ThemeToggle + MobileNav。
- **Nav link：** `.type-button rounded-md px-3 py-2`，預設 `text-foreground`，hover 與 current 轉 `text-main`（dark hover 用 `{colors.main-tint01}`）。
- **未登入動作：** 登入為 `main-outline` 藥丸、註冊為 `pink` 藥丸。

### ProgressBar（signature）
Explore 流程的五步步驟條（`src/components/explore/ProgressBar.tsx`），寬 320px（sm 380px）：
- **底線** 2px `bg-gray-300`，**進度線** 2px `bg-main-tint01`（`width: (current-1)/4 ×100%`，`transition 300ms`）。
- **Dots** `w-7 h-7 rounded-full`，`.type-caption` 700：完成 = `bg-main-tint01 text-white`（可點，hover 轉 main）；目前 = `bg-background border-2 border-main-tint01 text-main-tint01`；未完成 = `bg-background border-2 border-gray-450 text-gray-450`（dark `text-gray-300`）。

## 8. Motion

共用 variants 定義於 `src/components/ui/motion.tsx`（framer-motion）。時長 0.2–0.5 秒，進場一律 `ease-out`。

- **fadeIn**：opacity 0→1（in 0.4s / exit 0.2s）。
- **fadeInUp**：y 20→0 + opacity（0.5s ease-out）。`<FadeIn>` / `<FadeInWhenVisible>` wrapper 同義（viewport once）。
- **scaleIn**：scale 0.95→1 + opacity（0.3s ease-out）— modal、彈出。
- **slideInRight**：x 100%→0（0.3s ease-out）— 抽屜／側板。
- **stagger**：容器 `staggerChildren 0.08` + `delayChildren 0.1`，子項 `staggerItem`（y 15→0，0.4s）。

### Named Rules
- **The Shared-Motion Rule.** 動畫用 motion.tsx 的共用 variants（fadeIn / fadeInUp / scaleIn / stagger），不在元件內另寫 transition 數值。
- `prefers-reduced-motion` 全面支援列於 backlog。

## 9. Do's and Don'ts

### Do
- **Do** 品牌色一律用 utility（`text-main`、`bg-pink`）；新色票先進 `globals.css` 的 `@theme` 再使用。
- **Do** 用語意 token 處理明暗：`text-foreground`、`text-muted-foreground`、`bg-background`、`bg-muted`、`border-border`、`border-input`。
- **Do** 主要動作用 `<Button variant="main|main-outline|pink|pink-outline">`（連結 `asChild` 包 `Link`）。
- **Do** 字級只用 `.type-*` classes 或 `h1`–`h3`；按鈕文字交給 Button 內建的 `.type-button`。
- **Do** 圖表顏色從 `emotionCategoryColors`（`emotion-card-config.ts`）取得，並與 `globals.css` 保持同步。
- **Do** 動畫用 motion.tsx 的共用 variants，時長 0.2–0.5s、ease-out。
- **Do** 分類色一律經 `getEmotionCardCategoryStyle()`。

### Don't
- **Don't** 使用 raw hex 或 `text-[#...]`、`border-[#...]` arbitrary value（唯一例外：SVG attribute 吃不到 CSS 變數的圖表常數，須註明對應 token）。
- **Don't** 使用 `slate-*`、`zinc-*`、`stone-*`、`neutral-*` 或任何非自家 gray ramp 的中性色。
- **Don't** 手寫 `text-gray-800 dark:text-gray-100` 這類成對明暗；用語意 token。
- **Don't** 使用 `text-md`（不存在）或任何 Tailwind 字級 utility。
- **Don't** 把情緒九色用在非情緒用途（按鈕、警示、裝飾）。
- **Don't** 重刻 modal overlay、確認對話框、分類色票 map：用 ConfirmModal 與 `getEmotionCardCategoryStyle()`。
- **Don't** 做成醫療系統的冰冷感、遊戲化計分、或 KPI dashboard 風（PRODUCT.md anti-references）。
- **Don't** 在卡片上用粗色條側邊框（`border-l-4` 之類）或 gradient 文字。

## 10. Responsive Behavior

### Breakpoints（Tailwind 預設）
| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 48rem (768px) | hero-display 3rem、hero-cta 1.5rem、modal-display 1.875rem；Header 收為 logo + MobileNav |
| md | ≥ 48rem (768px) | hero-display 6rem、hero-cta 1.875rem、modal-display 3rem |
| lg | ≥ 64rem (1024px) | Header 展開三欄 grid，`--header-height` 升至 77px |

### Touch Targets & A11y
- 目標 WCAG 2.1 AA。按鈕最小高度 36px（`default`），互動圓鈕 28px（`h-7 w-7`）。
- Focus ring 使用品牌色（`--ring`），所有互動元件須有可見 focus 狀態（`focus-visible:ring-[3px]`）。
- 主題支援 light / dark / system，偏好存於使用者 profile。

## 11. Iteration Guide

1. 一次專注一個元件。
2. 直接引用 token 與元件名（`{colors.main}`、`{button-main}`、`{rounded.full}`、`getEmotionCardCategoryStyle()`）。
3. 新色票先進 `globals.css` 的 `@theme`，新字級先進 `.type-*`，再於畫面使用。
4. 新變體以獨立條目新增，勿覆寫既有 token。
5. 預設內文 `.type-body`（1rem）；輔助文字 `.type-caption`。
6. 明暗永遠走語意 token，不手寫 `dark:` 灰階配對。
7. 情緒九色是內容色，不是介面色 — 這條規則不可破。
