import Link from "next/link";
import type { Metadata } from "next";
import {
  INVITATION_TIERS,
  INVITATION_BONUS_NOTE,
  INVITATION_STEPS,
  INVITATION_NOTES,
} from "@/lib/invitation";
import { EVENT } from "@/lib/event";

export const metadata: Metadata = {
  title: "招待特典について｜321 IDOL PROJECT Special LIVE",
  description:
    "Special LIVE 招待特典の一覧・受け取り方・注意事項。代表者の方は前日までに招待フォームのご記入をお願いします。",
};

export default function InvitationPage() {
  return (
    <main className="min-h-screen bg-ink text-mist">
      {/* ヘッダー（戻る） */}
      <header className="bg-aurora border-b border-white/10">
        <div className="mx-auto max-w-3xl px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-mist/70 hover:text-mist transition-colors"
          >
            <span aria-hidden>←</span> トップへ戻る
          </Link>
          <img
            src="/logo-idol.png"
            alt="321 IDOL PROJECT"
            className="h-6 w-auto opacity-80"
          />
        </div>
      </header>

      {/* タイトル */}
      <section className="bg-aurora py-12 sm:py-16 px-6 text-center border-b border-white/10">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-3">GUEST REWARD</p>
        <h1 className="font-mincho text-3xl sm:text-5xl text-mist mb-3">
          招待特典について
        </h1>
        <p className="font-mincho text-mist/85 text-sm sm:text-base">
          7/13 Special LIVE in Kanadevia Hall
        </p>
      </section>

      {/* 特典一覧 */}
      <section className="py-12 sm:py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
            REWARDS
          </p>
          <h2 className="text-center font-mincho text-2xl sm:text-3xl text-mist mb-10">
            招待特典一覧
          </h2>

          <ol className="divide-y divide-white/10 border-y border-white/10">
            {INVITATION_TIERS.map((t) => (
              <li
                key={t.count}
                className="grid grid-cols-[auto_1fr] gap-4 sm:gap-8 items-start py-7 sm:py-9"
              >
                {/* 左：人数 */}
                <div className="flex flex-col items-start min-w-[80px] sm:min-w-[120px]">
                  <span className="font-mincho tabular leading-none text-4xl sm:text-6xl text-gold">
                    {t.count}
                    <span className="text-base sm:text-2xl ml-0.5">人</span>
                  </span>
                  <span className="mt-2 text-[10px] tracking-[0.2em] text-mist/50">
                    達成
                  </span>
                </div>

                {/* 右：内容 */}
                <div className="min-w-0">
                  <h3 className="font-mincho text-lg sm:text-2xl text-mist mb-2 leading-tight">
                    {t.title}
                  </h3>
                  <p className="text-sm sm:text-base text-mist/80 leading-relaxed mb-2">
                    {t.brief}
                  </p>
                  {t.detail && (
                    <p className="text-xs sm:text-sm text-mist/60 leading-relaxed">
                      {t.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-center text-sm text-mist/75 font-mincho">
            ＋ {INVITATION_BONUS_NOTE}
          </p>
        </div>
      </section>

      {/* 受け取り方 */}
      <section className="py-12 sm:py-16 px-6 bg-velvet/40">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
            HOW TO
          </p>
          <h2 className="text-center font-mincho text-2xl sm:text-3xl text-mist mb-10">
            招待特典の受け取り方
          </h2>

          <ol className="space-y-6">
            {INVITATION_STEPS.map((step, i) => (
              <li
                key={i}
                className="rounded-2xl border border-white/10 bg-velvet/60 p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mincho tabular text-3xl sm:text-4xl text-gold leading-none shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.3em] text-mist/50 mb-1">
                      {step.label}
                    </p>
                    <h3 className="font-mincho text-lg sm:text-xl text-mist mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-mist/80">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA：招待フォーム（注意事項の前） */}
      <section className="py-16 sm:py-20 px-6 bg-aurora text-center border-t border-white/10">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-3">APPLY</p>
        <h2 className="font-mincho text-2xl sm:text-3xl text-mist mb-4">
          代表者の方は、こちらから
        </h2>
        <p className="text-sm text-mist/75 max-w-md mx-auto mb-8">
          前日までに招待フォームのご記入をお願いします。
        </p>
        <a
          href={EVENT.invitationFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-glow via-glow2 to-gold text-ink px-8 py-4 sm:px-10 sm:py-5 font-mincho text-base sm:text-lg font-semibold hover:scale-[1.02] transition-transform shadow-[0_0_60px_-10px_rgba(255,58,161,0.6)]"
        >
          招待フォームへ
          <span aria-hidden>→</span>
        </a>
      </section>

      {/* 注意事項 */}
      <section className="py-12 sm:py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
            NOTES
          </p>
          <h2 className="text-center font-mincho text-2xl sm:text-3xl text-mist mb-8">
            注意事項
          </h2>

          <ul className="space-y-3 text-sm leading-relaxed text-mist/80">
            {INVITATION_NOTES.map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 inline-block w-1 h-1 rounded-full bg-gold shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs text-mist/50 leading-relaxed text-center">
            ※ 招待特典の注意事項をよくお読みになった上で受付してください。
          </p>
        </div>
      </section>

      {/* フッター（簡易） */}
      <footer className="py-8 text-center text-[11px] text-mist/40 border-t border-white/10">
        <p>© {new Date().getFullYear()} 321 IDOL PROJECT</p>
      </footer>
    </main>
  );
}
