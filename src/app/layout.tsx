import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Sans_TC } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { MainLayout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeSyncer } from "@/components/theme/ThemeSyncer";
import { getUser } from "@/lib/auth";
import { getOpenGraphLocale } from "@/lib/i18n/locale";
import { getRequestLocale } from "@/lib/i18n/request";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-tc",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://wavemocards.com";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const t = await getTranslations("meta");
  const siteKeywords = t.raw("siteKeywords") as string[];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("siteTitleDefault"),
      template: t("siteTitleTemplate"),
    },
    description: t("siteDescription"),
    keywords: siteKeywords,
    authors: [{ name: "Wavemocards Team" }],
    creator: "Wavemocards",
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(locale),
      url: siteUrl,
      siteName: t("siteName"),
      title: t("siteTitleDefault"),
      description: t("siteDescription"),
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitleDefault"),
      description: t("siteDescription"),
      images: ["/images/og-image.png"],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/images/favicon.ico",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const locale = await getRequestLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansTC.variable} ${notoSansJP.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ThemeSyncer userId={user?.id ?? null} />
            <MainLayout user={user} locale={locale}>
              {children}
            </MainLayout>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
