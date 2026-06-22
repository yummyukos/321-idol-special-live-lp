"use client";

/**
 * グループ写真セクション（明るい背景版・ARTISTS〜FOLLOW US の中間）。
 * 装飾の淡いブラーをArtists/FollowUsと統一。
 */
export default function GroupPhoto() {
  return (
    <section
      className="relative overflow-hidden pt-2 pb-6 sm:pb-10"
      style={{ background: "#F4A4B5" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute left-[-10%] top-[5%] h-[40%] w-[40%] rounded-full"
          style={{ background: "rgba(220, 200, 255, 0.4)", filter: "blur(120px)" }}
        />
        <div
          className="absolute right-[-10%] bottom-[5%] h-[40%] w-[40%] rounded-full"
          style={{ background: "rgba(255, 220, 200, 0.45)", filter: "blur(120px)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <img
          src="/messesita.png"
          alt=""
          className="mx-auto w-full h-auto drop-shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
        />
      </div>
    </section>
  );
}
