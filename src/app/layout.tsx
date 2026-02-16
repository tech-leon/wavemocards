import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { MainLayout } from "@/components/layout";
import { getUser } from "@/lib/auth";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-tc",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://wavemocards.com";

export const metadata: Metadata = {
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
    locale: "zh_TW",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.variable} font-sans antialiased`}>
        <MainLayout user={user}>
          {children}
        </MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
