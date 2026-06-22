"use client";

/**
 * 公式サイトCTA + SNS導線セクション（暗背景版）
 * GroupPhoto と Countdown の間に配置。
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
      className="bg-ink relative overflow-hidden pt-4 sm:pt-6 pb-16 sm:pb-20"
    >
      <div className="absolute inset-0 -z-10 bg-aurora opacity-30" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* 音楽プラットフォーム：Spotify / Apple Music */}
        <p className="text-xs tracking-[0.3em] text-mist/60 mb-3">
          MUSIC
        </p>
        <ul className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-7">
          <li>
            <a
              href="https://open.spotify.com/intl-ja/artist/3CnGfQMyKVKyBZw8JVwLbG"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotifyで聴く"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 sm:px-8 sm:py-3.5 text-white text-sm sm:text-base font-semibold hover:scale-105 active:scale-95 transition-transform shadow-[0_8px_24px_-6px_rgba(29,185,84,0.45)]"
              style={{ background: "#1DB954" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12C24 5.4 18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span>Spotify</span>
            </a>
          </li>
          <li>
            <a
              href="https://music.apple.com/jp/artist/321%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E9%83%A8/1705527838"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apple Musicで聴く"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 sm:px-8 sm:py-3.5 text-white text-sm sm:text-base font-semibold hover:scale-105 active:scale-95 transition-transform shadow-[0_8px_24px_-6px_rgba(252,40,84,0.45)]"
              style={{
                background:
                  "linear-gradient(135deg, #FB5C74 0%, #FA243C 100%)",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81.84-.553 1.472-1.287 1.88-2.208.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536-.142-.773.227-1.624 1.038-2.022.32-.158.66-.252 1.018-.298.467-.06.943-.018 1.408.063.094.013.18.018.236-.04l.005-.005c.008-.008.012-.018.012-.027v-5.39c0-.043-.005-.06-.012-.067l-.005-.005c-.014-.014-.04-.025-.067-.018l-4.83.987c-.13.027-.157.044-.157.184v8.32c0 .476-.064.94-.282 1.36-.32.612-.847.973-1.508 1.16-.366.1-.74.16-1.12.176-1.06.04-1.92-.6-2.06-1.6-.105-.755.225-1.55.92-2.01.4-.27.84-.43 1.31-.51.395-.07.79-.04 1.18-.04.066 0 .133 0 .2-.005.07-.005.107-.04.115-.11l.003-.123V8.498c0-.45.083-.616.534-.69l11.207-2.28c.42-.087.7.082.7.515z" />
              </svg>
              <span>Apple Music</span>
            </a>
          </li>
        </ul>

        {/* 区切り */}
        <p className="text-xs tracking-[0.3em] text-mist/60 mb-3">
          OFFICIAL
        </p>

        {/* メインCTA：公式サイトボタン（ピンクで可愛い） */}
        <a
          href="https://liveridol.321.inc/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 sm:px-12 sm:py-5 text-white text-base sm:text-xl font-semibold shadow-[0_0_40px_-8px_rgba(255,105,180,0.7)] hover:shadow-[0_0_60px_-6px_rgba(255,105,180,0.9)] hover:scale-105 active:scale-95 transition-all"
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
                className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 bg-white/[0.04] text-mist/85 hover:text-white hover:bg-white/10 hover:border-white/40 hover:scale-110 active:scale-95 transition-all"
              >
                <IconSvg kind={l.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
