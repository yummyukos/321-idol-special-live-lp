"use client";

/**
 * 公式サイトCTA + SNS導線セクション（明るい背景版）
 * GroupPhoto と Countdown の間に配置。下端でクリーム→暗背景にフェード。
 */

type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "tiktok" | "x";
};

const SNS_LINKS: SocialLink[] = [
  { label: "X", href: "https://x.com/321idol", icon: "x" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/321idolproject/",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@321idol",
    icon: "tiktok",
  },
];

function IconSvg({ kind }: { kind: SocialLink["icon"] }) {
  const cls = "w-5 h-5 sm:w-6 sm:h-6 fill-current";
  switch (kind) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.84 5.84 0 0 0-2.11 1.38A5.84 5.84 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.74 1.46 1.38 2.11.65.64 1.32 1.07 2.11 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.84 5.84 0 0 0 2.11-1.38c.64-.65 1.07-1.32 1.38-2.11.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.84 5.84 0 0 0-1.38-2.11A5.84 5.84 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.7a8.16 8.16 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1.84-.09Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
}

export default function FollowUs() {
  return (
    <section
      id="follow"
      className="relative overflow-hidden pt-12 sm:pt-16 pb-44 sm:pb-56"
      style={{ background: "#faf6ec" }}
    >
      {/* 装飾：淡いピンク・ゴールドのぼかし光（Artistsと統一感） */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute left-[-15%] top-[20%] h-[55%] w-[45%] rounded-full"
          style={{ background: "rgba(255, 200, 220, 0.5)", filter: "blur(120px)" }}
        />
        <div
          className="absolute right-[-10%] top-[10%] h-[50%] w-[40%] rounded-full"
          style={{ background: "rgba(255, 230, 180, 0.55)", filter: "blur(120px)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* メインCTA：公式サイトボタン（ピンク・明るい背景でも映える） */}
        <a
          href="https://liveridol.321.inc/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 sm:px-12 sm:py-5 text-white text-base sm:text-xl shadow-[0_8px_30px_-6px_rgba(255,92,156,0.5)] hover:shadow-[0_12px_40px_-6px_rgba(255,92,156,0.7)] hover:scale-105 active:scale-95 transition-all font-semibold"
          style={{
            background:
              "linear-gradient(135deg, #FF8FB9 0%, #FF5C9C 50%, #FFB4D1 100%)",
          }}
        >
          <span aria-hidden className="text-lg sm:text-2xl">✨</span>
          <span className="relative">321 IDOL PROJECT 公式サイト</span>
          <span
            aria-hidden
            className="text-xl sm:text-2xl transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        {/* SNSアイコン群 */}
        <ul className="mt-7 flex justify-center gap-3 sm:gap-4">
          {SNS_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`321 IDOL PROJECT ${l.label}`}
                className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-ink/15 bg-white text-ink/80 hover:text-ink hover:bg-white hover:border-ink/40 hover:scale-110 active:scale-95 transition-all shadow-sm"
              >
                <IconSvg kind={l.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 下端：クリームから暗背景（Countdown）へフェード */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-0"
        style={{
          background:
            "linear-gradient(to top, rgb(8,6,15) 0%, rgba(8,6,15,0.7) 30%, rgba(8,6,15,0) 100%)",
        }}
      />
    </section>
  );
}
