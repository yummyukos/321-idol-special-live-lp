// 14人分のメンバーデータ
// ----------------------------------------------------------------
// 名前・写真・公式プロフィールURL・Pochochaリンク・各種プロフィール情報は
// 公式サイト（liveridol.321.inc/member/XXX）から取得済み。
//
// 写真は2枚：
//  - arrangePhoto: 正式アー写（フルポスター・グループ世界観入り）← Drive正式版
//  - portraitPhoto: 顔アップのプロフ写真 ← 公式メンバーページ
//
// ARTISTSセクションでは portraitPhoto をカードに表示し、
// タップで開くモーダル内で arrangePhoto を中央表示、プロフィール詳細も表示。
// ----------------------------------------------------------------

export type GroupName = "PALE TULLE" | "Glitter System";

export type Member = {
  id: string;
  /** 表示用メイン名 */
  name: string;
  /** 別名・本名など */
  subName?: string;
  group: GroupName;
  /** 1枚目（モーダル中央）：正式アー写 */
  arrangePhoto: string;
  /** カード表示：顔アップのプロフ写真 */
  portraitPhoto: string;
  /** 公式プロフィールページ */
  profileUrl: string;
  /** プロフィール詳細（公式サイトから取得） */
  birthday?: string;
  birthplace?: string;
  height?: string;
  color?: string;
  comment?: string;
  /** 配信ルーム（公式プロフページの「配信ルーム」リンク。多くはPococha、一部TikTok） */
  streamingRoom?: string;
  // 個人SNS（あれば。後で追加していくのでoptional）
  instagram?: string;
  x?: string;
  tiktok?: string;
  youtube?: string;
};

