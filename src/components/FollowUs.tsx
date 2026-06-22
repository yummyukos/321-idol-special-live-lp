"use client";

/**
 * プロジェクト全体のSNS導線セクション。
 * チケットCTAの後、スタンド花の前に配置。
 * 「もっと知りたい方へ」の受け皿。
 */

type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "tiktok" | "x" | "youtube" | "web";
};

const LINKS: SocialLink[] = [
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
  { label: "X", href: "https://x.com/321idol", icon: "x" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCib1KGyXdophXGu9ZEyVNbQ",
    icon: "youtube",
  },
  { label: "公式サイト", href: "https://liveridol.321.inc/", icon: "web" },
];

function IconSvg({ kind }: { kind: SocialLink["icon"] }) {
  switch (kind) {
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current"
          aria-hidden="true"
        >
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.84 5.84 0 0 0-2.11 1.38A5.84 5.84 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.74 1.46 1.38 2.11.65.64 1.32 1.07 2.11 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.84 5.84 0 0 0 2.11-1.38c.64-.65 1.07-1.32 1.38-2.11.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.84 5.84 0 0 0-1.38-2.11A5.84 5.84 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.7a8.16 8.16 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1.84-.09Z" />
        </svg>
      );
    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current"
          aria-hidden="true"
        >
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.57A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.13c1.8.57 9.4.57 9.4.57s7.6 0 9.4-.57a3 3 0 0 0 2.1-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6Z" />
        </svg>
      );
    case "web":
      return (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current"
          aria-hidden="true"
        >
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2Zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8ZM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96ZM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26Zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.99 7.99 0 0 1 5.08 16Zm2.95-8H5.08a7.99 7.99 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8ZM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96ZM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2Zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56ZM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38Z" />
        </svg>
      );
  }
}

export default function FollowUs() {
  return (
    <section
      id="follow"
      className="section-pad bg-ink relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-aurora opacity-30" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-2">FOLLOW US</p>
        <h2 className="font-mincho text-3xl sm:text-4xl text-mist mb-3">
          もっと知る・もっと近づく
        </h2>
        <p className="font-mincho text-mist/75 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          321 IDOL PROJECT 公式アカウントで、メンバーの日常やライブ最新情報をお届けしています。
        </p>

        <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`321 IDOL PROJECT ${l.label}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-mist hover:bg-gradient-to-r hover:from-glow/20 hover:via-glow2/20 hover:to-gold/20 hover:border-gold/40 hover:text-gold transition-all"
              >
                <IconSvg kind={l.icon} />
                <span className="font-mincho text-sm sm:text-base">
                  {l.label}
                </span>
                <span
                  aria-hidden
                  className="text-xs text-mist/40 group-hover:text-gold transition-colors"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
