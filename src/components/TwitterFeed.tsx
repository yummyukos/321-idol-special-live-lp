"use client";

import { useEffect, useRef, useState } from "react";

/**
 * X（旧Twitter）の最新ツイートを埋め込み表示。
 * widgets.js を手動で挿入＋ polling で確実にロード、リトライ付き。
 */
export default function TwitterFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // 500ms × 20 = 最大10秒待つ
    const SCRIPT_ID = "twitter-widgets-js";

    const tryRender = () => {
      if (cancelled) return;
      const w = window as unknown as {
        twttr?: { widgets?: { load?: (el?: HTMLElement) => Promise<unknown> } };
      };
      if (w.twttr?.widgets?.load && containerRef.current) {
        Promise.resolve(w.twttr.widgets.load(containerRef.current))
          .then(() => !cancelled && setStatus("ready"))
          .catch(() => !cancelled && setStatus("error"));
        return;
      }
      attempts += 1;
      if (attempts >= MAX_ATTEMPTS) {
        setStatus("error");
        return;
      }
      window.setTimeout(tryRender, 500);
    };

    // widgets.js を確実に挿入（既にあれば再利用）
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!existing) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.onload = tryRender;
      script.onerror = () => setStatus("error");
      document.head.appendChild(script);
    } else {
      // 既に script タグはある → twttr が初期化されるのを待つ
      tryRender();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-ink py-14 sm:py-20 px-6 border-t border-white/10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-2">LATEST</p>
        <h2 className="font-mincho text-2xl sm:text-3xl text-mist mb-8">
          最新情報を発信中
        </h2>

        {/* X (Twitter) 公式埋め込み */}
        <div
          ref={containerRef}
          className="rounded-2xl overflow-hidden border border-white/10 bg-velvet/60 min-h-[500px] relative"
        >
          {/* widgets.js が読み込まれるまでのプレースホルダー */}
          {status === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center text-mist/60 text-sm font-mincho pointer-events-none">
              読み込み中…
            </div>
          )}
          {status === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-mist/80 text-sm font-mincho">
              <p>タイムラインの読み込みに失敗しました。</p>
              <a
                href="https://x.com/321idol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline underline-offset-4"
              >
                @321idol を直接見る →
              </a>
            </div>
          )}

          <a
            className="twitter-timeline"
            data-theme="dark"
            data-chrome="noheader nofooter transparent noborders"
            data-height="500"
            data-tweet-limit="5"
            data-dnt="true"
            data-lang="ja"
            href="https://twitter.com/321idol"
          >
            Tweets by @321idol
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
