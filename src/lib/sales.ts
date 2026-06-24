// 売上 + 招待 データ取得レイヤー
// ----------------------------------------------------------------
// 達成率の計算（現行ロジック）：
//  - TiGET販売枚数（招待含む）から、アリーナ完売分の600を引いたものを「バルコニー販売分」とする
//  - そこに、関係者招待ランキングの「総招待数」を加算
//  - それを母数 900 で割って％を算出
//
//    meterValue = max(0, totalSold - 600) + invitedCount
//    meterPct   = min(100, meterValue / 900 * 100)
// ----------------------------------------------------------------

import { TICKETS } from "./event";

export type SalesSnapshot = {
  /** TiGET累計販売枚数（招待含む） */
  totalSold: number;
  /** 関係者招待数 */
  invitedCount: number;
  /** 最終更新時刻（ISO） */
  updatedAt: string;
};

const FALLBACK: SalesSnapshot = {
  totalSold: 0,
  invitedCount: 0,
  updatedAt: new Date().toISOString(),
};

export async function fetchCurrentSales(): Promise<SalesSnapshot> {
  try {
    const res = await fetch("/api/sales", { cache: "no-store" });
    if (!res.ok) return FALLBACK;
    const data = (await res.json()) as Partial<SalesSnapshot>;
    if (typeof data.totalSold === "number") {
      return {
        totalSold: data.totalSold,
        invitedCount: typeof data.invitedCount === "number" ? data.invitedCount : 0,
        updatedAt: data.updatedAt ?? new Date().toISOString(),
      };
    }
    return FALLBACK;
  } catch {
    return FALLBACK;
  }
}

/**
 * バルコニー販売分（アリーナ600を超えた分）を算出
 */
export function getBalconySold(totalSold: number): number {
  return Math.max(0, totalSold - TICKETS.arenaCapacity);
}

/**
 * メーター値 = バルコニー販売分 + 関係者招待数
 */
export function getMeterValue(totalSold: number, invitedCount: number): number {
  return getBalconySold(totalSold) + invitedCount;
}

/**
 * 達成率（%）。母数は TICKETS.balconyCapacity (= 900)
 */
export function getBalconyPct(totalSold: number, invitedCount = 0): number {
  const value = getMeterValue(totalSold, invitedCount);
  return Math.min(100, (value / TICKETS.balconyCapacity) * 100);
}

/**
 * 表示用％：日付スケジュールに応じてロジックを切り替える。
 *
 *  ～ 6/25 0:00 JST          : 旧ロジック (TiGET−600) / 600
 *  6/25 0:00 ～ 6/26 0:00 JST: 50% 固定
 *  6/26 0:00 ～ 6/27 9:00 JST: 55% 固定
 *  6/27 9:00 JST 以降        : 新ロジック ((TiGET−600)+招待) / 900
 */
export function getDisplayPct(totalSold: number, invitedCount: number): number {
  const now = Date.now();
  // 境界はすべてJST。UTC換算で固定値を持つ（JST = UTC+9）。
  const T_25_0   = Date.UTC(2026, 5, 24, 15, 0, 0); // 2026/6/25 00:00 JST
  const T_26_0   = Date.UTC(2026, 5, 25, 15, 0, 0); // 2026/6/26 00:00 JST
  const T_27_9   = Date.UTC(2026, 5, 27, 0,  0, 0); // 2026/6/27 09:00 JST

  if (now < T_25_0) {
    // 旧ロジック：バルコニー販売分のみで母数600
    const balconySold = getBalconySold(totalSold);
    return Math.min(100, (balconySold / 600) * 100);
  }
  if (now < T_26_0) return 50;
  if (now < T_27_9) return 55;
  // 27日 9:00 JST 以降：新ロジック
  return getBalconyPct(totalSold, invitedCount);
}

/**
 * リアルタイム購読（10秒ポーリング）
 */
export function subscribeSales(
  onUpdate: (snapshot: SalesSnapshot) => void
): () => void {
  let cancelled = false;

  const tick = async () => {
    if (cancelled) return;
    try {
      const snap = await fetchCurrentSales();
      if (!cancelled) onUpdate(snap);
    } catch (e) {
      console.error("sales fetch error", e);
    }
  };

  tick();
  const id = setInterval(tick, 10_000);

  return () => {
    cancelled = true;
    clearInterval(id);
  };
}
