"use client";

import { EVENT } from "@/lib/event";

export default function TicketCta() {
  return (
    <section id="ticket" className="section-pad bg-ink relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-aurora opacity-50" />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-2">TICKET</p>
        <h2 className="font-mincho text-3xl sm:text-5xl text-mist mb-4">
          チケット販売中
        </h2>
        <p className="font-mincho text-mist text-base sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          あなたの1枚が、ライブを変える。
        </p>

        {/* CTAボタン：背景に動くグラデ＋脈動グロー＋ホバーで微浮上＋矢印アニメ */}
        <a
          href={EVENT.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ticket-cta-button group inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 sm:px-14 sm:py-6 text-ink font-display text-lg sm:text-2xl"
        >
          <span className="relative z-10">TiGETでチケットを購入</span>
          <span
            aria-hidden
            className="relative z-10 inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
