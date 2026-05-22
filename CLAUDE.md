# Claude セッション運用メモ

このプロジェクトを編集するときの手順（次回以降のClaudeセッション向け）。

## 構成

- **GitHub**: `yummyukos/321-idol-special-live-lp`（private）
- **Vercel**: `yukos-projects1/321-idol-special-live-lp` （GitHub連携済み・自動デプロイ）
- **本番URL**: Vercelダッシュボードで確認

## ユーザーから「変更して」と言われたら

1. `mcp__cowork__request_cowork_directory` で `~/Desktop/321-idol-special-live-lp` のアクセスを取得
2. `gh-token.txt` から GitHub PAT を読み込む（このフォルダ内、gitignore済み）
3. ファイルを編集（Read/Write/Edit）
4. 編集後、bashで以下を実行：

```bash
cd /sessions/<session>/mnt/321-idol-special-live-lp
TOKEN=$(cat gh-token.txt)
git remote set-url origin "https://x-access-token:${TOKEN}@github.com/yummyukos/321-idol-special-live-lp.git"
git add .
git commit -m "変更内容の説明"
git push origin main
```

5. これでVercelが自動デプロイ → 1〜2分で本番反映

## ファイル構成

- `src/app/page.tsx` ... LPトップページ（セクションの順番、追加/削除）
- `src/app/layout.tsx` ... 全ページ共通レイアウト＋フォント読み込み
- `src/app/invitation/page.tsx` ... 招待特典詳細ページ（/invitation）
- `src/app/globals.css` ... グローバルCSS（カスタムフォント定義など）
- `src/components/*.tsx` ... 各セクション・パーツのコンポーネント
- `src/lib/event.ts` ... イベント基本情報（日程、会場、チケットURLなど）
- `src/lib/achievements.ts` ... チケット達成特典の定義
- `src/lib/invitation.ts` ... 招待特典の定義（人数 → 特典）
- `public/` ... 画像、動画などの静的ファイル

## 重要な注意点

- `gh-token.txt` は .gitignore で除外済み。**絶対にコミットしない**
- フォントは next/font/google ではなく layout.tsx の link タグで読み込み（ビルドタイムアウト回避のため）
- /invitation ページは `export const dynamic = "force-dynamic"` で静的生成を回避
- HamburgerMenu と FloatingTicketCta は layout.tsx と page.tsx の末尾でグローバル表示

## トークンが失効したら

ユーザーに [https://github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens) で
新しい Fine-grained PAT を作ってもらう。権限：

- Repository access: `321-idol-special-live-lp` だけでOK
- Contents: Read and write
- Workflows: Read and write
- Metadata: Read-only（自動）

そして `gh-token.txt` を新しいトークンで上書き。
