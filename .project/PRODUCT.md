# Product

> 本文件由 codebase 分析推導（2026-06-11），供設計與開發決策參考。若與實際產品方向不符，請直接修改。

## Register

product

## Users

想練習情緒覺察與紀錄的一般使用者，以台灣繁體中文使用者為主，並支援日文與英文。常見情境：由諮商、輔導或教育場景引導開始使用，之後自行在手機或桌面瀏覽器上記錄。使用當下情緒可能脆弱，介面必須讓人安心，不能有壓力感。

## Product Purpose

Wave Emotion Cards（浪潮情緒卡）用九大類情緒卡引導使用者辨識並命名情緒，記錄事件脈絡（故事、反應、結果、感受、期待、行動）與前後情緒強度（1 到 10），並提供紀錄回顧、全文搜尋與統計分析，幫助使用者看見自己的情緒模式。

## Brand Personality

溫柔、安心、陪伴。柔和的 pastel 情緒色票、圓潤的藥丸按鈕、手繪風插圖，整體像一位不批判的傾聽者。專業但不冰冷，鼓勵但不催促。

## Anti-references

- 醫療或臨床系統的冰冷感（白底藍字的掛號系統風格）。
- 遊戲化的計分、徽章、連續打卡壓力。
- SaaS dashboard 的數據密集風格：情緒分析頁是回顧工具，不是 KPI 報表。
- 任何讓使用者覺得「被評價」的視覺語言。

## Design Principles

視覺與 token 規則一律以 `DESIGN-wavemocards.md` 為準：§1 Overview 的 Key Characteristics，以及 §2、§3、§4、§6 的 Named Rules。本文件不再重複列出，避免同一套規則散在多份文件裡各自漂移。

## Accessibility & Inclusion

- 目標 WCAG 2.1 AA。
- Focus ring 使用品牌色（`--ring`），所有互動元件須有可見 focus 狀態。
- 主題支援 light / dark / system，偏好存於使用者 profile。
- 動畫皆為短時 ease-out 進場；`prefers-reduced-motion` 已支援：`ThemeProvider.tsx` 的 `<MotionConfig reducedMotion="user">` 涵蓋 framer-motion，`globals.css` 的 media block 涵蓋 CSS transition 與 smooth scroll。
