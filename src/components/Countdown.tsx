"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

function daysUntil(target: Date) {
  const now = new Date();
  const ms = Math.max(0, target.getTime() - now.getTime());
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return { days, isOver: ms === 0 };
}

export default function Countdown() {
  const target = new Date(EVENT.startAt);
  const [t, setT] = useState(() => daysUntil(target));

  useEffect(() => {
    // 1分ごとに再計算（日数表示なので毎秒は不要）
    const id = setInterval(() => setT(daysUntil(target)), 60_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section-pad bg-ink">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-2">COUNTDOWN</p>
        <h2 className="font-mincho text-2xl sm:text-3xl text-mist mb-10">
          {t.isOver ? "本番、開幕。" : "本番まで"}
        </h2>

        {!t.isOver && (
          <p className="font-mincho text-mist tabular">
            <span className="text-mist/80 text-2xl sm:text-3xl mr-3">あと</span>
            <span className="text-shimmer text-7xl sm:text-9xl font-bold align-middle">
              {t.days}
            </span>
            <span className="text-mist/80 text-2xl sm:text-3xl ml-3">日</span>
          </p>
        )}
      </div>
    </section>
  );
}
