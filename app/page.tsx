"use client";
import Hero from "@/components/hero";

if (process.env.NODE_ENV !== "production") {
  console.log("Development");
}

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <Hero />
    </main>
  );
}