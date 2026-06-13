import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedPath | مسیر شغلی پزشکی خود را پیدا کنید",
  description:
    "MedPath به پزشکان ایرانی کمک می‌کند تا قبل از گرفتن تصمیم‌های بزرگ حرفه‌ای، مسیرهای ممکن را کشف و مقایسه کنند.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-white text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
