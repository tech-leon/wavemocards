import { getRequestConfig } from "next-intl/server";
import enMessages from "../messages/en.json";
import jaMessages from "../messages/ja.json";
import zhTWMessages from "../messages/zh-TW.json";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Locale } from "@/lib/i18n/locale";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeMessages(
  base: Record<string, unknown>,
  overrides: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(overrides)) {
    const currentValue = result[key];

    if (isPlainObject(currentValue) && isPlainObject(value)) {
      result[key] = mergeMessages(currentValue, value);
      continue;
    }

    result[key] = value;
  }

  return result;
}

const messages = {
  "zh-TW": zhTWMessages,
  en: mergeMessages(zhTWMessages, enMessages),
  ja: mergeMessages(zhTWMessages, jaMessages),
} satisfies Record<Locale, Record<string, unknown>>;

export default getRequestConfig(async () => {
  const locale = await getRequestLocale();

  return {
    locale,
    messages: messages[locale],
  };
});
