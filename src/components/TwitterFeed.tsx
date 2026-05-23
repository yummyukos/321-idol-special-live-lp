"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

/**
 * X（旧Twitter）の最新ツイート埋め込み。
 * 2025年のXの仕様変更に合わせて最小パラメータで実装。
 * 埋め込み失敗時のフォロー誘導も併設。
 */
export default function TwitterFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embedReady, setEmbedReady] = useState(false);

  const renderWidget = () => {
    const w = window as unknown as {
      twttr?: { widgets?: { load?: (el?: HTMLElement) => Promise<unknown> } };
    };
    if (w.twttr?.widgets?.load && containerRef.current) {
      Promise.resolve(w.twttr.widgets.load(containerRef.current)).then(() => {
        // iframeが実際に挿入されたら ready
        if (containerRef.current?.querySelector("iframe")) {
          setEmbedReady(true);
        }
      });
    }
  };

  useEffect(() => {
    renderWidget();
    // 念のため少し遅延してももう一度チェック
    const timer = setTimeout(() => {
      if (containerRef.current?.querySelector("iframe")) {
        setEmbedReady(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-ink py-14 sm:py-20 px-6 border-t border-white/10 relative overflow-hidden">
      {/* うっすらしたグロー背景 */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[80%] rounded-full bg-glow2/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-2">LATEST</p>
        <h2 className="font-mincho text-2xl sm:text-3xl text-mist mb-8">
          最新情報を発信中
        </h2>

        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
          onLoad={renderWidget}
        />

        {/* X(Twitter)埋め込み：最小パラメータ（dark theme と height だけ） */}
        <div
          ref={containerRef}
          className="rounded-2xl overflow-hidden border border-white/10 bg-velvet/60 min-h-[400px] mb-6"
        >
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-height="500"
            href="https://twitter.com/321idol?ref_src=twsrc%5Etfw"
          >
            Tweets by 321idol
          </a>
        </div>

        {/* フォロー誘導カード（embedが見えなくても表示される確実な動線） */}
        {!embedReady && (
          <a
            href="https://x.com/321idol"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-velvet via-ink to-velvet/80 hover:border-white/30 transition-all hover:scale-[1.01] mb-6"
          >
            <div className="relative p-6 sm:p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center mb-3 shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 sm:w-7 sm:h-7 fill-black"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <p className="font-mincho text-mist text-xl mb-1">@321idol</p>
              <p className="text-mist/60 text-sm mb-4">
                ライブ情報・特典・お知らせを発信中
              </p>
              <span className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 font-mincho text-sm font-semibold">
                Xでフォロー
                <span
                  aria-hidden
                  className="group-hover:translate-x-1 transition-transform"
                >
                  →
                </span>
              </span>
            </div>
          </a>
        )}
      </div>
    </section>
  );
}
