import type { Metadata, Viewport } from "next";
import { Shippori_Mincho_B1, DM_Serif_Display, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import HamburgerMenu from "@/components/HamburgerMenu";

const SITE_URL = "https://321-idol-special-live.example.com"; // 本番ドメインに後で書き換え

// 日本語の見出し用：上品な明朝体
const shippori = Shippori_Mincho_B1({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-shippori",
  display: "swap",
});

// 欧文の見出し用：エレガントなセリフ
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  display: "swap",
});

// 本文用：読みやすい和洋ゴシック
const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "321 IDOL PROJECT Special LIVE in Kanadevia Hall｜2026.7.13",
  description:
    "2026年7月13日（月）Kanadevia Hall（旧東京ドームシティホール）にて、PALE TULLE / グリッターシステム による321 IDOL PROJECT Special LIVE開催。バルコニー席900枚の販売状況に応じて、達成特典が次々アンロックされます。",
  openGraph: {
    title: "321 IDOL PROJECT Special LIVE in Kanadevia Hall",
    description:
      "2026.7.13 / Kanadevia Hall / PALE TULLE × グリッターシステム。リアルタイム達成特典開放中。",
    type: "website",
    locale: "ja_JP",
    siteName: "321 IDOL PROJECT",
  },
  twitter: {
    card: "summary_large_image",
    title: "321 IDOL PROJECT Special LIVE in Kanadevia Hall",
    description:
      "2026.7.13 / Kanadevia Hall / PALE TULLE × グリッターシステム。リアルタイム達成特典開放中。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08060f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${shippori.variable} ${dmSerif.variable} ${zen.variable}`}>
      <body>
        <HamburgerMenu />
        {children}
      </body>
    </html>
  );
}
