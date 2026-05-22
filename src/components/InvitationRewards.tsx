"use client";

import Link from "next/link";
import { INVITATION_TIERS, INVITATION_BONUS } from "@/lib/invitation";

/**
 * 招待特典セクション（ステップアップ型カードUI）
 * 招待人数が増えるほどグレードが上がる演出。SPECIAL → PREMIUM → ULTIMATE。
 * カラー：白／淡ピンク／ラベンダー／ゴールド。
 */

type Decor = {
  icon: string;
  grade?: "SPECIAL" | "PREMIUM" | "ULTIMATE";
};

// INVITATION_TIERS の順番に対応（1, 3, 5, 10, 20, 30, 50人）
const DECOR: Decor[] = [
  { icon: "📸" }, // 1
  { icon: "🖊️" }, // 3
  { icon: "🎀" }, // 5
  { icon: "⭐", grade: "SPECIAL" }, // 10
  { icon: "📷", grade: "SPECIAL" }, // 20
  { icon: "🎬", grade: "PREMIUM" }, // 30
  { icon: "👑", grade: "ULTIMATE" }, // 50
];

const GRADE_STYLES: Record<NonNullable<Decor["grade"]>, string> = {
  SPECIAL:
    "bg-gradient-to-r from-[#e7c9ff] via-[#f5d8ff] to-[#ffd9ec] text-[#7a3aa8]",
  PREMIUM:
    "bg-gradient-to-r from-[#f7d488] via-[#f5d27a] to-[#e9c66f] text-[#7a5410]",
  ULTIMATE:
    "bg-gradient-to-r from-[#d4a445] via-[#f5d27a] to-[#d4a445] text-[#5a3d0c] ring-1 ring-[#d4a445]/60",
};

const InviteCard = ({
  index,
  count,
  title,
  brief,
}: {
  index: number;
  count: number;
  title: string;
  brief: string;
}) => {
  const decor = DECOR[index] ?? { icon: "✨" };
  const stepLabel = `STEP ${String(index + 1).padStart(2, "0")}`;
  return (
    <article className="group relative rounded-3xl bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_-12px_rgba(82,40,90,0.18)] ring-1 ring-[#f3e0ee] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-14px_rgba(168,108,170,0.32)] hover:ring-[#f0c8e0]">
      {/* STEPバッジ */}
      <span className="absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#ffd6e8] via-[#fbdcff] to-[#e3d6ff] px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-[#7a3aa8] shadow-sm ring-1 ring-white/80">
        {stepLabel}
      </span>

      {/* 上位グレードバッジ */}
      {decor.grade && (
        <span
          className={`absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.22em] shadow-sm ring-1 ring-white/80 ${GRADE_STYLES[decor.grade]}`}
        >
          {decor.grade}
        </span>
      )}

      <div className="flex items-center gap-3 mt-2">
        {/* アイコン円 */}
        <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#fff4f9] via-[#fbeaff] to-[#f0e9ff] flex items-center justify-center text-2xl sm:text-[28px] shadow-inner ring-1 ring-white">
          <span aria-hidden>{decor.icon}</span>
        </div>
        {/* 人数 */}
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#a890b8] font-semibold">
            INVITE
          </p>
          <p className="font-mincho text-2xl sm:text-3xl font-bold text-[#2b1d3a] leading-none">
            <span className="bg-gradient-to-r from-[#c95dad] to-[#8c5dc9] bg-clip-text text-transparent">
              {count}
            </span>
            <span className="text-base sm:text-lg text-[#5a4368] ml-1">人</span>
          </p>
        </div>
      </div>

      {/* 特典タイトル */}
      <h3 className="mt-4 font-mincho text-base sm:text-lg font-bold text-[#2b1d3a] leading-snug">
        {title}
      </h3>

      {/* 説明 */}
      {brief && (
        <p className="mt-2 text-[12px] sm:text-[13px] leading-relaxed text-[#6e5b7a]">
          {brief}
        </p>
      )}
    </article>
  );
};

const CtaButton = ({ label }: { label: string }) => (
  <Link
    href="/invitation"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffaecd] via-[#e7a6e6] to-[#b9a6f0] text-white px-8 py-4 font-mincho text-base sm:text-lg font-bold shadow-[0_12px_30px_-10px_rgba(199,123,196,0.55)] hover:shadow-[0_18px_36px_-10px_rgba(199,123,196,0.65)] hover:scale-[1.02] active:scale-100 transition-all"
  >
    {label}
    <span aria-hidden>→</span>
  </Link>
);

export default function InvitationRewards() {
  return (
    <section
      id="guest-reward"
      className="section-pad relative overflow-hidden bg-gradient-to-b from-[#1a0e26] via-[#2a1538] to-[#1a0e26]"
    >
      {/* ふわっと光るブロブ装飾 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #ffc0e0 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, #c9b3ff 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* ヘッダー */}
        <p className="text-center text-[11px] tracking-[0.4em] text-[#e7c9ff] mb-2">
          GUEST REWARD
        </p>
        <h2 className="text-center font-mincho text-3xl sm:text-4xl text-white mb-4">
          招待特典
        </h2>
        <p className="text-center text-white/85 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-mincho">
          友達を誘うほど、特典がどんどん豪華に！
        </p>

        {/* 上部CTA */}
        <div className="mb-10 sm:mb-12 flex justify-center">
          <CtaButton label="詳細・フォームはこちら" />
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {INVITATION_TIERS.map((tier, idx) => (
            <InviteCard
              key={tier.count}
              index={idx}
              count={tier.count}
              title={tier.title}
              brief={tier.brief}
            />
          ))}

          {/* 50人以降のボーナスカード */}
          <article className="group relative rounded-3xl bg-gradient-to-br from-[#fff8e8] via-[#fff3f8] to-[#f4ecff] shadow-[0_8px_30px_-12px_rgba(82,40,90,0.18)] ring-1 ring-[#f0d6c8] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-14px_rgba(213,166,71,0.32)]">
            <span className="absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#d4a445] via-[#f5d27a] to-[#d4a445] px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-[#5a3d0c] shadow-sm ring-1 ring-white/80">
              BONUS
            </span>
            <div className="flex items-center gap-3 mt-2">
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#fff4d9] via-[#fff0ea] to-[#ffe8f3] flex items-center justify-center text-2xl sm:text-[28px] shadow-inner ring-1 ring-white">
                <span aria-hidden>✨</span>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#a78a4a] font-semibold">
                  CONTINUE
                </p>
                <p className="font-mincho text-2xl sm:text-3xl font-bold text-[#2b1d3a] leading-none">
                  <span className="bg-gradient-to-r from-[#c89c4a] to-[#7a5410] bg-clip-text text-transparent">
                    {INVITATION_BONUS.countLabel}
                  </span>
                  <span className="text-base sm:text-lg text-[#5a4368] ml-1">
                    {INVITATION_BONUS.suffixLabel}
                  </span>
                </p>
              </div>
            </div>
            <h3 className="mt-4 font-mincho text-base sm:text-lg font-bold text-[#2b1d3a] leading-snug">
              {INVITATION_BONUS.title}
            </h3>
          </article>
        </div>

        {/* 下部CTA */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <CtaButton label="詳細・フォームはこちら" />
        </div>
      </div>
    </section>
  );
}
