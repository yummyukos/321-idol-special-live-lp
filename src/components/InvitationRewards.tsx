"use client";

import Link from "next/link";
import { INVITATION_TIERS, INVITATION_BONUS } from "@/lib/invitation";

/**
 * 招待特典セクション（LP用）
 * 2列のゴールドカードレイアウト。50人カードは内容が長いので自然に高さが伸びる。
 */
export default function InvitationRewards() {
  return (
    <section
      id="guest-reward"
      className="section-pad bg-ink relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
          GUEST REWARD
        </p>
        <h2 className="text-center font-mincho text-3xl sm:text-4xl text-mist mb-3">
          招待特典
        </h2>
        <p className="text-center text-mist/90 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-mincho">
          招待した人数に応じて、招待特典をプレゼント！
        </p>

        {/* 2列ゴールドカード（PC：横並び・スマホ：縦並び） */}
        <div className="invitation-grid">
          {INVITATION_TIERS.map((t) => (
            <article key={t.count} className="invitation-card">
              <div className="invitation-card-number">
                <span className="num">{t.count}</span>
                <span className="unit">人</span>
              </div>
              <div className="invitation-card-content">
                <h3 className="invitation-card-title">
                  {t.badge && (
                    <span className="invitation-badge">{t.badge}</span>
                  )}
                  {t.title}
                </h3>
              </div>
            </article>
          ))}

          {/* 50人以降のボーナスカード */}
          <article className="invitation-card invitation-card--bonus">
            <div className="invitation-card-number stacked">
              <span className="num">{INVITATION_BONUS.countLabel}</span>
              <span className="suffix">{INVITATION_BONUS.suffixLabel}</span>
            </div>
            <div className="invitation-card-content">
              <h3 className="invitation-card-title">{INVITATION_BONUS.title}</h3>
            </div>
          </article>
        </div>

        {/* CTA（1つに統合） */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/invitation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-glow via-glow2 to-gold text-ink px-8 py-4 font-mincho text-base sm:text-lg font-semibold hover:scale-[1.02] transition-transform shadow-[0_0_40px_-8px_rgba(255,58,161,0.6)]"
          >
            詳細・フォームはこちら
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
