import { getUser } from "@/lib/auth";
import { createPublicMetadata } from "@/lib/i18n/metadata";
import { getRequestLocale } from "@/lib/i18n/request";
import { getTranslations } from "next-intl/server";
import { HomeHero } from "@/components/layout/HomeHero";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return createPublicMetadata({
    pathname: '/',
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    locale,
  });
}

export default async function HomePage() {
  const user = await getUser();
  const locale = await getRequestLocale();

  return <HomeHero isLoggedIn={!!user} locale={locale} />;
}
