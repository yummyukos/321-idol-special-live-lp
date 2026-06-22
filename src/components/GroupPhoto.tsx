"use client";

/**
 * メッセージ下に配置するグループ写真セクション。
 * 上下にスムーズな黒グラデを敷いて、前後のセクションと自然に繋がるように。
 */
export default function GroupPhoto() {
  return (
    <section className="relative overflow-hidden bg-ink -mt-12 sm:-mt-20 pb-4 sm:pb-6">
      {/* 背景のネオングロー（ピンク/パープルのソフトグラデ） */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 h-[80%] w-[55%] rounded-full bg-glow/15 blur-[160px]" />
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 h-[80%] w-[55%] rounded-full bg-glow2/15 blur-[160px]" />
      </div>

      {/* 上端のスムーズな黒フェード：前のセクションと自然に繋ぐ */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 -z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgb(8,6,15) 0%, rgba(8,6,15,0.8) 30%, rgba(8,6,15,0) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <img
          src="/messesita.png"
          alt=""
          className="mx-auto w-full h-auto drop-shadow-[0_20px_60px_rgba(124,92,255,0.3)]"
        />
      </div>

      {/* 下端のスムーズな黒フェード */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 -z-0"
        style={{
          background:
            "linear-gradient(to top, rgb(8,6,15) 0%, rgba(8,6,15,0.8) 30%, rgba(8,6,15,0) 100%)",
        }}
      />
    </section>
  );
}
