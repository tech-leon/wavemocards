# 技術債報告 2026-06-24

> Point-in-time 程式碼品質快照與優化計畫。活動清單請見 `backlog.md`;本檔提供評分、優先排序與分階段計畫。
> 規模背景:120 個 TS/TSX 檔、約 10,136 行,最大檔 459 行。

## 結論

相對健康的 codebase,無結構性危機。乾淨度水準以上:零 `any`、零 `TODO/FIXME`、零 `@ts-ignore`、`strict: true`、僅 2 個 non-null assertion。真正值得動手的只有 4 件,大多是低成本快贏:API 寫入重複、profile 建立散落三處且欄位漂移(潛在 bug)、records 寫入端輸入驗證不足(信任邊界),以及完全沒有測試(風險最高、成本也最高)。

## 各類債務概覽

| 類型 | 現況 | 風險 |
|------|------|------|
| Code debt | records POST 寫入重複兩次;profile 建立散落 3 處且欄位漂移 | 中 |
| Test debt | 無測試 runner、零覆蓋率(proxy locale 與 records API 皆無) | 高 |
| Architecture debt | 無明顯問題;`records-*` lib 拆 5 檔屬合理分層 | 低 |
| Dependency debt | `radix-ui` 傘狀套件完全未使用 | 低 |
| Documentation debt | 文件健全 | 極低 |
| UI token debt | 32 檔手刻 pill 按鈕、12 檔手動配 `gray-* dark:gray-*`、2 處 raw hex | 中(已在 backlog) |

## 優先排序

`優先分 =(Impact + Risk)×(6 − Effort)`,分數越高越先做(偏好快贏)。

| # | 項目 | Impact | Risk | Effort | 優先分 | 估時 |
|---|------|:---:|:---:|:---:|:---:|------|
| 1 | records POST 寫入邏輯重複兩份 | 3 | 3 | 1 | 30 | 0.5h |
| 2 | profile 建立散落 3 處、欄位漂移 | 3 | 4 | 2 | 28 | 1.5h |
| 3 | records 寫入端輸入驗證不足 | 3 | 4 | 2 | 28 | 1.5h |
| 4 | 無任何測試 | 4 | 5 | 4 | 18 | 持續 |
| 5 | 移除未使用的 `radix-ui` 傘狀依賴 | 1 | 2 | 1 | 15 | 5min |
| 6 | 移除 `tsconfig` 的 `allowJs: true` | 1 | 2 | 1 | 15 | 10min |
| 7 | `gray-* dark:gray-*` token 化(12 檔) | 2 | 2 | 3 | 12 | 2h |
| 8 | 手刻 pill 按鈕遷移至 Button variants(32 檔) | 3 | 2 | 4 | 10 | 4h |
| 9 | RecordAnalysis 2 處 raw hex token 化 | 1 | 1 | 1 | 10 | 15min |
| 10 | EmoCardsContent 卡片 markup 重複抽元件 | 2 | 1 | 3 | 9 | 2h |
| 11 | `next build` workspace root 警告 | 1 | 1 | 2 | 8 | 30min |

## 重點項目

**#1 records POST 寫入重複** — `src/app/api/records/route.ts:181` 與 `:235` 各有一份近乎一字不差的 `emotion_records` insert(22 行 payload + cards 驗證 + card1/2/3 解構),唯一差別是 `user_id` 來源與用哪個 client。抽成 `buildRecordInsert(body, userId)` 即可砍掉一份。之後新增欄位漏改一處就是靜默資料遺失。

**#2 profile 建立漂移** — 同一個 insert profiles 出現在 `api/records/route.ts:165`、`api/user/route.ts:55`、`lib/profile.ts`。欄位不一致:user 路徑寫 `locale_preference: 'zh-TW'`,records 路徑沒有。「第一次互動是建立記錄」的使用者 profile 會缺 locale 偏好,已是潛在 bug。收斂成 `lib/profile.ts` 單一 `ensureProfile()`。

**#3 輸入驗證不足** — records POST 只驗 `cards`(`route.ts:161`),`beforeLevels`/`afterLevels` 未做 1–10 範圍檢查,六個敘事欄位無長度上限就寫庫。信任邊界,不該省。`api/user/route.ts:127` 的 PUT 驗證完整,可當範本。

**#4 零測試** — 無 runner、零覆蓋率。處理 PII 與使用者敘事的 app,regression 直接打到真實資料。不追求全面覆蓋,只測高價值純函式與 API 契約點:`records-search.ts`(CJK tokenize)、`record-utils.ts`、`i18n/locale.ts`(prefix 解析)、`records-query.ts`(分頁)。

**#5 未使用依賴** — `package.json` 同裝傘狀 `radix-ui` 與個別 `@radix-ui/react-*`,但 src 內無一處 import 自 `"radix-ui"`。`pnpm remove radix-ui`。

## 分階段計畫(可與功能開發並行)

**Phase 1 — 快贏清理(約半天,單一 PR,零功能影響)**
1. `pnpm remove radix-ui`(#5)
2. 移除 `allowJs: true`,跑 `pnpm build` 確認(#6)
3. RecordAnalysis 2 處 hex → token(#9)
4. 抽 `buildRecordInsert()` 消除 #1 重複 → verify:`pnpm build` + 手動建立一筆記錄

**Phase 2 — 正確性收斂(約一天)**
5. 收斂 `ensureProfile()`,補齊 records 路徑的 `locale_preference`(#2)
6. records POST 補 level 範圍與敘事長度驗證(#3)
→ 兩項先各寫一個對應測試再改,正好啟動 Phase 3

**Phase 3 — 測試地基(已建立,持續隨功能滾入)** ✅ 2026-06-24
7. 加 `vitest`(node 環境、`@` alias、無 mock),測 6 個純函式模組共 76 case:`records-validation`(信任邊界)、`i18n/locale`、`records-query`、`record-utils`、`records-search`(純 tokenizer)、`profile-insert`(守 #2 欄位漂移)。`pnpm test` 綠燈,反向 mutation 驗證測試確實咬合。
   → 之後每修一個 bug 先補一個重現測試;元件 / 整合測試待有需求再引入 jsdom

**Phase 4 — UI token 統一(設計系統收尾,可延後,已在 backlog)**
8. `gray-*` 配對 token 化(#7)、pill 按鈕遷移(#8)、EmoCards 卡片抽元件(#10)
