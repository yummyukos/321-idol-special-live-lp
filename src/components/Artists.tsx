"use client";

// 出演アーティスト紹介
// 各種URLは確定後に書き換えてください
const ARTISTS = [
  {
    name: "PALE TULLE",
    tag: "From 321 IDOL PROJECT",
    description:
      "やさしくも芯のある世界観で、ステージを物語に変えるグループ。",
    color: "from-glow/30",
    accent: "border-glow/30",
    sns: [
      { label: "X", url: "https://x.com/" },
      { label: "Instagram", url: "https://instagram.com/" },
    ],
  },
  {
    name: "グリッターシステム",
    tag: "From 321 IDOL PROJECT",
    description:
      "弾けるパフォーマンスと一体感で、フロアごと一つにするグループ。",
    color: "from-glow2/30",
    accent: "border-glow2/30",
    sns: [
      { label: "X", url: "https://x.com/" },
      { label: "Instagram", url: "https://instagram.com/" },
    ],
  },
];

export default function Artists() {
  return (
    <section className="section-pad bg-ink">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
          ARTISTS
        </p>
        <h2 className="text-center font-display text-3xl sm:text-4xl text-mist mb-10">
          出演アーティスト
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {ARTISTS.map((a) => (
            <div
              key={a.name}
              className={`relative overflow-hidden rounded-2xl border ${a.accent} bg-velvet/60 p-7`}
            >
              <div
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${a.color} to-transparent opacity-50`}
              />
              <p className="text-[10px] tracking-[0.3em] text-mist/50 mb-2">
                {a.tag}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl text-mist mb-3">
                {a.name}
              </h3>
              <p className="text-mist/80 text-sm leading-relaxed mb-5">
                {a.description}
              </p>
              <div className="flex gap-2">
                {a.sns.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-mist hover:bg-white/10 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-mist/40">
          ※ 各SNSリンクは仮設定です。確定後にお差し替えします。
        </p>
      </div>
    </section>
  );
}
