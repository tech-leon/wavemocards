---
name: Wave Emotion Cards
description: 溫柔陪伴的情緒覺察與紀錄工具
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
  expectation: "#F8C18F"
  relieved: "#CEE5AF"
  unstable: "#E0CACA"
  amazed: "#B4B9E7"
  sadness: "#C5DDE8"
  hate: "#D6CAC0"
  anger: "#E0AEAE"
  others: "#EBEBEB"
  background: "#f8f9fa"
  foreground: "#343a40"
  muted: "#f2f6f8"
  muted-foreground: "#adb5bd"
  border: "#dee2e6"
  background-dark: "#212529"
  foreground-dark: "#f8f9fa"
  muted-dark: "#343a40"
  muted-foreground-dark: "#dee2e6"
  border-dark: "#495057"
typography:
  display:
    fontFamily: "Noto Sans TC / Noto Sans JP / Inter（依 locale 切換）"
    fontSize: "3rem (md: 6rem)"
    fontWeight: 700
  headline:
    fontFamily: "同 display"
    fontSize: "1.5rem"
    fontWeight: 700
  title:
    fontFamily: "同 display"
    fontSize: "1.25rem"
    fontWeight: 700
  body:
    fontFamily: "同 display"
    fontSize: "1rem"
    fontWeight: 400
  label:
    fontFamily: "同 display"
    fontSize: "0.75rem"
    fontWeight: 400
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.75rem"
  2xl: "1rem"
  full: "9999px"
components:
  button-main:
    backgroundColor: "{colors.main}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "8px 24px"
  button-main-hover:
    backgroundColor: "{colors.main-dark}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
  button-main-outline:
    backgroundColor: "transparent"
    textColor: "{colors.main}"
    rounded: "{rounded.full}"
    padding: "8px 24px"
  button-pink:
    backgroundColor: "{colors.pink}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "8px 24px"
  button-pink-hover:
    backgroundColor: "{colors.pink-dark}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
  input-pill:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    padding: "8px 20px"
---

# Design System: Wave Emotion Cards 浪潮情緒卡

> Source of truth：frontmatter 的 token 與 `src/app/globals.css`。本文件描述「怎麼用」，數值以 `globals.css` 為準。

## 1. Overview

**Creative North Star: "溫柔的浪潮（The Gentle Tide）"**

這是一個陪伴使用者覺察情緒的工具。視覺語言像退潮後平靜的海面：大面積的柔灰水面（gray ramp 語意層）、一道清楚但不刺眼的 teal 浪頭（`main`）引導動作，以及只在情緒出現時才浮現的九色 pastel 卡片。介面本身退位，情緒卡與手繪插圖才是主角。

本系統明確拒絕：醫療系統的冰冷、遊戲化的計分壓力、SaaS dashboard 的數據密集感。使用者在情緒脆弱時打開這個 app，任何視覺決策都以「安心」為先。

**Key Characteristics:**
- 藥丸（pill）按鈕是唯一的主要動作形狀
- 一套自訂 gray ramp + 語意 token，無第二套灰階
- 情緒九色只用於情緒分類本身
- 扁平為主，陰影只給漂浮元素
- 三語（zh-TW / ja / en）字級與排版皆成立

## 2. Colors

柔和低飽和的 pastel 家族，由一個 teal 主聲部領奏。

### Primary
- **Main Teal**（#3C9DAE，`--color-main`）：標題、連結、主要動作、focus ring、選取狀態。h1 到 h3 由全域樣式自動套用。深階 `main-dark`（#417C88）做 hover；`main-tint01/02/03` 做輔助文字、邊框、淺背景。
- 工具類別：`text-main`、`bg-main`、`border-main` 等。

### Secondary
- **Warm Pink**（#C37979，`--color-pink`）：情感強度較高的 CTA（註冊、首頁 hero）與刪除、取消這類需要使用者留意的動作。深階 `pink-dark`（#B17075）做 hover，tint01/02 做輔助。

### Tertiary
- **情緒九色**（`--color-happy` 等）：happy #FFE589、expectation #F8C18F、relieved #CEE5AF、unstable #E0CACA、amazed #B4B9E7、sadness #C5DDE8、hate #D6CAC0、anger #E0AEAE、others #EBEBEB。每色另有 `-dark` 深一階（如 `--color-happy-dark` #EBD175）專供卡片 border 與 hover 回饋。也是圖表唯一的資料色票（TS 端鏡像在 `emotion-card-config.ts` 的 `emotionCategoryColors`）。

