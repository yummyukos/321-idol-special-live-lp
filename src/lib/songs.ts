// レコード再生ボタンで流す楽曲リスト
// MP3ファイルは public/songs/ フォルダに置いてください
//
// 使い方：
// 1. mp3ファイルを public/songs/ に追加（例: paletulle-sample1.mp3）
// 2. このファイルの SONGS 配列に { title, file } で追記
// 3. push すれば自動でデプロイされます

export type Song = {
  title: string;
  artist?: string; // "PALE TULLE" or "グリッターシステム" 等
  file: string; // /songs/xxx.mp3
};

export const SONGS: Song[] = [
  {
    title: "I don't know why?",
    artist: "321 IDOL PROJECT",
    file: "/songs/i-dont-know-why.mp3",
  },
  {
    title: "君以前、君以後",
    artist: "321 IDOL PROJECT",
    file: "/songs/kimi-izen-kimi-igo.mp3",
  },
  {
    title: "憂ル憂ル",
    artist: "321 IDOL PROJECT",
    file: "/songs/yuru-yuru.mp3",
  },
  {
    title: "RIP",
    artist: "321 IDOL PROJECT",
    file: "/songs/rip.mp3",
  },
];
