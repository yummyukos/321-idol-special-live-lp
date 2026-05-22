"use client";

import { useState } from "react";

/**
 * トップヒーロー：動画背景＋メインロゴ（金色 Special LIVE 2026）
 * 画像をデフォルト表示・読み込み失敗時のみテキストフォールバック
 */
export default function Hero() {
  const [logoFailed, setLogoFailed] = useState(false);

  const scrollToAchievement = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("achievement");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative isolate overflow-hidden bg-aurora min-h-[100svh] flex flex-col justify-center">
      {/* 背景動画 */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        poster=""
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* オーバーレイ */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-ink/40 to-ink" />

      {/* グレイン */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 pt-40 sm:pt-48 pb-16 text-center">
        {/* メインロゴ画像（Special LIVE 2026 in Kanadevia Hall） */}
        {!logoFailed ? (
          <img
            src="/logo-special-live.png"
            alt="321 IDOL PROJECT Special LIVE 2026 in Kanadevia Hall"
            className="mx-auto w-auto h-auto max-w-[88vw] sm:max-w-[640px] md:max-w-[760px] drop-shadow-[0_0_40px_rgba(245,210,122,0.25)]"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <h1 className="font-mincho font-bold leading-[0.95] text-white text-[clamp(2.5rem,9vw,6.5rem)]">
            321 <span className="text-shimmer">IDOL</span>
            <br />
            PROJECT
            <br />
            <span className="text-[clamp(1.4rem,5vw,3.5rem)] tracking-widest text-mist/90">
              Special LIVE
            </span>
          </h1>
        )}

        {/* 日付（2行で表示） */}
        <div className="mt-10 font-mincho text-mist tabular space-y-1">
          <p className="text-lg sm:text-2xl">2026年7月13日（月）</p>
          <p className="text-base sm:text-xl tracking-wider text-mist/85">
            OPEN 17:30 / START 19:00
          </p>
        </div>

        {/* 達成特典へのCTAボタン */}
        <button
          type="button"
          onClick={scrollToAchievement}
          className="group mt-10 inline-flex items-center gap-3 rounded-3xl border border-gold/40 bg-gradient-to-r from-glow/20 via-glow2/20 to-gold/20 backdrop-blur-sm px-6 py-4 sm:px-8 sm:py-5 text-mist font-mincho hover:border-gold hover:bg-gradient-to-r hover:from-glow/30 hover:via-glow2/30 hover:to-gold/30 transition-all"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-60"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-glow"></span>
          </span>
          <span className="text-left leading-tight text-sm sm:text-base">
            チケット達成特典を
            <br />
            リアルタイムで見る
          </span>
          <span aria-hidden className="group-hover:translate-y-0.5 transition-transform shrink-0">↓</span>
        </button>

        {/* 321 IDOL PROJECT ロゴ */}
        <img
          src="/logo-idol.png"
          alt="321 IDOL PROJECT"
          className="mx-auto mt-10 h-10 sm:h-14 w-auto opacity-85"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* スクロール促し */}
        <div className="mt-10 flex justify-center">
          <span className="inline-flex flex-col items-center gap-2 text-mist/40 text-[10px] tracking-[0.4em] animate-float">
            SCROLL
            <span className="w-px h-10 bg-gradient-to-b from-mist/40 to-transparent" />
          </span>
        </div>
      </div>
    </section>
  );
}