### Neutral
- **自訂 gray ramp**（`--color-gray-100` 到 `--color-gray-900`，含 450）：唯一的灰階家族。
- **語意層**（會隨 dark mode 翻轉，定義於 `:root` 與 `.dark`）：
  - `bg-background` / `text-foreground`：頁面底與主文字（gray-100/gray-800，dark 翻轉）
  - `bg-muted`：次要表面，header、footer、欄位底、面板（gray-200，dark 為 gray-800）
  - `text-muted-foreground`：輔助文字（gray-500，dark 為 gray-300）
  - `border-border`：分隔線與容器邊框；`border-input`：表單控件邊框
  - `--primary` 與 `--ring` 即品牌 teal，Shadcn 元件因此天生對齊品牌

### Named Rules
**The Emotion-Only Rule.** 情緒九色只能出現在情緒卡、分類按鈕、情緒圖表。禁止挪作一般介面裝飾或狀態色。

**The One-Gray Rule.** 中性色只用自家 gray ramp 與語意 token。`slate-*`、`zinc-*`、`stone-*`、`neutral-*` 一律禁止。

**The Semantic-Pair Rule.** 凡是「亮色配 dark: 暗色」的成對寫法（如 `text-gray-800 dark:text-gray-100`），都該用語意 token（`text-foreground`）取代。新 code 不允許再手寫這種配對。

## 3. Typography

**Body Font:** 依 locale 自動切換（`html:lang()`）：zh-TW 用 Noto Sans TC、ja 用 Noto Sans JP、en 用 Inter，皆含系統字 fallback。

**Character:** 單一無襯線家族，靠字級與字重做層次。圓體感的 Noto Sans 與品牌的柔和語氣一致。

### Hierarchy
`h1`–`h3` 由全域樣式自動取得字級、700 字重與品牌色，不需加 class。其餘文字一律使用 semantic type classes（定義於 `globals.css`）：

- **Display**（`.type-hero-display`，3rem，md 6rem，700）：首頁 hero 專用。
- **Headline**（`.type-page-title`，1.5rem，700，main 色）：頁面標題。
- **Title**（`.type-section-title` / `.type-subsection-title`，1.25rem，700，main 色）：區塊與子區塊標題。
- **Modal Display**（`.type-modal-display`，1.875rem，md 3rem）：modal 內的卡片大標。
- **Body**（`.type-body` 1rem / `.type-body-lg` 1.125rem / `.type-body-sm` 0.875rem）：內文三階。
- **Label**（`.type-caption`，0.75rem）：註解、輔助文字。
- **Button**（`.type-button` 1rem 500 / `.type-button-lg` 1.125rem 700）：按鈕文字（Button 元件已內建）。
- **Card Display**（`.type-card-display` 1.875rem，hover 2.25rem）：分類卡展示字。

### Named Rules
**The Type-Class Rule.** 禁止 `text-sm`、`text-xl` 等 Tailwind 字級 utility 與任何 arbitrary 字級。字級只能來自 `.type-*` classes；缺哪一階就先在 `globals.css` 註冊再用。

## 4. Elevation

系統以扁平與色階分層（tonal layering）為主：頁面是 `background`，次要表面是 `muted`，邊界靠 `border`。陰影只屬於「漂浮」的東西。

### Shadow Vocabulary
- **Sticky chrome**（`shadow-md`）：固定在頂部的 Header。
- **Floating control**（`shadow`）：浮在卡片上的小圓鈕（如情緒卡的加減按鈕）、回到頂部按鈕。
- **Popover**（`shadow-lg`）：dropdown 與 popover 層。

### Named Rules
**The Flat-Surface Rule.** 內容卡片與面板不加陰影，用 `bg-muted` 或 `border-border` 區隔。會浮起來的（sticky header、popover、floating button）才有影子。

## 5. Components

元件性格：圓潤、明確、不咄咄逼人。

### Buttons
- **Shape:** 藥丸（rounded-full）。Shadcn `Button` 元件（`src/components/ui/button.tsx`）是唯一來源，品牌 variant 已內建：
  - **`variant="main"`**：實心 teal、白字、700 字重，hover 轉 `main-dark`。預設主要動作。
  - **`variant="main-outline"`**：2px teal 邊框、teal 字，hover 填滿 teal。次要動作。
  - **`variant="pink"`**：實心 pink、白字，hover 轉 `pink-dark`。高情感 CTA 與確認刪除。
  - **`variant="pink-outline"`**：2px pink 邊框，hover 淡 pink 底。刪除流程的取消鈕。
