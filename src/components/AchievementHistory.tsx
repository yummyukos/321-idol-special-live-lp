"use client";

import {
  ACHIEVEMENTS,
  DEMO_ACHIEVEMENT_HISTORY,
} from "@/lib/achievements";

/**
 * 達成履歴：達成済みの特典を「いつ」達成したかタイムラインで表示
 * 本番では Firestore から取得する想定（src/lib/achievements.ts の DEMO_ACHIEVEMENT_HISTORY を置き換え）
 */
export default function AchievementHistory() {
  const entries = DEMO_ACHIEVEMENT_HISTORY.map((h) => ({
    ...h,
    achievement: ACHIEVEMENTS.find((a) => a.id === h.achievementId),
  })).filter((e) => e.achievement);

  return (
    <section className="section-pad bg-ink">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
          HISTORY
        </p>
        <h2 className="text-center font-display text-3xl sm:text-4xl text-mist mb-3">
          達成履歴
        </h2>
        <p className="text-center text-mist/60 text-sm mb-10">
          これまでアンロックされた特典の記録です。
        </p>

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
            <p className="text-mist/70 text-sm">
              まだ達成された特典はありません。
            </p>
            <p className="text-mist/50 text-xs mt-2">
              バルコニー席が売れていくと、ここに達成のタイムスタンプが順番に並びます。
            </p>
          </div>
        ) : (
          <ol className="space-y-3">
            {entries.map((e) => (
              <li
                key={e.achievement!.id}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-velvet/40 p-4"
              >
                <span className="text-2xl">{e.achievement!.icon}</span>
                <div className="flex-1">
                  <p className="text-mist text-sm sm:text-base">
                    {e.achievement!.title}
                  </p>
                  <p className="text-xs text-mist/50 tabular">
                    {new Date(e.achievedAt).toLocaleString("ja-JP")}
                  </p>
                </div>
                <span className="text-[10px] tracking-widest px-2 py-1 rounded-full bg-gold/20 text-gold border border-gold/40">
                  {e.achievement!.threshold}%
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
