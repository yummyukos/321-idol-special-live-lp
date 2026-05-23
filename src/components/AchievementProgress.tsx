"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { TICKETS } from "@/lib/event";
import {
  subscribeSales,
  getBalconySold,
  getBalconyPct,
  type SalesSnapshot,
} from "@/lib/sales";

export default function AchievementProgress() {
  const [snap, setSnap] = useState<SalesSnapshot | null>(null);

  useEffect(() => {
    const unsub = subscribeSales(setSnap);
    return () => unsub();
  }, []);

  const totalSold = snap?.totalSold ?? 0;
  const balconySold = useMemo(() => getBalconySold(totalSold), [totalSold]);
  const balconyPct = useMemo(() => getBalconyPct(totalSold), [totalSold]);
  // アリーナがまだ完売してない時はバルコニー発売前
  const isBalconyOpen = totalSold > TICKETS.arenaCapacity;

  return (
    <section
      id="achievement"
      className="section-pad bg-aurora relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
          TICKET REWARDS
        </p>
        <h2 className="text-center font-mincho text-3xl sm:text-4xl text-mist mb-3">
          チケット達成特典
        </h2>
        <p className="text-center text-mist/85 text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-mincho">
          <span className="text-gold">バルコニー席完売</span>を100%として
          <br />
          販売枚数に応じて特典が次々と解禁！
        </p>

        {/* バルコニー販売前のステータス */}
        {!isBalconyOpen && (
          <p className="text-center text-mist/70 text-sm sm:text-base font-mincho mb-6">
            ⏳ 現在
            <span className="text-gold mx-1">アリーナ席 {TICKETS.arenaCapacity}枚</span>
            販売中。完売後、バルコニー席の発売開始 → 達成特典がスタートします。
          </p>
        )}

        {/* 達成率：数字と%をベースライン揃え、全体としてやや左寄りに */}
        <div className="text-center">
          <p className="font-mincho text-xs sm:text-sm tracking-[0.4em] text-mist/60 mb-3">
            達成率
          </p>
          <p className="font-mincho tabular inline-flex items-baseline gap-1 sm:gap-2">
            <span className="text-shimmer text-7xl sm:text-9xl font-bold leading-none">
              {balconyPct.toFixed(1)}
            </span>
            <span className="text-mist/60 text-3xl sm:text-5xl leading-none">
              %
            </span>
          </p>
        </div>

        {/* メーター */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative h-3 sm:h-4 rounded-full bg-white/5 overflow-hidden border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-glow via-glow2 to-gold"
              initial={{ width: 0 }}
              animate={{ width: `${balconyPct}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.id}
                className="absolute top-0 bottom-0 w-px bg-white/30"
                style={{ left: `${a.threshold}%` }}
              />
            ))}
          </div>

          {/* メーター下の数字ラベル（95%は100%と重なるため非表示。マイルストーンリストには表示） */}
          <div className="relative h-7 mt-2">
            {ACHIEVEMENTS.filter((a) => a.threshold !== 95).map((a) => {
              const unlocked = balconyPct >= a.threshold;
              const isLast = a.threshold === 100;
              return (
                <span
                  key={a.id}
                  className={`absolute top-0 tabular text-[10px] sm:text-xs font-mincho transition-colors ${
                    unlocked ? "text-gold" : "text-mist/50"
                  }`}
                  style={{
                    left: `${a.threshold}%`,
                    transform: isLast
                      ? "translateX(-100%)"
                      : "translateX(-50%)",
                  }}
                >
                  {a.threshold}%
                </span>
              );
            })}
          </div>

          <p className="mt-4 text-right text-[11px] text-mist/40">
            最終更新:{" "}
            {snap
              ? new Date(snap.updatedAt).toLocaleString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "取得中..."}
            <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </p>
        </div>

        {/* 8つの達成特典マイルストーン（エディトリアル風・行スタイル） */}
        <ol className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = balconyPct >= a.threshold;
            // 絵文字は100%（鍵）のみ表示、それ以外は非表示
            const showIcon = a.mystery;
            return (
              <li
                key={a.id}
                className="relative grid grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 items-center py-6 sm:py-8"
              >
                {/* 左：大きな数字 */}
                <div className="flex flex-col items-start">
                  <span
                    className={`font-mincho tabular leading-none text-4xl sm:text-6xl ${
                      unlocked ? "text-gold" : "text-mist/70"
                    }`}
                  >
                    {a.threshold}
                    <span className="text-base sm:text-2xl ml-0.5">%</span>
                  </span>
                </div>

                {/* 中央：タイトル＋説明（絵文字は100%のみ） */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {showIcon && (
                      <span
                        className={`text-xl sm:text-2xl ${
                          unlocked ? "" : "grayscale opacity-70"
                        }`}
                      >
                        {a.icon}
                      </span>
                    )}
                    <h3
                      className={`font-mincho text-base sm:text-xl leading-tight ${
                        unlocked ? "text-mist" : "text-mist/85"
                      }`}
                    >
                      {a.title}
                    </h3>
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      unlocked ? "text-mist/80" : "text-mist/55"
                    }`}
                  >
                    {a.description}
                  </p>
                </div>

                {/* 右：日本語ステータス */}
                <div className="shrink-0">
                  {unlocked ? (
                    <span className="inline-block text-[10px] sm:text-xs tracking-widest px-2.5 py-1 rounded-sm bg-gold/15 text-gold border border-gold/40 font-mincho">
                      達成
                    </span>
                  ) : (
                    <span className="inline-block text-[10px] sm:text-xs tracking-widest px-2.5 py-1 rounded-sm bg-white/[0.03] text-mist/40 border border-white/10 font-mincho">
                      未達成
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-center text-xs text-mist/50">
          ※ 表示中の販売枚数はデモデータです。本番運用時はリアルタイムの数値に切り替わります。
        </p>
      </div>
    </section>
  );
}
