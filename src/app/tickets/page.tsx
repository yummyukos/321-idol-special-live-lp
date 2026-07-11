import Link from "next/link";

export const metadata = {
  title: "チケット購入 | 321 IDOL SPECIAL LIVE",
};

export default function TicketsPage() {
  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-3">TICKET</p>
        <h1 className="font-mincho text-3xl sm:text-5xl text-mist mb-6">
          チケットを購入
        </h1>
        <p className="font-mincho text-mist/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-2">
          席種をお選びください
        </p>
        <p className="text-xs sm:text-sm text-mist/50 leading-relaxed max-w-md mx-auto">
          ※ アリーナ席は1階席です。バルコニー席は2階席以上となります。
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-lg">
        {/* アリーナ席：SOLD OUT（クリック不可） */}
        <div
          aria-disabled="true"
          className="relative inline-flex flex-col items-center justify-center gap-1 rounded-2xl px-8 py-6 text-ink/70 font-display font-semibold flex-1 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #6b4d5a 0%, #7a6058 100%)",
            cursor: "not-allowed",
          }}
        >
          {/* 斜めの SOLD OUT オーバーレイ */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span
              className="text-white/90 font-bold tracking-[0.3em] text-2xl sm:text-3xl"
              style={{
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                transform: "rotate(-8deg)",
              }}
            >
              SOLD OUT
            </span>
          </span>
          <span className="text-lg sm:text-xl whitespace-nowrap opacity-40 line-through decoration-2">
            アリーナ席チケット
          </span>
          <span className="mt-2 text-xs bg-black/30 rounded-full px-4 py-1 opacity-60">
            完売
          </span>
        </div>

        {/* バルコニー席：販売中 */}
        <a
          href="https://eplus.jp/liveridol_321/"
          target="_blank"
          rel="noopener noreferrer"
          className="ticket-cta-button group inline-flex flex-col items-center justify-center gap-1 rounded-2xl px-8 py-6 text-ink font-display font-semibold flex-1 transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)",
          }}
        >
          <span className="text-lg sm:text-xl whitespace-nowrap">
            バルコニー席チケット
          </span>
          <span className="mt-2 text-sm bg-black/20 rounded-full px-4 py-1">
            購入する →
          </span>
        </a>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="text-mist/40 text-sm hover:text-mist/70 transition-colors"
        >
          ← トップページに戻る
        </Link>
      </div>
    </main>
  );
}
