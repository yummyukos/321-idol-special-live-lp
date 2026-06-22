// 14人分のメンバーデータ
// ----------------------------------------------------------------
// 名前・写真・公式プロフィールURL・Pochochaリンクは公式サイト
// (liveridol.321.inc/member) から取得済み。
//
// 各メンバー本人のIG / X / TikTok / 配信アプリの追加URLや、
// ライブへの一言メッセージ（message）は本人から集まり次第ここに追記。
// ----------------------------------------------------------------

export type GroupName = "PALE TULLE" | "Glitter System";

export type Member = {
  id: string;
  /** 表示用メイン名 */
  name: string;
  /** 別名・本名など（カッコ書きで表示） */
  subName?: string;
  group: GroupName;
  /** /public からの相対パス */
  photo: string;
  /** 公式プロフィールページ */
  profileUrl: string;
  // SNS（持っている人だけ。後で追加していくのでoptional）
  pococha?: string;
  instagram?: string;
  x?: string;
  tiktok?: string;
  youtube?: string;
  /** ライブへの一言メッセージ（メンバーから集まり次第追加） */
  message?: string;
};

export const MEMBERS: Member[] = [
  // ────── PALE TULLE ──────
  {
    id: "154",
    name: "あさちゃん",
    group: "PALE TULLE",
    photo: "/members/PT_web_aph_asachan.jpg",
    profileUrl: "https://liveridol.321.inc/member/154",
    pococha: "https://www.pococha.com/app/users/339cfe2b-57d4-4bf3-aa0e-ea42ed96153b",
  },
  {
    id: "211",
    name: "斉藤優里",
    group: "PALE TULLE",
    photo: "/members/PT_web_aph_saitoyuuri.jpg",
    profileUrl: "https://liveridol.321.inc/member/211",
    pococha: "https://www.pococha.com/app/users/988ce661-a641-4cc5-aaf9-9a1e29c1cb91",
  },
  {
    id: "301",
    name: "ゆいかさん。",
    subName: "山内唯花",
    group: "PALE TULLE",
    photo: "/members/PT_web_aph_yamauchiyuika.jpg",
    profileUrl: "https://liveridol.321.inc/member/301",
    pococha: "https://www.pococha.com/app/users/7c888755-8a07-4b88-a0fd-6c5619cdb6f9",
  },
  {
    id: "175",
    name: "うーたん",
    subName: "泡沫ちゃん",
    group: "PALE TULLE",
    photo: "/members/PT_web_aph_utakatachan.jpg",
    profileUrl: "https://liveridol.321.inc/member/175",
  },
  {
    id: "1164",
    name: "美波瑠乃",
    subName: "るのるん",
    group: "PALE TULLE",
    photo: "/members/PT_web_aph_minamiruno.jpg",
    profileUrl: "https://liveridol.321.inc/member/1164",
  },
  {
    id: "172",
    name: "宇佐美麗乃.",
    group: "PALE TULLE",
    photo: "/members/PT_web_aph_usamireno.jpg",
    profileUrl: "https://liveridol.321.inc/member/172",
    pococha: "https://www.pococha.com/app/users/2ba61f10-e4af-4828-be64-138630f77e16",
  },
  {
    id: "228",
    name: "清野真帆",
    group: "PALE TULLE",
    photo: "/members/PT_web_aph_seinomaho.jpg",
    profileUrl: "https://liveridol.321.inc/member/228",
  },

  // ────── Glitter System ──────
  {
    id: "306",
    name: "ユカリ",
    group: "Glitter System",
    photo: "/members/GS_web_aph_yukari.jpg",
    profileUrl: "https://liveridol.321.inc/member/306",
    pococha: "https://www.pococha.com/app/users/5e8951c1-6cae-48c8-b19f-9f7eca6feb7e",
  },
  {
    id: "217",
    name: "塩見きら",
    group: "Glitter System",
    photo: "/members/GS_web_aph_shiomikira.jpg",
    profileUrl: "https://liveridol.321.inc/member/217",
    pococha: "https://www.pococha.com/app/users/84c82336-0638-4f17-aa47-a319b13e453b",
  },
  {
    id: "208",
    name: "こもも",
    group: "Glitter System",
    photo: "/members/GS_web_aph_komomo.jpg",
    profileUrl: "https://liveridol.321.inc/member/208",
  },
  {
    id: "185",
    name: "えりんこ",
    group: "Glitter System",
    photo: "/members/GS_web_aph_erinko.jpg",
    profileUrl: "https://liveridol.321.inc/member/185",
    pococha: "https://www.pococha.com/app/users/3e32ebcb-f7ed-45f4-b6c1-2c354d59bf7e",
  },
  {
    id: "1238",
    name: "三葉みゆ",
    subName: "かわちまる",
    group: "Glitter System",
    photo: "/members/GS_web_aph_mitsuhamiyu.jpg",
    profileUrl: "https://liveridol.321.inc/member/1238",
  },
  {
    id: "565",
    name: "七瀬ユリナ",
    group: "Glitter System",
    photo: "/members/GS_web_aph_nanaseyurina.jpg",
    profileUrl: "https://liveridol.321.inc/member/565",
  },
  {
    id: "1235",
    name: "みにい",
    group: "Glitter System",
    photo: "/members/GS_web_aph_minnie.jpg",
    profileUrl: "https://liveridol.321.inc/member/1235",
  },
];

export type GroupInfo = {
  name: GroupName;
  nameJa: string;
  nickname: string;
  memberCount: number;
  siteUrl: string;
  concept?: string;
};

export const GROUPS: Record<GroupName, GroupInfo> = {
  "PALE TULLE": {
    name: "PALE TULLE",
    nameJa: "ペールチュール",
    nickname: "ペルチュ",
    memberCount: 7,
    siteUrl: "https://paletulle.321.inc/",
    // PALE TULLEのコンセプト文言が確定したら追記
  },
  "Glitter System": {
    name: "Glitter System",
    nameJa: "グリッターシステム",
    nickname: "グリシス",
    memberCount: 7,
    siteUrl: "https://glittersystem.321.inc/",
    concept:
      "自己満？ナルシスト？なんだっていい！わたしをもっと知ってほしい！どんどん拡散したくなる、そんな曲を歌う、グリッターの様にきらめくアイドルグループ。",
  },
};

export function getMembersByGroup(group: GroupName): Member[] {
  return MEMBERS.filter((m) => m.group === group);
}
