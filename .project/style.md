# Wave Emotion Cards — Style Guide

> 最後更新：2026-02-27

---

## 🎨 品牌主色（Brand Color）

| 用途 | Hex | 說明 |
|------|-----|------|
| 主要強調色 | `#3C9DAE` | 所有 heading、hover 文字、hover 背景、按鈕 hover 皆使用此色 |

---

## ☀️ Light Mode

| 用途 | Tailwind Token | Hex 參考值 |
|------|---------------|-----------|
| 頁面背景 | `bg-gray-100` | `#F3F4F6` |
| 主要文字 | `text-gray-900` | `#111827` |
| 次要文字（連結 / Icon） | `text-gray-800` | `#1F2937` |
| 標題文字（h1–h6） | `text-[#3C9DAE]` | `#3C9DAE` |
| Hover 文字 | `hover:text-[#3C9DAE]` | `#3C9DAE` |
| 按鈕背景 | `bg-zinc-800` | `#27272A` |
| 按鈕文字 | `text-zinc-200` | `#E4E4E7` |
| 按鈕 Hover 背景 | `hover:bg-[#3C9DAE]` | `#3C9DAE` |
| 按鈕 Hover 文字 | `hover:text-zinc-800` | `#27272A` |
| Footer 連結文字 | `text-zinc-900` | `#18181B` |

---

## 🌙 Dark Mode

| 用途 | Tailwind Token | Hex 參考值 |
|------|---------------|-----------|
| 頁面背景 | `dark:bg-gray-900` | `#111827` |
| 主要文字 | `dark:text-gray-100` | `#F3F4F6` |
| Icon 填色 | `dark:fill-gray-100` | `#F3F4F6` |
| 按鈕背景 | `dark:bg-zinc-200` | `#E4E4E7` |
| 按鈕文字 | `dark:text-zinc-800` | `#27272A` |
| 按鈕 Hover 背景 | `dark:hover:bg-[#3C9DAE]` | `#3C9DAE` |
| Mode Toggle Hover 背景 | `dark:hover:bg-yellow-100` | `#FEF9C3` |
| Mode Toggle Hover 文字 | `dark:hover:text-black` | `#000000` |
| Footer 連結文字 | `dark:text-zinc-50` | `#FAFAFA` |

---

## 📌 顏色總覽（Color Palette Summary）

| 色票 | Hex | 用途分類 |
|------|-----|---------|
| 🟦 Brand Teal | `#3C9DAE` | 主色、CTA、標題 |
| ⬛ Background Dark | `#111827` | Dark 背景 / Light 主字 |
| ⬜ Background Light | `#F3F4F6` | Light 背景 / Dark 主字 |
| 🩶 Zinc 800 | `#27272A` | Light 按鈕背景 |
| 🤍 Zinc 200 | `#E4E4E7` | Dark 按鈕背景 / Light 按鈕字 |
| 🟡 Yellow 100 | `#FEF9C3` | Dark Toggle Hover 背景 |
| ⬛ Black | `#000000` | Dark Toggle Hover 文字 |

---

## 📝 備註

- 唯一自訂品牌色為 **`#3C9DAE`（Teal）**，全站統一使用。
- Dark mode 切換機制採 Tailwind `class` strategy（`darkMode: ["class"]`）+ next-themes。
