// tiget-sales-monitor の /summary をサーバー側でfetchして
// 「両グループ合計（招待含む）XXX枚」と「最終更新 YYYY/MM/DD HH:MM:SS」を抽出。
// LPからは /api/sales 経由でこの値を取得する。
//
// 30秒キャッシュで上流に過剰アクセスしないようにしている。

import { NextResponse } from "next/server";

export const runtime = "edge";
// Vercel Data Cache: 30秒間サーバー側でキャッシュ
export const revalidate = 30;

const SOURCE_URL = "https://tiget-sales-monitor.vercel.app/summary";

type Payload = {
  totalSold: number;
  updatedAt: string; // ISO
  source: "live" | "fallback";
};

function jstToIso(yyyy_mm_dd_hh_mm_ss: string): string | null {
  // 例: "2026/05/27 16:54:05"
  const m = yyyy_mm_dd_hh_mm_ss.match(
    /^(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})$/
  );
  if (!m) return null;
  const [, y, mo, d, h, mi, s] = m.map(Number) as unknown as number[];
  // 入力は JST。JST = UTC+9。UTCに直してISO化。
  const utc = Date.UTC(y, mo - 1, d, h - 9, mi, s);
  return new Date(utc).toISOString();
}

export async function GET() {
  try {
    const res = await fetch(SOURCE_URL, {
      next: { revalidate: 30 },
      headers: {
        "user-agent": "321-idol-lp/1.0 (+https://321-idol-special-live-lp.vercel.app)",
      },
    });
    if (!res.ok) {
      return NextResponse.json<Payload>(
        {
          totalSold: 0,
          updatedAt: new Date().toISOString(),
          source: "fallback",
        },
        { status: 200 }
      );
    }
    const html = await res.text();

    // 「両グループ合計（招待含む）...<strong>XXX</strong>」の最初の数字を抽出
    const totalMatch = html.match(
      /両グループ合計（招待含む）[\s\S]{0,300}?<strong[^>]*>([0-9,]+)/
    );
    if (!totalMatch) {
      return NextResponse.json<Payload>(
        {
          totalSold: 0,
          updatedAt: new Date().toISOString(),
          source: "fallback",
        },
        { status: 200 }
      );
    }
    const totalSold = parseInt(totalMatch[1].replace(/,/g, ""), 10);

    // 「最終更新 YYYY/MM/DD HH:MM:SS」も拾う
    const dateMatch = html.match(
      /最終更新[\s\S]{0,30}?(\d{4}\/\d{1,2}\/\d{1,2}\s+\d{1,2}:\d{1,2}:\d{1,2})/
    );
    const updatedAt =
      (dateMatch && jstToIso(dateMatch[1])) ?? new Date().toISOString();

    return NextResponse.json<Payload>(
      { totalSold, updatedAt, source: "live" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<Payload>(
      {
        totalSold: 0,
        updatedAt: new Date().toISOString(),
        source: "fallback",
      },
      { status: 200 }
    );
  }
}
