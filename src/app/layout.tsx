import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Sans_TC } from "next/font/google";
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

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "浪潮情緒卡 Wavemocards - 探索你的情緒",
      template: "%s｜浪潮情緒卡",
    },
    description: "透過情緒卡認識、探索和記錄你的情緒，讓情緒成為你的力量。65 張情緒卡幫助你覺察內心感受，書寫情緒故事，促進心理健康。",
    keywords: ["情緒卡", "情緒探索", "心理健康", "情緒管理", "自我覺察", "Wavemocards", "浪潮情緒卡", "情緒教育"],
    authors: [{ name: "Wavemocards Team" }],
    creator: "Wavemocards",
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(locale),
      url: siteUrl,
      siteName: "浪潮情緒卡 Wavemocards",
      title: "浪潮情緒卡 Wavemocards - 探索你的情緒",
      description: "透過情緒卡認識、探索和記錄你的情緒，讓情緒成為你的力量。65 張情緒卡幫助你覺察內心感受，書寫情緒故事，促進心理健康。",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "浪潮情緒卡 Wavemocards",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "浪潮情緒卡 Wavemocards - 探索你的情緒",
      description: "透過情緒卡認識、探索和記錄你的情緒，讓情緒成為你的力量。",
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansTC.variable} ${notoSansJP.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeSyncer userId={user?.id ?? null} />
          <MainLayout user={user} locale={locale}>
            {children}
          </MainLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
