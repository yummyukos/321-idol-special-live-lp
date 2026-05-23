// 売上データ取得レイヤー
// ----------------------------------------------------------------
// チケットの仕組み：
//  - 先着順で販売（アリーナ → バルコニーの順）
//  - アリーナ席 600枚が完売してから、バルコニー席 900枚の販売開始
//  - 達成特典は「バルコニー席の販売枚数」を100%として計算
//
// 達成率の計算：
//  - totalSold ≦ 600 → 0%（まだアリーナ販売中、バルコニー未着手）
//  - totalSold > 600 → (totalSold - 600) / 900 * 100 がバルコニー達成率
// ----------------------------------------------------------------

import { TICKETS } from "./event";

export type SalesSnapshot = {
  // 累計販売枚数（アリーナ＋バルコニーの合算）
  totalSold: number;
  // 最終更新時刻（ISO）
  updatedAt: string;
};

// デモデータ：現在のリアル状況に合わせて 0（アリーナ販売開始直後・バルコニー未着手）
const DEMO: SalesSnapshot = {
  totalSold: 0,
  updatedAt: new Date().toISOString(),
};

/**
 * 現在の売上スナップショットを取得します。
 *
 * 【今】デモデータを返します。
 * 【後で】Firestore or 公開APIに差し替えてください：
 *
 * @example APIエンドポイントを叩く場合
 *   const res = await fetch('https://tiget-sales-monitor.vercel.app/api/sales/477181');
 *   const data = await res.json();
 *   return { totalSold: data.totalSold, updatedAt: data.updatedAt };
 */
export async function fetchCurrentSales(): Promise<SalesSnapshot> {
  await new Promise((r) => setTimeout(r, 300));
  return DEMO;
}

/**
 * 累計販売枚数からバルコニー販売枚数を算出（アリーナ完売後の販売分のみ）
 */
export function getBalconySold(totalSold: number): number {
  return Math.max(0, totalSold - TICKETS.arenaCapacity);
}

/**
 * 達成率（%）を算出（バルコニー販売枚数 / バルコニー定員 * 100）
 */
export function getBalconyPct(totalSold: number): number {
  const balconySold = getBalconySold(totalSold);
  return Math.min(100, (balconySold / TICKETS.balconyCapacity) * 100);
}

/**
 * リアルタイム購読（Firestore onSnapshot を想定）。
 * 今はポーリング（10秒に1回）で代替。
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
