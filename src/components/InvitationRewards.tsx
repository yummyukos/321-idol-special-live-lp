"use client";

import Link from "next/link";
import { INVITATION_TIERS, INVITATION_BONUS } from "@/lib/invitation";

// 1人 → 50人 まで段階的にゴールドが豪華になるグラデーション
const TIER_GRADIENTS = [
  // 1人 - 控えめなブロンズ
  "linear-gradient(135deg, #8a6f3d 0%, #c9a76b 50%, #7a5f2d 100%)",
  // 3人 - 少しゴールドに
  "linear-gradient(135deg, #8e6b35 0%, #d2ad6e 50%, #7d5a26 100%)",
  // 5人 - ゴールド
  "linear-gradient(135deg, #95682c 0%, #dbb371 50%, #7e5520 100%)",
  // 10人 - 明るいゴールド
  "linear-gradient(135deg, #9c6420 0%, #e5bb74 50%, #7f5018 100%)",
  // 20人 - リッチゴールド
  "linear-gradient(135deg, #a35f14 0%, #efc377 50%, #804b10 100%)",
  // 30人 - ディープゴールド
  "linear-gradient(135deg, #aa5908 0%, #f5cb7a 50%, #82460a 100%)",
  // 50人 - 最高ランクの輝くゴールド（ホワイトハイライト入り）
  "linear-gradient(135deg, #b85100 0%, #ffd64d 25%, #fff4c4 50%, #ffd64d 75%, #b85100 100%)",
];

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
        <p className="text-center text-mist/90 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          招待した人数に応じて、招待特典をプレゼント！
        </p>

        {/* 2列ゴールドカード（PC：横並び・スマホ：縦並び） */}
        <div className="invitation-grid">
          {INVITATION_TIERS.map((t, index) => {
            const isPremium = t.tier === "premium";
            return (
              <article
                key={t.count}
                className={`invitation-card ${isPremium ? "invitation-card--premium" : ""}`}
              >
                {/* 撮り下ろしバッジ：カード左上 */}
                {t.badge && (
                  <span className="invitation-badge-corner">{t.badge}</span>
                )}

                {/* PREMIUMバッジ：カードの上に乗せる（クリップされない） */}
                {isPremium && (
                  <span className="invitation-premium-badge">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm0 2h14v2H5v-2z" />
                    </svg>
                    PREMIUM
                  </span>
                )}

                {/* 番号エリア：tier に応じたグラデーション背景 */}
                <div
                  className="invitation-card-number"
                  style={{ background: TIER_GRADIENTS[index] }}
                >
                  <span className="num-wrap">
                    <span className="num">{t.count}</span>
                    <span className="unit">人</span>
                  </span>
                </div>

                {/* タイトル */}
                <div className="invitation-card-content">
                  <h3 className="invitation-card-title">{t.title}</h3>
                </div>
              </article>
            );
          })}
        </div>

        {/* 50人以降は普通のテキストで（カードにしない） */}
        <p className="mt-6 text-center text-mist/90 text-sm sm:text-base">
          ＋ {INVITATION_BONUS.countLabel}{INVITATION_BONUS.suffixLabel}は、
          {INVITATION_BONUS.title}
        </p>

        {/* CTA */}
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
