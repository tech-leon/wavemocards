# Backlog

> 從已刪除的 PLAN.md（前代理工作計畫）整理出的未完成項目。2026-06-11 整理，其餘項目均已完成並由 git history 記錄。

## 待辦

- [ ] **手刻藥丸按鈕遷移至 Button variants**（2026-06-11 設計系統統一的後續）：約 20 個檔案仍有手刻 `rounded-full bg-main/bg-pink` 按鈕或連結（explore 流程、emo-cards、Header/MobileNav 的登入註冊、HomeHero CTA 等）。逐步改用 `<Button variant="main|main-outline|pink|pink-outline">`（連結用 `asChild`），視覺規格見 `DESIGN.md` Components。
- [ ] **`prefers-reduced-motion` 支援**：motion.tsx 的共用 variants 與 framer-motion 進場動畫尚未尊重 reduced motion 偏好。
- [ ] **EmoCardsContent 與 explore/cards views 的卡片 markup 重複**：`EmoCardsContent.tsx` 內重複了 `ExpandedView`/`FoldedView` 的 140px 卡片排版，可抽成共用元件。
- [ ] **全站既有 `gray-* dark:gray-*` 手動配對 token 化**（2026-06-11 UI 巡檢遺留）：MobileNav、Footer、StoryTextarea、ThemeToggle 等仍手動配對（grep `dark:` 可列出），應改用 semantic tokens（`border-border`、`text-muted-foreground` 等）。巡檢時視覺上皆可讀，屬獨立重構工作。

- [ ] **i18n 全情境驗證**（PLAN.md i18n 第 18 項）：驗證公開頁 locale prefix 導向正確、私有頁永遠無 prefix、已登入使用者沿用語言偏好、切換語言後 cookie 與資料庫同步、情緒卡內容可在 zh-TW / en / ja 三語切換。
- [ ] **評估移除 `tsconfig.json` 的 `allowJs: true`**：目前仍存在（tsconfig.json:29），全專案皆為 TypeScript，保留會放鬆型別邊界。
- [ ] **處理 `next build` workspace root 警告**：上層目錄（`/Users/leon`）存在另一個 `pnpm-lock.yaml`，導致 workspace root 被誤推。設定 `turbopack.root` 或整理上層 lockfile。（狀態未重新驗證，修復前先跑一次 `pnpm build` 確認）

## 已確認修復（原 PLAN.md 提及，現況已不存在）

- `.DS_Store` 已未被 git 追蹤（`.gitignore` 已涵蓋）。
- `RecordDetail.tsx` 的 `sm:gshrink-0` typo 已不存在。
- records API 已改為 DB 端分頁與 full-text search（見 `20260329_*` migrations 與 `src/lib/records-query.ts`、`records-search.ts`）。
- proxy 已對 `/api/*` 跳過 locale preference 查詢。
- 使用者資料操作已改走 user-scoped client + RLS（`createUserClient`）。
