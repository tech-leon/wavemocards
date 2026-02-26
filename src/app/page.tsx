import { getUser } from "@/lib/auth";
import { HomeHero } from "@/components/layout/HomeHero";

export const metadata = {
  title: "浪潮情緒卡 Wavemocards - 探索你的情緒",
  description: "透過情緒卡認識、探索和記錄你的情緒，讓情緒成為你的力量",
  keywords: ["情緒卡", "情緒探索", "心理健康", "情緒管理", "自我覺察"],
};

export default async function HomePage() {
  const user = await getUser();

  return <HomeHero isLoggedIn={!!user} />;
}
