"use client";

import { useEffect, useRef, useState } from "react";
import { SONGS, type Song } from "@/lib/songs";

/**
 * 左下に固定表示されるレコード再生ボタン。
 * クリックで public/songs/ のMP3からランダム再生。
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [show, setShow] = useState(false);

  // ヒーロー（最初の100svh）を抜けたら表示
  useEffect(() => {
    const handler = () => {
      const past = window.scrollY > window.innerHeight * 0.6;
      setShow(past);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  const playRandom = () => {
    if (SONGS.length === 0) return; // 楽曲未登録なら何もしない

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    // 現在再生中以外の曲からランダム選択（曲が1つしかない時は同じ曲）
    const candidates =
      SONGS.length > 1
        ? SONGS.filter((s) => s.file !== currentSong?.file)
        : SONGS;
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    setCurrentSong(next);

    if (audioRef.current) {
      audioRef.current.src = next.file;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  // 楽曲未登録の時はボタン自体表示しない
  if (SONGS.length === 0) return null;

  return (
    <>
      <audio ref={audioRef} preload="none" />

      <button
        type="button"
        onClick={playRandom}
        aria-label={isPlaying ? "音楽を止める" : "ランダムで音楽を再生"}
        className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 transition-all duration-300 ${
          show
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="music-player-wrap group">
          {/* レコード（vinyl） */}
          <div className={`vinyl ${isPlaying ? "spinning" : "idle"}`}>
            {/* 溝 */}
            <div className="vinyl-groove vinyl-groove-1" />
            <div className="vinyl-groove vinyl-groove-2" />
            <div className="vinyl-groove vinyl-groove-3" />
            {/* 中央ラベル */}
            <div className="vinyl-label">
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  className="w-3 h-3 sm:w-4 sm:h-4 fill-current"
                  aria-hidden="true"
                >
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="w-3 h-3 sm:w-4 sm:h-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
            {/* 中央ホール */}
            <div className="vinyl-hole" />
          </div>

          {/* 再生中の曲名 */}
          {isPlaying && currentSong && (
            <div className="music-now-playing">
              <span className="music-eq" aria-hidden>
                <span /><span /><span />
              </span>
              <span className="music-title">{currentSong.title}</span>
            </div>
          )}
        </div>
      </button>
    </>
  );
}
