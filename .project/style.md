# Wave Emotion Cards — Style Guide（速查）

> 最後更新：2026-06-11
> 完整設計系統見根目錄 **`DESIGN.md`**；token source of truth 是 `src/app/globals.css`。三者衝突時以 `globals.css` 為準。

---

## 🎨 品牌主色（Brand Palette）

唯一自訂品牌色為 **`#3C9DAE`（Teal）**，token `--color-main`。
一律使用 Tailwind utility（`text-main`、`bg-main`、`border-main`），**禁止** `text-[#3C9DAE]` 之類的 arbitrary value 或 raw hex。

| Token | Hex | 用途 |
|-------|-----|------|
| `--color-main` | `#3C9DAE` | 主色、標題、CTA、focus ring |
| `--color-main-tint01` | `#85C5D6` | 主色淺階 1 |
| `--color-main-tint02` | `#B1DBE5` | 主色淺階 2（招牌容器框線） |
| `--color-main-tint03` | `#E6F6FA` | 主色淺階 3（背景） |
| `--color-main-dark` | `#417C88` | 主色深階（hover） |
| `--color-main-deep` | `#3893A3` | 主色微深階、保留飽和度（情緒卡片名稱 `.type-card-name`，pastel 底色上較好讀） |
| `--color-pink` | `#C37979` | 高情感 CTA、刪除確認 |
| `--color-pink-dark` | `#B17075` | pink hover |

Pink 另有 tint01 `#D89591`、tint02 `#E8B0AC`。

### 情緒分類色（Emotion Colors）

九大分類各有基色 `--color-{slug}` 與深一階 `--color-{slug}-dark`（卡片 border 與 hover 用）：

| Slug | 基色 | 深階 | 分類 |
|------|------|------|------|
| happy | `#FFE589` | `#EBD175` | 快樂 |
| expectation | `#F8C18F` | `#EAB27E` | 期待 |
| relieved | `#CEE5AF` | `#B0CC8B` | 安心 |
| unstable | `#E0CACA` | `#D7B3B3` | 不安 |
| amazed | `#B4B9E7` | `#969DD7` | 驚訝 |
| sadness | `#C5DDE8` | `#A2C5D6` | 悲傷 |
| hate | `#D6CAC0` | `#C1B1A4` | 厭惡 |
| anger | `#E0AEAE` | `#D19292` | 憤怒 |
| others | `#EBEBEB` | `#CBCBCB` | 其他 |

情緒色**只能**用於情緒卡、分類按鈕、情緒圖表。分類樣式一律經 `getEmotionCardCategoryStyle()`（`emotion-card-config.ts`）取得；圖表用同檔案的 `emotionCategoryColors`。

### 中性色與語意層

`--color-gray-100` ~ `--color-gray-900`（含 450）是唯一灰階家族；**禁止 slate / zinc / stone / neutral**。

明暗主題一律用語意 token（`:root` 與 `.dark` 自動翻轉），**禁止**手寫 `text-gray-800 dark:text-gray-100` 這類成對明暗：

| Utility | Light | Dark | 用途 |
|---------|-------|------|------|
| `bg-background` | gray-100 | gray-900 | 頁面與 sticky 區底色 |
| `text-foreground` | gray-800 | gray-100 | 主文字 |
| `bg-muted` | gray-200 | gray-800 | Header、Footer、欄位底、面板 |
| `text-muted-foreground` | gray-600 | gray-300 | 輔助文字（light 用 gray-600 以過 WCAG AA） |
| `border-border` | gray-300 | gray-700 | 分隔線、容器邊框 |
| `border-input` | gray-300 | gray-600 | 表單控件邊框 |

`--primary` 與 `--ring` 已對齊品牌 teal，Shadcn 元件預設即品牌色。

---

## ✍️ Typography

`h1`–`h3` 已由全域樣式自動套用品牌色與字級，不需另外加 class。
其他文字一律使用 semantic typography classes，**禁止** `text-md`、`text-sm` 等 Tailwind 字級與 arbitrary 字級。

| Class | 字級 | 用途 |
|-------|------|------|
| `.type-page-title` | 1.5rem | 頁面標題（品牌色、粗體） |
| `.type-section-title` / `.type-subsection-title` | 1.25rem | 區塊標題（品牌色、粗體） |
| `.type-body-lg` | 1.125rem | 大號內文 |
| `.type-body` | 1rem | 內文 |
| `.type-body-sm` | 0.875rem | 小號內文 |
| `.type-caption` | 0.75rem | 註解、輔助文字 |
| `.type-button` / `.type-button-lg` | 1rem / 1.125rem | 按鈕文字（Button 元件內建） |
| `.type-hero-display` | 3rem / md 6rem | 首頁 hero 主標 |
| `.type-hero-cta` | 1.5rem / md 1.875rem | 首頁 hero CTA |
| `.type-card-display`（+ `-hover`） | 1.875rem（hover 2.25rem） | 分類卡展示字 |
| `.type-modal-display` | 1.875rem / md 3rem | Modal 內大標 |

每個 `.type-*` 都自帶 `line-height`（內文 1.6–1.7 利於三語 CJK 閱讀,標題 1.3,展示字 1.05–1.15,按鈕 1）。不要在元件內另設行高,要改就改 `globals.css` 的 class。

字型依 locale 切換（`html:lang()`）：en 用 Inter、zh-TW 用 Noto Sans TC、ja 用 Noto Sans JP。

---

## 🔘 按鈕

`src/components/ui/button.tsx` 是唯一來源，品牌 variant 已內建（皆為藥丸形）：

| Variant | 樣式 | 用途 |
|---------|------|------|
| `main` | 實心 teal、白字、粗體 | 預設主要動作 |
| `main-outline` | 2px teal 框，hover 填滿 | 次要動作 |
| `pink` | 實心 pink、白字 | 高情感 CTA、確認刪除 |
| `pink-outline` | 2px pink 框 | 刪除流程的取消 |

新 code 禁止手刻 `<button className="rounded-full bg-main ...">`；連結造型按鈕用 `<Button asChild><Link/></Button>`。確認對話框一律組合 `ConfirmModal`。

---

## 🌙 Dark Mode

- Tailwind `class` strategy（`@custom-variant dark`）+ next-themes。
- 元件層級優先用語意 token；真的需要單邊覆寫才用 `dark:` variant。
- 使用者主題偏好存於 `profiles.theme_preference`（light / dark / system），登入後由 ThemeSyncer 同步。

---

## 📝 規則摘要

1. 品牌色與情緒色只用 token utility，禁止 raw hex 與 arbitrary value。
2. 字級只用 `.type-*` semantic classes。
3. 明暗用語意 token，不手寫 gray 配對；中性色只有自家 gray ramp。
4. 主要動作用 `Button` 品牌 variants，不手刻藥丸按鈕。
5. 新增色票或字級：先在 `globals.css` 的 `@theme` / `:root` 註冊，再以 utility 或 `.type-*` 使用，並同步 `DESIGN.md`。
6. 動效尊重 `prefers-reduced-motion`：framer-motion 由 `ThemeProvider` 的 `<MotionConfig reducedMotion="user">` 全域處理,CSS 動畫由 `globals.css` 的 media query 收掉。新動畫自動繼承,勿繞過。
7. 浮層用品牌青調陰影 token：sticky chrome 用 `shadow-soft`、浮動圓鈕用 `shadow-float`;內容卡維持無陰影（Flat-Surface Rule）。
