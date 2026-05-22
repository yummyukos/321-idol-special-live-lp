// 売上データ取得レイヤー
// ----------------------------------------------------------------
// このファイルでは「現在の販売枚数」を取得します。
// 今は デモデータ で動作。
// 後でエンジニアが Firestore（tiget-sales-monitor のデータ）に
// 切り替えるときは、`fetchCurrentSales` の中身だけ書き換えればOKです。
// ----------------------------------------------------------------

export type SalesSnapshot = {
  // 累計販売枚数（アリーナ＋バルコニーの合算）
  totalSold: number;
  // バルコニー販売枚数（達成特典のパーセンテージ計算に使用）
  balconySold: number;
  // 最終更新時刻（ISO）
  updatedAt: string;
};

// デモデータ：好きな値に変えると見え方が変わります
// アリーナ600枚は完売前提。balconySold をいじって達成特典の進み具合を確認してください
const DEMO: SalesSnapshot = {
  totalSold: 600 + 230, // 例: バルコニー230枚売れた状態
  balconySold: 230,
  updatedAt: new Date().toISOString(),
};

/**
 * 現在の売上スナップショットを取得します。
 *
 * 【今】デモデータを返します。
 * 【後で】下記コメントを参考に、Firestore or 公開APIに差し替えてください。
 *
 * @example Firestoreに繋ぐ場合（クライアントSDK）
 *   import { getFirestore, doc, getDoc } from 'firebase/firestore';
 *   const snap = await getDoc(doc(db, 'sales', 'event_477181'));
 *   return snap.data() as SalesSnapshot;
 *
 * @example APIエンドポイントを叩く場合
 *   const res = await fetch('https://tiget-sales-monitor.vercel.app/api/sales/477181');
 *   return await res.json();
 */
export async function fetchCurrentSales(): Promise<SalesSnapshot> {
  // 軽く遅延させて、ローディング表示の確認もできるように
  await new Promise((r) => setTimeout(r, 300));
  return DEMO;
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
