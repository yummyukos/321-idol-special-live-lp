"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { TICKETS } from "@/lib/event";
import {
  subscribeSales,
  getBalconySold,
  getDisplayPct,
  type SalesSnapshot,
} from "@/lib/sales";

// 紙吹雪の色バリエ（ピンク・ゴールド・シアン・ラベンダー・ホワイト・ミント）
const CONFETTI_COLORS = [
  "#FF5C9C", // pink
  "#FFB4D1", // light pink
  "#F5D27A", // gold
  "#FFE59A", // light gold
  "#7CD9E8", // cyan
  "#C084FC", // purple
  "#B6F1D2", // mint
  "#FFFFFF", // white
];

function ConfettiFall({ fire }: { fire: boolean }) {
  // 上から下にずっと降り続ける紙吹雪
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        left: Math.random() * 100, // 横位置 %
        delay: Math.random() * 6, // 開始タイミングをばらす
        duration: 5 + Math.random() * 5, // 落下時間 5-10 秒
        width: 6 + Math.random() * 6, // 6-12 px
        height: 10 + Math.random() * 8, // 10-18 px
        rotate: (Math.random() - 0.5) * 1080,
        sway: (Math.random() - 0.5) * 60, // 揺れ幅
        radius: Math.random() > 0.7 ? "50%" : "1px", // 一部は円形
      })),
    []
  );

  if (!fire) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: 0,
            width: `${p.width}px`,
            height: `${p.height}px`,
            background: p.color,
            borderRadius: p.radius,
            willChange: "transform",
          }}
          initial={{ y: "-5%", x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: ["-5%", "105%"],
            x: [0, p.sway, -p.sway, 0],
            opacity: [0, 1, 1, 0.9, 0],
            rotate: [0, p.rotate],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 0,
            y: { ease: "linear" },
            x: { ease: "easeInOut" },
            opacity: { times: [0, 0.06, 0.5, 0.94, 1] },
          }}
        />
      ))}
    </div>
  );
}

export default function AchievementProgress() {
  const [snap, setSnap] = useState<SalesSnapshot | null>(null);
  const [fireCelebration, setFireCelebration] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    const unsub = subscribeSales(setSnap);
    return () => unsub();
  }, []);

  const totalSold = snap?.totalSold ?? 0;
  const invitedCount = snap?.invitedCount ?? 0;
  const balconySold = useMemo(() => getBalconySold(totalSold), [totalSold]);
  const balconyPct = useMemo(
    () => getDisplayPct(totalSold, invitedCount),
    [totalSold, invitedCount]
  );
  const isFullyAchieved = balconyPct >= 100;
  // アリーナがまだ完売してない時はバルコニー発売前
  const isBalconyOpen = totalSold > TICKETS.arenaCapacity;

  // 100%達成 & セクションが画面に入ったら お祝いモーションを1度だけ発火
  useEffect(() => {
    if (!isFullyAchieved || hasFiredRef.current) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFiredRef.current) {
            hasFiredRef.current = true;
            setFireCelebration(true);
            // 少し後にフラグを戻して次回また発火できるように...はせず一度きり
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isFullyAchieved]);

  return (
    <section
      id="achievement"
      ref={sectionRef}
      className="section-pad bg-aurora relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* 100%達成時：紙吹雪が上から降る（コンテンツの背後で無限ループ） */}
      <ConfettiFall fire={fireCelebration} />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
          TICKET REWARDS
        </p>
        <h2 className="text-center font-mincho text-3xl sm:text-4xl text-mist mb-3">
          チケット達成特典
        </h2>

        <p className="text-center text-mist/85 text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          <span className="text-gold">バルコニー席完売</span>を100%として
          <br />
          販売枚数に応じて特典が次々と解禁！
        </p>

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

          {/* メーター下の数字ラベル */}
          <div className="relative h-7 mt-2">
            {ACHIEVEMENTS.map((a) => {
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
          ※ 達成率は最新の販売状況に連動しています（30秒ごとに更新）。
        </p>
      </div>
    </section>
  );
}
