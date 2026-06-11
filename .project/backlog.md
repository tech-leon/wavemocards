# Backlog

> 從已刪除的 PLAN.md（前代理工作計畫）整理出的未完成項目。2026-06-11 整理，其餘項目均已完成並由 git history 記錄。

## 待辦

- [ ] **i18n 全情境驗證**（PLAN.md i18n 第 18 項）：驗證公開頁 locale prefix 導向正確、私有頁永遠無 prefix、已登入使用者沿用語言偏好、切換語言後 cookie 與資料庫同步、情緒卡內容可在 zh-TW / en / ja 三語切換。
- [ ] **評估移除 `tsconfig.json` 的 `allowJs: true`**：目前仍存在（tsconfig.json:29），全專案皆為 TypeScript，保留會放鬆型別邊界。
- [ ] **處理 `next build` workspace root 警告**：上層目錄（`/Users/leon`）存在另一個 `pnpm-lock.yaml`，導致 workspace root 被誤推。設定 `turbopack.root` 或整理上層 lockfile。（狀態未重新驗證，修復前先跑一次 `pnpm build` 確認）

## 已確認修復（原 PLAN.md 提及，現況已不存在）

- `.DS_Store` 已未被 git 追蹤（`.gitignore` 已涵蓋）。
- `RecordDetail.tsx` 的 `sm:gshrink-0` typo 已不存在。
- records API 已改為 DB 端分頁與 full-text search（見 `20260329_*` migrations 與 `src/lib/records-query.ts`、`records-search.ts`）。
- proxy 已對 `/api/*` 跳過 locale preference 查詢。
- 使用者資料操作已改走 user-scoped client + RLS（`createUserClient`）。
