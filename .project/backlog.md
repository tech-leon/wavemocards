# Backlog

> 從已刪除的 PLAN.md（前代理工作計畫）整理出的未完成項目。2026-06-11 整理，其餘項目均已完成並由 git history 記錄。

## 待辦

- [ ] **手刻藥丸按鈕遷移至 Button variants（剩餘批次，低優先）**（2026-06-11 設計系統統一的後續）：2026-06-24 Phase 4 已遷移 explore 流程與 Header/MobileNav 登入註冊。剩下這些評估後判定非乾淨藥丸、強遷視覺風險 > 收益，刻意保留：HomeHero hero CTA（超大尺寸 + `border-4 border-white`）、`BackToTopButton`（`motion.button` + `bg-main-tint01`）、三個分頁式 tab 連結（`border` 1px + `font-medium`，改 `main-outline` 會變粗體粗邊框）、`RecordsList`/`RecordDetail`/`RecordAnalysis`（按鈕雜需逐顆目視）。要動的話以視覺驗證為主。
- [ ] **`prefers-reduced-motion` 支援**：motion.tsx 的共用 variants 與 framer-motion 進場動畫尚未尊重 reduced motion 偏好。

- [ ] **i18n 全情境驗證**（PLAN.md i18n 第 18 項）：驗證公開頁 locale prefix 導向正確、私有頁永遠無 prefix、已登入使用者沿用語言偏好、切換語言後 cookie 與資料庫同步、情緒卡內容可在 zh-TW / en / ja 三語切換。
- [ ] **處理 `next build` workspace root 警告**：上層目錄（`/Users/leon`）存在另一個 `pnpm-lock.yaml`，導致 workspace root 被誤推。設定 `turbopack.root` 或整理上層 lockfile。（狀態未重新驗證，修復前先跑一次 `pnpm build` 確認）

## 已完成（2026-06-24 Phase 4 UI token 統一）

- **`gray-* dark:gray-*` 手動配對 token 化**：ThemeToggle、SignOutButton、ExploreStoryBackgroundContent、about-emotions、Footer、StoryTextarea、MobileNav 改用 semantic tokens。刻意保留非中性灰（EmotionTable 情緒色卡文字、EmotionCardModal、各 fallback 預設、ProgressBar/StrengthSelector 客製灰階），換了會在 dark mode 翻色。
- **EmoCardsContent 與 FoldedView 卡片 markup 重複**：抽出 `src/components/emotion/CategoryRepresentativeCard.tsx`，取代兩處重複的 140px 代表卡，消約 50 行。Chrome 驗證 light/dark 皆與原本一致。
- **`main-tint-outline` variant**：`button.tsx` 新增，收編 explore「上一步」鈕（`border-main-tint01`）。
- **Header/MobileNav 登入鈕 dark mode**：原為殘留的 shadcn input 樣式（`border-input` + `bg-input/30`），改用 `main-outline`（品牌青色邊框）。Chrome 已驗證 dark mode 外觀正確。

## 已確認修復（原 PLAN.md 提及，現況已不存在）

- `.DS_Store` 已未被 git 追蹤（`.gitignore` 已涵蓋）。
- `RecordDetail.tsx` 的 `sm:gshrink-0` typo 已不存在。
- records API 已改為 DB 端分頁與 full-text search（見 `20260329_*` migrations 與 `src/lib/records-query.ts`、`records-search.ts`）。
- proxy 已對 `/api/*` 跳過 locale preference 查詢。
- 使用者資料操作已改走 user-scoped client + RLS（`createUserClient`）。

## 不修復（won't-fix，已評估）

- **移除 `tsconfig.json` 的 `allowJs: true`**：做不到。`next build` 每次執行都會把 `allowJs: true` 自動注入 `tsconfig.json`（build log：「reconfigured your tsconfig.json... allowJs was set to true」），框架自己管這個值，手動移除會立刻被加回。2026-06-24 於 tech-debt Phase 1 驗證。
