"use client";

import { useEffect } from "react";

/**
 * X（旧Twitter）の最新ツイートを埋め込み表示。
 * widgets.js を1回だけ読み込んで、Twitter の標準timeline widgetを使う。
 */
export default function TwitterFeed() {
  useEffect(() => {
    // すでにロード済みなら再描画
    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
      return;
    }
    // 初回はscriptをappend
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  }, []);

  return (
    <section className="bg-ink py-14 sm:py-20 px-6 border-t border-white/10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-2">LATEST</p>
        <h2 className="font-mincho text-2xl sm:text-3xl text-mist mb-8">
          最新情報を発信中
        </h2>

        {/* X (Twitter) 公式埋め込み */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-velvet/60">
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-chrome="noheader nofooter transparent"
            data-height="600"
            data-dnt="true"
            href="https://twitter.com/321idol"
          >
            Tweets by 321idol
          </a>
        </div>

        {/* フォロー誘導 */}
        <a
          href="https://x.com/321idol"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-mist font-mincho text-sm hover:bg-white/10 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          @321idol をフォロー
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
