# 321 IDOL PROJECT Special LIVE 専用LP

2026年7月13日（月）Kanadevia Hall（旧東京ドームシティホール）で開催される、PALE TULLE × グリッターシステム の Special LIVE 専用ランディングページです。

バルコニー席900枚を100%として、販売枚数に応じて達成特典が次々と解禁されていく「リアルタイム達成特典システム」を搭載しています。

---

## ゆうこすさんへ：このLPでできること

- **トップに動画スペース**（後で `public/hero.mp4` を置くと自動表示）
- **2グループからのメッセージ**を5行ずつ表示
- **本番までのカウントダウン**（自動更新）
- **公演情報**（日程・会場・出演・特典会・席種）
- **リアルタイム達成特典**（8段階、12.5%ごとに解禁、100%は「？？？」のサプライズ）
- **達成履歴**（解禁された特典のタイムスタンプ）
- **出演アーティスト紹介**（SNSリンク）
- **会場アクセス**（Googleマップ連携）
- **チケット購入CTA**（TiGETに直接遷移）

スマホ最優先で、PCでも美しく見えるデザインになっています。

---

## はじめての方向け：このLPを公開するまでの手順

### 必要なもの
- パソコン（Mac / Windows どちらでもOK）
- GitHubアカウント（無料）
- Vercelアカウント（無料）

### 手順1：GitHubにこのフォルダをアップロード
1. [https://github.com/new](https://github.com/new) で新しいリポジトリを作成
2. リポジトリ名は `321-idol-special-live-lp` などお好きな名前で
3. 「Public」「Private」どちらでもOK（Privateで作るとソースコードは非公開、サイト自体は公開できます）
4. このフォルダ（`321-idol-special-live-lp`）をGitHubにアップロード
   - GitHub Desktopを使うのが一番カンタンです（[https://desktop.github.com/](https://desktop.github.com/)）

### 手順2：Vercelでデプロイ
1. [https://vercel.com/new](https://vercel.com/new) にアクセス
2. 「Import Git Repository」で、手順1のリポジトリを選択
3. 設定は全部デフォルトのまま「Deploy」を押すだけ
4. 1〜2分で `https://〜.vercel.app` のURLが発行されます
5. 独自ドメインを使いたい場合は、Vercelの「Domains」設定から追加できます

### 手順3：動画やSNSリンクを差し替える
- 動画：`public/hero.mp4` に動画ファイルを置く
- 出演アーティストのSNSリンク：`src/components/Artists.tsx` の `sns` を編集
- 2グループからのメッセージ：`src/components/GroupMessages.tsx` の `TEXTS` を編集
- 達成特典の文言：`src/lib/achievements.ts` の `ACHIEVEMENTS` を編集

ファイルを編集してGitHubにpushすれば、Vercelが自動で再デプロイしてくれます。

---

## エンジニアの方向け：技術スタックとセットアップ

### スタック
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3
- Framer Motion

### ローカル起動
```bash
npm install
npm run dev
# http://localhost:3000 で確認
```

### ビルド確認
```bash
npm run build
npm run start
```

### Vercelデプロイ
- GitHubにpush → Vercelで「Import Project」だけで完了
- 環境変数の設定は不要（現状はクライアントサイドのみで完結）

---

## エンジニアの方向け：Firestore（リアルタイム売上）への接続方法

現在、`src/lib/sales.ts` の `fetchCurrentSales` がデモデータを返すようになっています。本番接続するには、以下の手順で書き換えてください。

### パターンA：Firestore クライアントSDKで直接読む

```bash
npm install firebase
```

`src/lib/firebase.ts` を新規作成：
```ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  // ... 必要な分だけ
};

const app = getApps()[0] ?? initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

`src/lib/sales.ts` の `fetchCurrentSales` と `subscribeSales` を書き換え：
```ts
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export function subscribeSales(onUpdate: (s: SalesSnapshot) => void) {
  // 想定: collection "sales", document "event_477181"
  return onSnapshot(doc(db, "sales", "event_477181"), (snap) => {
    const data = snap.data();
    if (!data) return;
    onUpdate({
      totalSold: data.totalSold,
      balconySold: data.balconySold,
      updatedAt: data.updatedAt?.toDate?.().toISOString() ?? new Date().toISOString(),
    });
  });
}
```

VercelのEnvironment Variablesに `NEXT_PUBLIC_FB_*` を設定すれば本番でも動きます。Firestoreのセキュリティルールは「該当docのみread許可」にしてください。

### パターンB：tiget-sales-monitor 側にJSON APIを追加してもらう

例：`https://tiget-sales-monitor.vercel.app/api/sales/477181`
レスポンス：
```json
{ "totalSold": 830, "balconySold": 230, "updatedAt": "2026-05-22T10:00:00+09:00" }
```

`src/lib/sales.ts` を書き換え：
```ts
export async function fetchCurrentSales(): Promise<SalesSnapshot> {
  const res = await fetch("https://tiget-sales-monitor.vercel.app/api/sales/477181", { cache: "no-store" });
  return await res.json();
}
```

---

## カスタマイズチートシート

| やりたいこと | 編集するファイル |
| --- | --- |
| イベント日時・会場を変える | `src/lib/event.ts` |
| 達成特典の内容や%を変える | `src/lib/achievements.ts` |
| 「現在の販売枚数」のデモ値を変える | `src/lib/sales.ts` の `DEMO` |
| 2グループからのメッセージを変える | `src/components/GroupMessages.tsx` の `TEXTS` |
| 出演アーティストの説明・SNSを変える | `src/components/Artists.tsx` の `ARTISTS` |
| 配色を変える | `tailwind.config.ts` の `colors` |
| ページタイトル・OGP説明文を変える | `src/app/layout.tsx` の `metadata` |
| トップの背景動画を入れる | `public/hero.mp4` に動画ファイル |

---

## 今後やること（チェックリスト）

- [ ] 本番ドメイン確定後、`src/app/layout.tsx` の `SITE_URL` を書き換え
- [ ] OGP画像（1200x630）を作成して `public/og.jpg` に配置
- [ ] トップの動画 `hero.mp4` を配置
- [ ] 2グループからのメッセージ本文を確定
- [ ] 出演アーティストのSNSリンクを確定
- [ ] エンジニアと連携して Firestore（または公開API）に接続
- [ ] 公開前にスマホ実機で表示確認

---

## ライセンス・著作権
© 321 IDOL PROJECT

---
最終更新: GitHub + Vercel自動デプロイ連携完了
