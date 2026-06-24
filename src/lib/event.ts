// イベント基本情報（編集はこのファイルだけでOK）

export const EVENT = {
  title: "321 IDOL PROJECT Special LIVE",
  venueName: "Kanadevia Hall",
  venueNote: "（旧東京ドームシティホール）",
  // ISO形式で2026/7/13 19:00 JST
  startAt: "2026-07-13T19:00:00+09:00",
  openAt: "2026-07-13T17:30:00+09:00",
  doorsLabel: "OPEN 17:30 / START 19:00",
  date: "2026年7月13日（月）",
  performers: ["PALE TULLE", "グリッターシステム"],
  ticketUrl: "https://tiget.net/events/477181",
  // 招待特典の招待フォーム（代表者が事前記入）
  invitationFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSftXTp8Md2TGk7c_XYgXZR8xulNcQlROXXfGiKdwJaRAhWAYA/viewform?pli=1",
  // 招待特典の元ニュースページ（参考）
  invitationSourceUrl: "https://liveridol.321.inc/news/1394",
  meetGreet: {
    before: "15:30 〜 17:00",
    after: "21:00 〜 22:15",
  },
  venueAddress: "東京都文京区後楽1-3-61",
  accessNotes: [
    "JR水道橋駅 徒歩約3分",
    "都営三田線 水道橋駅 徒歩約5分",
    "東京メトロ丸ノ内線・南北線 後楽園駅 徒歩約7分",
  ],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kanadevia+Hall+%E6%97%A7%E6%9D%B1%E4%BA%AC%E3%83%89%E3%83%BC%E3%83%A0%E3%82%B7%E3%83%86%E3%82%A3%E3%83%9B%E3%83%BC%E3%83%AB",
};

// チケット構成
export const TICKETS = {
  totalCapacity: 1500,
  arenaCapacity: 600, // 完売
  // 達成特典の100%基準（母数）：
  //   バルコニー販売分 (TiGET合計 - 600) + 関係者招待数 = 900 で 100%
  balconyCapacity: 900,
  arenaSoldOut: true,
};
