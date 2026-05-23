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
  // ↓↓↓ ここに楽曲を追加してください
  // 例：
  // { title: "ふふふ", artist: "PALE TULLE", file: "/songs/paletulle-fufufu.mp3" },
  // { title: "キラキラ", artist: "グリッターシステム", file: "/songs/glitter-kirakira.mp3" },
];