export const MEMBERS: Member[] = [
  // ────── PALE TULLE ──────
  {
    id: "154",
    name: "あさちゃん",
    group: "PALE TULLE",
    arrangePhoto: "/members/PT__asachan.jpg",
    portraitPhoto: "/members/PT_web_aph_asachan.jpg",
    profileUrl: "https://liveridol.321.inc/member/154",
    birthday: "11月8日",
    birthplace: "非公表",
    height: "155cm",
    color: "ライトブルー",
    comment:
      "普段はポコチャでのんびり雑談配信をしています！\n30代に突入しましたが、321アイドル部の魅力をたくさんの人に届けられるようにますます頑張ります！♡",
    streamingRoom:
      "https://www.pococha.com/app/users/339cfe2b-57d4-4bf3-aa0e-ea42ed96153b",
  },
  {
    id: "211",
    name: "斉藤優里",
    group: "PALE TULLE",
    arrangePhoto: "/members/PT__saitoyuuri.jpg",
    portraitPhoto: "/members/PT_web_aph_saitoyuuri.jpg",
    profileUrl: "https://liveridol.321.inc/member/211",
    birthday: "1993年7月20日",
    birthplace: "東京都",
    height: "157cm",
    color: "ピンク",
    comment:
      "一瞬、一瞬を大事に会いに来て下さった皆さんを全員幸せに出来るように自分自身も楽しみながらステージに立ちます！",
    streamingRoom: "https://www.tiktok.com/@yuuri_3ito",
  },
  {
    id: "301",
    name: "ゆいかさん。",
    subName: "山内唯花",
    group: "PALE TULLE",
    arrangePhoto: "/members/PT__yamauchiyuika.jpg",
    portraitPhoto: "/members/PT_web_aph_yamauchiyuika.jpg",
    profileUrl: "https://liveridol.321.inc/member/301",
    birthday: "2月4日",
    birthplace: "北海道",
    height: "162cm",
    color: "オレンジ",
    comment:
      "久しぶりにペルチュの曲ができてとーっても嬉しいです！オレンジ似合うって言ってもらえるようにパワフルで元気にがんばるぞー！猫とお酒が好きです！",
    streamingRoom:
      "https://www.pococha.com/app/users/7c888755-8a07-4b88-a0fd-6c5619cdb6f9",
  },
  {
    id: "175",
    name: "うーたん",
    subName: "泡沫ちゃん",
    group: "PALE TULLE",
    arrangePhoto: "/members/PT__u-tan.jpg",
    portraitPhoto: "/members/PT_web_aph_utakatachan.jpg",
    profileUrl: "https://liveridol.321.inc/member/175",
    birthday: "12月26日",
    birthplace: "埼玉県",
    height: "154cm",
    color: "ミントグリーン",
    comment:
      "アイドル部のため、PALE TULLEのために、私のできることを精一杯頑張ります🐰⸝꙳\nこの半年間は、あっという間に過ぎてしまうと思うのですが、みなさんとかけがえのない時間を大事に大事に共有していきたいです！\n7月のKanadevia Hallが素敵な日になって、応援しててよかったと思ってもらえるように、これから色んな挑戦をしていきますのであたたかく見守ってくださると幸いです。\nどうぞよろしくお願いします！",
    streamingRoom:
      "https://www.pococha.com/ja-jp/app/users/671d5f3f-4b00-45eb-bd47-16b5cd59d618",
  },
  {
    id: "1164",
    name: "美波瑠乃",
    subName: "るのるん",
    group: "PALE TULLE",
    arrangePhoto: "/members/PT__minamiruno.jpg",
    portraitPhoto: "/members/PT_web_aph_minamiruno.jpg",
    profileUrl: "https://liveridol.321.inc/member/1164",
    birthday: "3月2日",
    birthplace: "富山県",
    height: "160cm",
    color: "レッド",
    comment:
      "富山県在住！レッド担当♥️\n「るのるん」こと【みなみるの】です🐹\nおとなしそうに見えて、実は喋りだすと止まらないおふざけ大好きっ子！ 世界30ヵ国を旅するバックパッカーで、特に台湾はマニア級🇹🇼 釣り、お酒、脱出ゲーム、そして配信まで❣️ 常に全力で「楽しい」を追求しています🥃🎣\n皆さんの元気や笑顔のため！情熱の赤を胸にアイドルも配信も全力で頑張ります🎤❤️\n私のこと一番近くで見守っててほしいな🫶\nるのるんの成長を〜？\n＼みんなみるの〜👀❤️／",
    streamingRoom:
      "https://www.pococha.com/ja-jp/app/users/dead0da9-958d-4162-be61-9efeabfad4e9",
  },
  {
    id: "172",
    name: "宇佐美麗乃.",
    group: "PALE TULLE",
    arrangePhoto: "/members/PT__uremireno.jpg",
    portraitPhoto: "/members/PT_web_aph_usamireno.jpg",
    profileUrl: "https://liveridol.321.inc/member/172",
    birthday: "2002年3月13日",
    birthplace: "神奈川県",
    height: "159cm",
    color: "ホワイト",
    comment:
      "ずっと目指していたPALETULLEのスタメンに連れてきてくれて本当にありがとうございます！\n半年間後悔のないように精一杯頑張るのでよろしくお願いします！\n7月のKanadevia Hallワンマン絶対一緒に成功させようね！🤍",
    streamingRoom:
      "https://www.pococha.com/app/users/2ba61f10-e4af-4828-be64-138630f77e16",
    instagram: "https://www.instagram.com/reno_oimo/",
  },
  {
    id: "228",
    name: "清野真帆",
    group: "PALE TULLE",
    arrangePhoto: "/members/PT__seinomaho.jpg",
    portraitPhoto: "/members/PT_web_aph_seinomaho.jpg",
    profileUrl: "https://liveridol.321.inc/member/228",
    birthday: "7月21日",
    birthplace: "長野県",
    height: "151cm",
    color: "パープル",
    comment:
      "諦めずに最後まで応援してくれたみんなのおかげで、またスタメンとして活動させていただきます！\n自分らしく！目がなくなるくらいとびっきりの笑顔でキラキラ輝きます✨\nペンライトはパープル💜👑\nせーの！の後に大きな声で「まほー！」って呼んでね📣\n＼せーの！まほー！🐰🎀／",
    streamingRoom:
      "https://www.pococha.com/ja-jp/app/users/1898b0e1-0633-47e9-8ddc-4c4fbec78de9",
    instagram: "https://www.instagram.com/maholic_.u/",
  },

  // ────── Glitter System ──────
  {
    id: "306",
    name: "ユカリ",
    group: "Glitter System",
    arrangePhoto: "/members/GS__yukari.jpg",
    portraitPhoto: "/members/GS_web_aph_yukari.jpg",
    profileUrl: "https://liveridol.321.inc/member/306",
    birthday: "3月9日",
    birthplace: "愛知県",
    height: "162cm",
    color: "レッド",
    comment:
      "ステージや配信を通して、みなさんの毎日に笑顔のきっかけを作れたら嬉しいです✨\nユカリのことを推して後悔させないよっ♡",
    streamingRoom:
      "https://www.pococha.com/app/users/5e8951c1-6cae-48c8-b19f-9f7eca6feb7e",
  },
  {
    id: "217",
    name: "塩見きら",
    group: "Glitter System",
    arrangePhoto: "/members/GS__shiomi.jpg",
    portraitPhoto: "/members/GS_web_aph_shiomikira.jpg",
    profileUrl: "https://liveridol.321.inc/member/217",
    birthday: "1998年11月6日",
    birthplace: "愛媛県松山市",
    height: "158cm",
    color: "グリーン",
    comment:
      "見た目はアイドル！中身はおじさん！ギャンブルとお酒と阪神タイガースが好きです。",
    streamingRoom:
      "https://www.pococha.com/app/users/84c82336-0638-4f17-aa47-a319b13e453b",
  },
  {
    id: "208",
    name: "こもも",
    group: "Glitter System",
    arrangePhoto: "/members/GS__komomo.jpg",
    portraitPhoto: "/members/GS_web_aph_komomo.jpg",
    profileUrl: "https://liveridol.321.inc/member/208",
    birthday: "10月16日",
    birthplace: "静岡県",
    height: "155cm",
    color: "ホワイト",
    comment: "一生懸命がんばりますっ‪ᐢ⸝⸝•⩊•⸝⸝ᐢ❤︎",
    streamingRoom:
      "https://www.pococha.com/ja-jp/app/users/ed61019b-e25f-421d-aa21-ee9bb42158e6",
  },
  {
    id: "185",
    name: "えりんこ",
    group: "Glitter System",
    arrangePhoto: "/members/GS__erinko.jpg",
    portraitPhoto: "/members/GS_web_aph_erinko.jpg",
    profileUrl: "https://liveridol.321.inc/member/185",
    birthday: "2月15日",
    birthplace: "大阪府",
    height: "155cm",
    color: "パープル",
    comment:
      "おいもパープル担当えりんこです🍠💜\n熟成16年、味わうほどハマります🍠",
    streamingRoom:
      "https://www.pococha.com/app/users/3e32ebcb-f7ed-45f4-b6c1-2c354d59bf7e",
  },
  {
    id: "1238",
    name: "三葉みゆ",
    subName: "かわちまる",
    group: "Glitter System",
    arrangePhoto: "/members/GS__mitsuhamiyu.jpg",
    portraitPhoto: "/members/GS_web_aph_mitsuhamiyu.jpg",
    profileUrl: "https://liveridol.321.inc/member/1238",
    birthday: "12月20日",
    birthplace: "岩手県",
    height: "160cm",
    color: "ピンク",
    comment: "推しメンにしてくれますか？♡",
    streamingRoom: "https://www.tiktok.com/@miyu__mitsuha",
  },
  {
    id: "565",
    name: "七瀬ユリナ",
    group: "Glitter System",
    arrangePhoto: "/members/GS__nanaseyurina.jpg",
    portraitPhoto: "/members/GS_web_aph_nanaseyurina.jpg",
    profileUrl: "https://liveridol.321.inc/member/565",
    birthday: "1月31日",
    birthplace: "福岡県",
    height: "156cm",
    color: "ブルー",
    comment: "青色担当です\n初スタメンうれしいです頑張ります\n平和主義です",
    streamingRoom:
      "https://www.pococha.com/ja-jp/app/users/5668b91b-5dce-4d9c-902e-cb77a50dfcab",
  },
  {
    id: "1235",
    name: "みにい",
    group: "Glitter System",
    arrangePhoto: "/members/GS__minnie.jpg",
    portraitPhoto: "/members/GS_web_aph_minnie.jpg",
    profileUrl: "https://liveridol.321.inc/member/1235",
    birthday: "3月21日",
    birthplace: "千葉県",
    height: "155cm",
    color: "オレンジ",
    comment:
      "夢のアイドル人生がはじまりましたっ！\nアイドル・ライバー・看護師…\nなーんでもよくばっちゃう、よくばりバイリンガール🎀🧡\n配信はNGなし！\n居酒屋のように笑って泣いて、\nいつでも帰ってこられる居場所であり続けるよ🧡\n新人アイドル、推してみない？🫵\nみんなをHappyにするよ🪄✨\nこれから一緒に、たくさん思い出つくろうね🎀🧡",
    streamingRoom:
      "https://www.pococha.com/ja-jp/app/users/c2f0e17d-20f2-430d-b748-28f6fddf5f03",
  },
];

export type GroupInfo = {
  name: GroupName;
  nameJa: string;
  nickname: string;
  memberCount: number;
  siteUrl: string;
  concept?: string;
  /** ロゴ画像（public/からの相対パス）。あればテキスト見出しの代わりに表示 */
  logoUrl?: string;
};

export const GROUPS: Record<GroupName, GroupInfo> = {
  "PALE TULLE": {
    name: "PALE TULLE",
    nameJa: "ペールチュール",
    nickname: "ペルチュ",
    memberCount: 7,
    siteUrl: "https://paletulle.321.inc/",
    logoUrl: "/logos/pale-tulle.png",
  },
  "Glitter System": {
    name: "Glitter System",
    nameJa: "グリッターシステム",
    nickname: "グリシス",
    memberCount: 7,
    siteUrl: "https://glittersystem.321.inc/",
    logoUrl: "/logos/glitter-system.png",
  },
};

export function getMembersByGroup(group: GroupName): Member[] {
  return MEMBERS.filter((m) => m.group === group);
}
