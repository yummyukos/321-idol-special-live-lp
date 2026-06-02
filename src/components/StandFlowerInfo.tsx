"use client";

/**
 * スタンド花のご案内セクション。
 * チケットCTAの直下、フッターの上に挿入。
 * お花屋さん／関係者向けの情報なので、上品かつ読みやすく。
 */

const CONDITIONS = [
  "お花屋さん等、専門業者による納品のみとさせていただきます。",
  "お客様ご自身による装飾は承れません。",
  "宅配便でのお受け取りは出来ません。",
  "搬入出・装飾作業はすべてお花屋さん等、専門業者さんで完結をしてください。",
  "イベントスタッフがお手伝いをすることは出来ません。",
  "サイズの目安：高さ 2m / 幅 1m / 奥行き 1m 以内。",
  "スタンド同士で連結するタイプのものは、スペースの都合により飾れない場合がございます。",
  "壁面・窓ガラス・床面を使っての装飾はお断りさせていただきます。",
  "アレンジ花（卓上花）のお受け取りは出来ません。",
  "公序良俗に反する装飾・内容のものはお断りさせていただきます。",
  "その他、主催者側で不適切と判断した場合にはお受け取り・展示をお断りさせていただく場合がございます。",
];

export default function StandFlowerInfo() {
  return (
    <section
      id="stand-flower"
      className="section-pad bg-ink relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-aurora opacity-30" />

      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
          STAND FLOWER
        </p>
        <h2 className="text-center font-mincho text-3xl sm:text-4xl text-mist mb-3">
          スタンド花につきまして
        </h2>
        <p className="text-center text-mist/70 text-sm sm:text-base mb-12 leading-relaxed">
          ご出花いただける関係者の皆さまへ、納品先・条件のご案内です。
        </p>

        {/* 納品先 */}
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8 mb-6">
          <p className="text-xs tracking-[0.3em] text-gold/80 mb-3">
            ■ 納品先
          </p>
          <p className="font-mincho text-mist text-base sm:text-lg leading-relaxed">
            〒112-0004
            <br />
            東京都文京区後楽 1-3-61
            <br />
            東京ドームミーツポート 1F
            <br />
            <span className="text-mist/80">TEL 03-3817-6150</span>
          </p>
          <p className="mt-4 font-mincho text-mist text-base sm:text-lg leading-relaxed border-t border-white/10 pt-4">
            Kanadevia Hall　楽屋口
            <br />
            <span className="text-gold">
              321 IDOL PROJECT Special LIVE スタッフ 宛
            </span>
          </p>
        </div>

        {/* 納品 & 回収時間 */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6">
            <p className="text-xs tracking-[0.3em] text-gold/80 mb-3">
              ■ 納品時間
            </p>
            <p className="font-mincho text-mist text-lg sm:text-xl leading-relaxed">
              7月13日（月）
              <br />
              <span className="text-2xl sm:text-3xl">11:00 〜 14:30</span>
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6">
            <p className="text-xs tracking-[0.3em] text-gold/80 mb-3">
              ■ 回収時間
            </p>
            <p className="font-mincho text-mist text-lg sm:text-xl leading-relaxed">
              7月13日（月）
              <br />
              <span className="text-2xl sm:text-3xl">21:00 〜 22:00</span>
            </p>
          </div>
        </div>

        {/* 重要な注意 */}
        <div className="rounded-2xl border border-glow/40 bg-glow/[0.08] p-5 sm:p-6 mb-10 text-center">
          <p className="font-mincho text-mist text-sm sm:text-base leading-relaxed">
            ※ 会場での処分は出来ません。
            <span className="block sm:inline">
              {" "}
              必ず<span className="text-glow font-bold">回収のご手配</span>
              をお願いいたします。
            </span>
          </p>
        </div>

        {/* 条件リスト */}
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs tracking-[0.3em] text-gold/80 mb-5">■ 条件</p>
          <ul className="space-y-3">
            {CONDITIONS.map((c) => (
              <li
                key={c}
                className="flex gap-3 text-mist/85 text-sm sm:text-base leading-relaxed"
              >
                <span aria-hidden className="text-gold/70 select-none">
                  ・
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>

          {/* アレンジ花の補足 */}
          <div className="mt-6 rounded-xl bg-white/[0.04] border border-white/10 p-4 sm:p-5">
            <p className="text-mist/70 text-xs sm:text-sm leading-relaxed">
              <span className="text-gold/80">※ アレンジ花について：</span>
              <br />
              アレンジ花はお花屋さんによる回収がないため、ご本人またはスタッフの方が全てお持ち帰りいただける場合に限り、お受け取り可能です。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
