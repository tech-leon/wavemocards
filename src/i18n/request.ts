import { getRequestConfig } from "next-intl/server";
import enMessages from "../messages/en.json";
import jaMessages from "../messages/ja.json";
import zhTWMessages from "../messages/zh-TW.json";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Locale } from "@/lib/i18n/locale";

const messages = {
  "zh-TW": zhTWMessages,
  en: enMessages,
  ja: jaMessages,
} satisfies Record<Locale, Record<string, unknown>>;

export default getRequestConfig(async () => {
  const locale = await getRequestLocale();

  return {
    locale,
    messages: messages[locale],
  };
});
