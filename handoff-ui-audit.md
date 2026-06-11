# Handoff: 全站 UI 巡檢與顏色可讀性修復

日期：2026-06-11｜分支：`improvement`｜接續者請先讀 `CLAUDE.md`、`.project/style.md`、`DESIGN.md`

## 任務背景

使用 Claude in Chrome 對 localhost:3000（dev server）做全站巡檢：所有頁面、亮暗兩種模式、表格頁，並實際提交多份心情日記驗證 explore 流程。找到的錯誤與顏色可讀性問題直接修復。

## 已完成

### 巡檢範圍（全部通過，除下列修復項）

- 公開頁：首頁、about-emotions、emo-cards（含分類頁、卡片 modal、情緒表 chip 檢視），zh-TW / en / ja 三語首頁
- 登入頁：explore 全流程、records 表格、record 詳細/編輯、analysis 圖表、account
- 實測提交 2 份心情日記（正面情緒走亮色、負面情緒走暗色），編輯後重存也正常
- Console 無錯誤；`pnpm lint` 通過（3 個既有 warning：useProfileForm.ts、records-actions.ts 的 unused imports，與本次無關）

### 修復（未 commit，working tree 上）

兩個檔案，`git diff` 可看全部細節：

1. `src/components/records/RecordsList.tsx`
   - 暗色斑馬紋：`bg-main-tint03/30` 疊深底變中灰、teal 字看不清 → 加 `dark:bg-main/10`、`dark:hover:bg-main/20`
   - `border-gray-200 dark:border-gray-700` → `border-border`；placeholder 與分隔點改 `text-muted-foreground`
2. `src/components/records/RecordAnalysis.tsx`
   - 長條圖 X 軸線寫死 `#343a40`，暗色看不見 → 軸線與刻度改 `currentColor`（移除 `CHART_AXIS_STROKE` 常數）
   - 圓餅圖標籤原用類別色當文字色（亮色下黃字白底不可讀）→ 自訂 label `<text>` 用 `currentColor`
   - 兩張圖 Tooltip 的類組名稱原本染資料色（白底淡黃字幾乎隱形）→ 加 `labelStyle` / `itemStyle` 固定 `var(--color-gray-800)`（tooltip 底色為 recharts 預設白）

全部修復已在 Chrome 亮暗兩模式重新驗證過。

## 已知未處理事項（下個 session 可接手）

1. **未 commit**：上述 2 檔案的修改待使用者確認後提交。
2. `/en`、`/ja` 直接輸入網址會被 locale cookie 導回 `/zh-TW`（proxy 設計：cookie 優先）。透過 header 語言切換器運作正常。判斷為 intended，未動 `src/proxy.ts`，若要改行為需與使用者確認。
3. emo-cards 頁的「展開」按鈕在預設狀態顯示為灰底（active/disabled 樣式），與「收合」「情緒表」外觀不一致，輕微，未改。
4. 測試資料：DB 裡新增了 2 筆 2026-06-11 的 emotion_records（內容為測試用日記），未刪除。
5. 既有大量 `gray-* dark:gray-*` 手動配對（MobileNav、Footer、StoryTextarea、ThemeToggle 等，grep `dark:` 可列出）。巡檢時視覺上皆可讀，故未重構；若要全面 token 化是獨立工作。

## 環境備忘

- dev server 由使用者啟動於 :3000，勿用 preview_* 工具，使用者指定用 Claude in Chrome MCP 驗證
- 已登入狀態（WorkOS），帳號 Leon Wu；主題切換鈕在 header 右上、語言切換在其左
- 分析頁需按「分析」按鈕才會出圖；日期格式 DD/MM/YYYY
- recharts tooltip/label 的 SVG attribute 不吃 CSS var，但 `currentColor` 可以；style object 內可用 CSS var

## 建議下個 session 使用的 skills

- `/code-review`（low/medium）：commit 前看一下這兩個檔案的 diff
- `verify` 或 `run`：若再做 UI 修改需回歸驗證（注意：本專案使用者偏好 Chrome MCP 而非 preview 工具）
- `impeccable`：若要繼續做整體 UI 打磨（如第 3、5 點）
