// チケット販売数 + 関係者招待数を集約して返すAPI
// ----------------------------------------------------------------
// 取得元:
//  - tiget-sales-monitor /summary: 両グループ合計（招待含む）枚数
//  - kankeisha-ranking-lp /api/ranking: 関係者招待の totalCount
//
// 30秒キャッシュで上流に過剰アクセスしないようにしている。

import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 30;

const SOURCE_URL = "https://tiget-sales-monitor.vercel.app/summary";
const INVITE_API = "https://kankeisha-ranking-lp.vercel.app/api/ranking";

type Payload = {
  totalSold: number; // TiGET合計
  invitedCount: number; // 関係者招待合計
  updatedAt: string; // TiGET側の最終更新（ISO）
  source: "live" | "fallback";
};

function jstToIso(yyyy_mm_dd_hh_mm_ss: string): string | null {
  const m = yyyy_mm_dd_hh_mm_ss.match(
    /^(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})$/
  );
  if (!m) return null;
  const [, y, mo, d, h, mi, s] = m.map(Number) as unknown as number[];
  const utc = Date.UTC(y, mo - 1, d, h - 9, mi, s);
  return new Date(utc).toISOString();
}

async function fetchInviteCount(): Promise<number> {
  try {
    const r = await fetch(INVITE_API, {
      next: { revalidate: 30 },
      headers: { "user-agent": "321-idol-lp/1.0" },
    });
    if (!r.ok) return 0;
    const j = (await r.json()) as {
      totalCount?: number;
      rankings?: Array<{ count?: number }>;
    };
    if (typeof j.totalCount === "number") return j.totalCount;
    if (Array.isArray(j.rankings)) {
      return j.rankings.reduce((s, x) => s + (x.count || 0), 0);
    }
    return 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  const fallback: Payload = {
    totalSold: 0,
    invitedCount: 0,
    updatedAt: new Date().toISOString(),
    source: "fallback",
  };

  try {
    const [salesRes, invitedCount] = await Promise.all([
      fetch(SOURCE_URL, {
        next: { revalidate: 30 },
        headers: {
          "user-agent":
            "321-idol-lp/1.0 (+https://321-idol-special-live-lp.vercel.app)",
        },
      }),
      fetchInviteCount(),
    ]);
    if (!salesRes.ok) return NextResponse.json<Payload>(fallback);
    const html = await salesRes.text();

    const totalMatch = html.match(
      /両グループ合計（招待含む）[\s\S]{0,300}?<strong[^>]*>([0-9,]+)/
    );
    if (!totalMatch) return NextResponse.json<Payload>(fallback);
    const totalSold = parseInt(totalMatch[1].replace(/,/g, ""), 10);

    const dateMatch = html.match(
      /最終更新[\s\S]{0,30}?(\d{4}\/\d{1,2}\/\d{1,2}\s+\d{1,2}:\d{1,2}:\d{1,2})/
    );
    const updatedAt =
      (dateMatch && jstToIso(dateMatch[1])) ?? new Date().toISOString();

    return NextResponse.json<Payload>(
      { totalSold, invitedCount, updatedAt, source: "live" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<Payload>(fallback);
  }
}
