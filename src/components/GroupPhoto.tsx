"use client";

/**
 * メッセージ下に配置するグループ写真セクション。
 * 写真のみ、テキスト装飾なし。
 * 画像差し替えは public/messesita.png を上書きすればOKです。
 */
export default function GroupPhoto() {
  return (
    <section className="relative overflow-hidden bg-ink -mt-12 sm:-mt-20 pb-4 sm:pb-6">
      {/* 背景のうっすらしたネオングロー */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 h-[60%] w-[40%] rounded-full bg-glow/20 blur-[120px]" />
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 h-[60%] w-[40%] rounded-full bg-glow2/20 blur-[120px]" />
      </div>

      {/* 集合写真 */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <img
          src="/messesita.png"
          alt=""
          className="mx-auto w-full h-auto drop-shadow-[0_20px_60px_rgba(124,92,255,0.3)]"
        />
      </div>
    </section>
  );
}
