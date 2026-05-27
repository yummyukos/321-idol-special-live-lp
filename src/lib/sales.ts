// 売上データ取得レイヤー
// ----------------------------------------------------------------
// チケットの仕組み：
//  - 先着順で販売（アリーナ → バルコニーの順）
//  - アリーナ席 600枚が完売してから、バルコニー席の販売開始
//  - 達成特典は「バルコニー席の販売枚数」を100%として計算
//    （バルコニーで 600 枚売れた時点で100%＝累計 1200 枚）
//
// 達成率の計算：
//  - totalSold ≦ 600 → 0%（まだアリーナ販売中、バルコニー未着手）
//  - totalSold > 600 → (totalSold - 600) / 600 * 100 がバルコニー達成率
//  - totalSold ≧ 1200 → 100%
// ----------------------------------------------------------------

import { TICKETS } from "./event";

export type SalesSnapshot = {
  // 累計販売枚数（アリーナ＋バルコニーの合算）
  totalSold: number;
  // 最終更新時刻（ISO）
  updatedAt: string;
};

// API障害時のフォールバック
const FALLBACK: SalesSnapshot = {
  totalSold: 0,
  updatedAt: new Date().toISOString(),
};

/**
 * 現在の売上スナップショットを取得します。
 *
 * 同一オリジンの /api/sales を叩く（中で tiget-sales-monitor の /summary を
 * サーバー側スクレイピングして JSON 化している）。
 * サーバー側で30秒キャッシュしているので、頻繁に叩いても上流負荷は抑えられる。
 */
export async function fetchCurrentSales(): Promise<SalesSnapshot> {
  try {
    const res = await fetch("/api/sales", { cache: "no-store" });
    if (!res.ok) return FALLBACK;
    const data = (await res.json()) as Partial<SalesSnapshot>;
    if (typeof data.totalSold === "number") {
      return {
        totalSold: data.totalSold,
        updatedAt: data.updatedAt ?? new Date().toISOString(),
      };
    }
    return FALLBACK;
  } catch {
    return FALLBACK;
  }
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
