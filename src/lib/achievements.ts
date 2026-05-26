// 達成特典の定義（バルコニー900枚を100%として、キリのいい数字で）
//
// パーセンテージは均等配分ではなく、マーケティング心理に基づいて配置：
//  - 序盤（10/20/30%）は早めにアンロックで「動いてる感」を演出
//  - 50%は半分到達の節目
//  - 70/85/95%で終盤の盛り上がり
//  - 100%はサプライズ

export type Achievement = {
  id: number;
  threshold: number; // %（0-100）
  title: string;
  description: string;
  icon: string;
  mystery?: boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    threshold: 10,
    title: "カラオケ楽曲追加",
    description: "ライブ前にみんなで歌える楽曲をカラオケに追加！"
    icon: "🎤",
  },
  {
    id: 2,
    threshold: 20,
    title: "交換楽曲披露,
    description:
      "2グループで衣装をチェンジ！普段見られない衣装で楽曲披露しちゃいます！",
    icon: "👗",
  },
  {
    id: 3,
    threshold: 30,
    title: "のぼり制作",
    description: "会場を彩るオリジナルのぼりを制作。当日のフォトスポットに！",
    icon: "🚩",
  },
  {
    id: 4,
    threshold: 50,
    title: "等身大パネル制作",
    description: "メンバー全員の等身大パネルを会場に設置。一緒に写真を撮ろう！",
    icon: "🖼️",
  },
  {
    id: 5,
    threshold: 70,
    title: "ステージ装飾ランクアップ",
    description:
      "ステージセットがスペシャル仕様に格上げ！メンバーのテンションも爆上がり！",
    icon: "✨",
  },
  {
    id: 6,
    threshold: 85,
    title: "当日限定オリジナルSE制作",
    description: "登場SEをこの日のためだけに新規制作。一生に一度の音で迎えよう！",
    icon: "🎧",
  },
  {
    id: 7,
    threshold: 95,
    title: "14人全員で披露する新曲を披露",
    description: "PALE TULLE × グリッターシステム、14人全員での新曲を初披露！",
    icon: "🎶",
  },
  {
    id: 8,
    threshold: 100,
    title: "各グループ新曲披露",
    description:
      "100%達成で解禁される、メンバーにもシークレットな特典。当日のお楽しみに...！",
    icon: "🗝️",
    mystery: true,
  },
];

export type AchievementHistoryEntry = {
  achievementId: number;
  achievedAt: string;
};

export const DEMO_ACHIEVEMENT_HISTORY: AchievementHistoryEntry[] = [];
