"use client";

/**
 * X（旧Twitter）の「最新情報を発信中」セクション。
 * embed widget は環境依存で不安定なため、確実に表示される大きなフォローバナーに切替。
 */
export default function TwitterFeed() {
  return (
    <section className="bg-ink py-14 sm:py-20 px-6 border-t border-white/10 relative overflow-hidden">
      {/* うっすらしたグロー背景 */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[80%] rounded-full bg-glow2/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-2">LATEST</p>
        <h2 className="font-mincho text-2xl sm:text-3xl text-mist mb-10">
          最新情報を発信中
        </h2>

        {/* フォローバナー */}
        <a
          href="https://x.com/321idol"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-velvet via-ink to-velvet/80 hover:border-white/30 transition-all hover:scale-[1.01]"
        >
          {/* 内部装飾：右上にうっすらX巨大ロゴ */}
          <svg
            viewBox="0 0 24 24"
            className="absolute -right-6 -top-6 w-40 h-40 sm:w-56 sm:h-56 fill-white/[0.04] pointer-events-none"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>

          <div className="relative p-8 sm:p-12 flex flex-col items-center text-center">
            {/* Xロゴ */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-lg">
              <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 sm:w-11 sm:h-11 fill-black"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>

            {/* アカウント名 */}
            <p className="font-mincho text-mist text-2xl sm:text-3xl mb-2">
              @321idol
            </p>
            <p className="text-mist/60 text-sm sm:text-base mb-8 leading-relaxed">
              ライブ情報・特典・お知らせを
              <br />
              リアルタイムで発信中
            </p>

            {/* フォローボタン */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-3.5 font-mincho text-base sm:text-lg font-semibold shadow-lg group-hover:bg-mist transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Xでフォロー
              <span
                aria-hidden
                className="inline-block group-hover:translate-x-1 transition-transform"
              >
                →
              </span>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
