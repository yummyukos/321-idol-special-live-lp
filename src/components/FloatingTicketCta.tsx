"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

/**
 * 右下に常時表示される「チケット販売中」ボタン。
 * スクロールしてヒーローを抜けてから登場し、フッターのCTAセクションに到達すると消える。
 */
export default function FloatingTicketCta() {
  // ページ読み込み時から表示。フッターのCTAセクションに重なる時だけ隠す
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handler = () => {
      // ページ末尾のCTAセクションに到達したら非表示（ボタン重複回避）
      const cta = document.getElementById("ticket");
      let nearBottom = false;
      if (cta) {
        const rect = cta.getBoundingClientRect();
        nearBottom = rect.top < window.innerHeight - 80;
      }
      setShow(!nearBottom);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <a
         href="/tickets"
          aria-label="チケットを購入"
                className={[
        "fixed z-50 right-4 bottom-4 sm:right-6 sm:bottom-6",
        "inline-flex items-center gap-2 sm:gap-3 rounded-full",
        "px-5 py-3 sm:px-7 sm:py-4",
        "bg-gradient-to-r from-glow via-glow2 to-gold text-ink",
        "font-display text-sm sm:text-base font-semibold",
        "shadow-[0_0_40px_-8px_rgba(255,58,161,0.7)]",
        "hover:scale-105 active:scale-95",
        "transition-all duration-300",
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      {/* 左の点滅ドット */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-60"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-ink"></span>
      </span>
      {/* 2行表示でコンパクトに */}
      <span className="text-left leading-tight text-xs sm:text-sm">
        チケット
        <br />
        販売中
      </span>
      <span aria-hidden className="text-base sm:text-lg shrink-0">→</span>
    </a>
  );
}
