# Wave Emotion Cards — Style Guide

> 最後更新：2026-06-11
> Source of truth：`src/app/globals.css` 的 `@theme` tokens 與 `.type-*` classes。本文件是摘要，兩者衝突時以 `globals.css` 為準。

---

## 🎨 品牌主色（Brand Palette）

唯一自訂品牌色為 **`#3C9DAE`（Teal）**，已定義為 `--color-main` token。
一律使用 Tailwind utility（`text-main`、`bg-main`、`border-main`），**禁止** `text-[#3C9DAE]` 之類的 arbitrary value 或 raw hex。

| Token | Utility 範例 | Hex | 用途 |
|-------|-------------|-----|------|
| `--color-main` | `text-main` / `bg-main` | `#3C9DAE` | 主色、標題、CTA、hover |
| `--color-main-tint01` | `bg-main-tint01` | `#85C5D6` | 主色淺階 1 |
| `--color-main-tint02` | `bg-main-tint02` | `#B1DBE5` | 主色淺階 2 |
| `--color-main-tint03` | `bg-main-tint03` | `#E6F6FA` | 主色淺階 3（背景） |
| `--color-main-dark` | `bg-main-dark` | `#417C88` | 主色深階 |

### Pink Palette

| Token | Hex |
|-------|-----|
| `--color-pink` | `#C37979` |
| `--color-pink-tint01` | `#D89591` |
| `--color-pink-tint02` | `#E8B0AC` |
| `--color-pink-dark` | `#B17075` |

### 情緒分類色（Emotion Colors）

九大情緒分類各有專屬色票，token 以分類命名：

| Token | Hex | 分類 |
|-------|-----|------|
| `--color-happy` | `#FFE589` | 快樂 |
| `--color-expectation` | `#F8C18F` | 期待 |
| `--color-relived` | `#CEE5AF` | 安心 |
| `--color-unstable` | `#E0CACA` | 不安 |
| `--color-amazed` | `#B4B9E7` | 驚訝 |
| `--color-sadness` | `#C5DDE8` | 悲傷 |
| `--color-hate` | `#D6CAC0` | 厭惡 |
| `--color-anger` | `#E0AEAE` | 憤怒 |
| `--color-others` | `#EBEBEB` | 其他 |

### Gray Scale

`--color-gray-100` ~ `--color-gray-900` 已在 `@theme` 中覆寫為自訂灰階（非 Tailwind 預設值），使用 `bg-gray-*` / `text-gray-*` 時實際取到的是這組色票。

---

## ✍️ Typography

`h1`–`h3` 已由全域樣式自動套用品牌色與字級，不需另外加 class。
其他文字一律使用 semantic typography classes，**禁止** `text-md`、`text-[...]` arbitrary 字級。

| Class | 字級 token | 用途 |
|-------|-----------|------|
| `.type-page-title` | `--type-h2` (1.5rem) | 頁面標題（含品牌色、粗體） |
| `.type-section-title` | `--type-h3` (1.25rem) | 區塊標題（含品牌色、粗體） |
| `.type-subsection-title` | `--type-h3` (1.25rem) | 子區塊標題（含品牌色、粗體） |
| `.type-body` | `--type-body` (1rem) | 內文 |
| `.type-body-sm` | `--type-body-sm` (0.875rem) | 小號內文 |
| `.type-caption` | `--type-caption` (0.75rem) | 註解、輔助文字 |
| `.type-button` | `--type-body` (1rem) | 按鈕文字 |
| `.type-button-lg` | `--type-h4` (1.125rem) | 大按鈕文字 |
| `.type-hero-display` | 3rem / md: 6rem | 首頁 hero 主標（responsive） |
| `.type-hero-cta` | 1.5rem / md: 1.875rem | 首頁 hero CTA（responsive） |
| `.type-card-display` | 1.875rem | 卡片展示文字 |
| `.type-card-display-hover` | hover 時 2.25rem | 卡片 hover 放大效果 |

### 字型（依 locale 切換）

由 `html:lang()` 自動切換 `--font-sans`：

| Locale | 字型堆疊 |
|--------|---------|
| `en` | Inter, Arial, Helvetica |
| `zh-TW` | Noto Sans TC, PingFang TC, Microsoft JhengHei |
| `ja` | Noto Sans JP, Hiragino Sans, Yu Gothic, Meiryo |

---

## 🌙 Dark Mode

- 採 Tailwind `class` strategy（`@custom-variant dark`）+ next-themes。
- 頁面背景與主文字色由 `--background` / `--foreground` 控制：light 為 `#F3F4F6` / `#111827`，dark 互換。
- 元件層級的 dark 樣式使用 `dark:` variant，色票仍以 token 為準。
- 使用者主題偏好存於 `profiles.theme_preference`（light / dark / system），登入後由 ThemeSyncer 同步。

---

## 📝 規則摘要

1. 品牌色只用 `text-main` 等 utility，禁止 raw hex 與 `text-[#...]`。
2. 字級只用 `.type-*` semantic classes，禁止 `text-md` 與 arbitrary 字級。
3. Shadcn/UI 的語意色（`primary`、`muted`、`accent`、`destructive` 等）依 Shadcn 慣例使用。
4. 新增色票時先在 `globals.css` 的 `@theme` 註冊 token，再以 utility 使用。
