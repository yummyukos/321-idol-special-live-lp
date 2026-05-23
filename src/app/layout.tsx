import type { Metadata, Viewport } from "next";
import "./globals.css";
import HamburgerMenu from "@/components/HamburgerMenu";
import MusicPlayer from "@/components/MusicPlayer";

const SITE_URL = "https://321-idol-special-live-lp.vercel.app";

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
    <html lang="ja">
      <head>
        {/* Google Fonts：日本語含む全文字を読み込み（プレビューHTMLと同じ仕様） */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Shippori+Mincho+B1:wght@400;500;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <HamburgerMenu />
        <MusicPlayer />
        {children}
      </body>
    </html>
  );
}
