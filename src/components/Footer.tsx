"use client";

import { useState } from "react";

/**
 * フッター。
 * 2つのロゴを表示：
 *   1. public/logo-idol.png  → 321 IDOL PROJECT のブランドロゴ
 *   2. public/logo-321inc.png → 運営の LIVER MANAGEMENT 321 inc. ロゴ
 * 画像が無い時はテキスト表記にフォールバックします。
 */
export default function Footer() {
  const [idolFailed, setIdolFailed] = useState(false);
  const [incFailed, setIncFailed] = useState(false);

  return (
    <footer className="bg-ink border-t border-white/10 py-12 px-6">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-8">
        {/* 321 IDOL PROJECT ロゴ */}
        <div className="flex flex-col items-center">
          {!idolFailed ? (
            <img
              src="/logo-idol.png"
              alt="321 IDOL PROJECT"
              className="h-10 sm:h-12 w-auto opacity-85"
              onError={() => setIdolFailed(true)}
            />
          ) : (
            <p className="font-display text-mist text-lg tracking-widest">
              321 IDOL PROJECT
            </p>
          )}
        </div>

        {/* 区切り線 */}
        <div className="w-10 h-px bg-white/15" />

        {/* LIVER MANAGEMENT 321 inc. ロゴ */}
        <div className="flex flex-col items-center">
          {!incFailed ? (
            <img
              src="/logo-321inc.png"
              alt="LIVER MANAGEMENT 321 inc."
              className="h-10 sm:h-12 w-auto opacity-75"
              onError={() => setIncFailed(true)}
            />
          ) : (
            <div className="text-center text-mist">
              <p className="text-[10px] tracking-[0.25em] opacity-70">
                LIVER MANAGEMENT
              </p>
              <p className="text-lg font-display font-bold tracking-widest">
                321 inc.
              </p>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-mist/40 leading-relaxed mt-2">
          <p>主催：321株式会社（321 inc.）</p>
          <p className="mt-1">© {new Date().getFullYear()} 321 IDOL PROJECT</p>
        </div>
      </div>
    </footer>
  );
}