- Shadcn 原生 variants（`default`、`outline`、`ghost`、`link` 等）保留給工具性 UI（icon 鈕、dropdown trigger）；`default` 已對齊品牌 teal（`--primary`）。
- 新 code 禁止手刻 `<button className="rounded-full bg-main ...">`，一律用 `<Button variant>`（連結用 `asChild` 包 `Link`）。

### Emotion Cards
- **EmotionCard**：140×140、`rounded-xl`、分類底色（`bg-{slug}`）、透明 4px border；互動時 hover 顯示 `border-{slug}-dark` 並縮 padding。中央 64px 圓形插圖 + `.type-subsection-title` 卡名。
- **EmotionCategoryCard**：236×140 橫式分類卡，同一套分類色票（單一來源：`emotion-card-config.ts`）。
- **分類色樣式一律經 `getEmotionCardCategoryStyle()` 取得**，不得在元件內重抄色票 map。

### Cards / Containers
- **Corner Style:** 內容容器 `rounded-lg` 到 `rounded-2xl`；modal 用 `rounded-2xl`。
- **Background:** `bg-background`（與頁面同層）或 `bg-muted`（次要面板）。
- **Border:** 品牌淺框 `border-2 border-main-tint02` 是內容區塊的招牌框線（explore、emo-cards 的容器與 sticky 標題列下緣）。

### Inputs / Fields
- **Style:** 藥丸形，`border-2 border-input`、`bg-background`，內距 `px-5 py-2`，`.type-body`。
- **Focus:** `focus:border-main`（顏色轉品牌色），全域 focus ring 為 teal（`--ring`）。
- **搜尋與日期欄**：同藥丸語彙，邊框用 `border-main-tint02`。

### Modal
- **ConfirmModal**（`src/components/ui/ConfirmModal.tsx`）是唯一的確認對話框基底：`bg-background rounded-2xl p-8`、置中插圖、標題色可指定（預設 pink）、actions 放 `Button` 品牌 variants。新確認流程必須組合它，不得重刻 overlay。

### Navigation
- **Header:** sticky、`bg-muted` + `shadow-md` + backdrop blur。連結 `.type-button`，預設 `text-foreground`，hover 與 current 轉 `text-main`（dark hover 用 `main-tint01`）。
- **未登入動作**：登入為 main-outline 藥丸、註冊為 pink 藥丸。

### ProgressBar（signature）
- Explore 流程的步驟條：完成步驟為 `main-tint01` 實心圓、目前步驟為 `border-main-tint01` 空心圓、未完成為 `border-gray-450`，步驟間以細線連接。

## 6. Do's and Don'ts

### Do:
- **Do** 品牌色一律用 utility（`text-main`、`bg-pink`）；新色票先進 `globals.css` 的 `@theme` 再使用。
- **Do** 用語意 token 處理明暗：`text-foreground`、`text-muted-foreground`、`bg-background`、`bg-muted`、`border-border`、`border-input`。
- **Do** 主要動作用 `<Button variant="main|main-outline|pink|pink-outline">`。
- **Do** 字級只用 `.type-*` classes；按鈕文字交給 Button 元件內建的 `.type-button`。
- **Do** 圖表顏色從 `emotionCategoryColors`（`emotion-card-config.ts`）取得，並與 `globals.css` 保持同步。
- **Do** 動畫用 `src/components/ui/motion.tsx` 的共用 variants（fadeIn、fadeInUp、stagger），時長 0.2 到 0.7 秒、ease-out。

### Don't:
- **Don't** 使用 raw hex 或 `text-[#...]`、`border-[#...]` arbitrary value（唯一例外：SVG attribute 吃不到 CSS 變數的圖表常數，須註明對應 token）。
- **Don't** 使用 `slate-*`、`zinc-*`、`stone-*`、`neutral-*` 或任何非自家 gray ramp 的中性色。
- **Don't** 手寫 `text-gray-800 dark:text-gray-100` 這類成對明暗；用語意 token。
- **Don't** 使用 `text-md`（不存在）或 Tailwind 字級 utility。
- **Don't** 把情緒九色用在非情緒用途（按鈕、警示、裝飾）。
- **Don't** 重刻 modal overlay、確認對話框、分類色票 map：用 ConfirmModal 與 `getEmotionCardCategoryStyle()`。
- **Don't** 做成醫療系統的冰冷感、遊戲化計分、或 KPI dashboard 風（PRODUCT.md anti-references）。
- **Don't** 在卡片上用粗色條側邊框（`border-l-4` 之類）或 gradient 文字。
