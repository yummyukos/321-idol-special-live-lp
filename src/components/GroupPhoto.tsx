"use client";

/**
 * グループ写真セクション（明るい背景版・ARTISTS〜FOLLOW US の中間）。
 * 前後のセクションも同じクリーム色なのでフェードは不要。
 */
export default function GroupPhoto() {
  return (
    <section
      className="relative overflow-hidden -mt-4 sm:-mt-6 pb-6 sm:pb-10"
      style={{ background: "#faf6ec" }}
    >
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <img
          src="/messesita.png"
          alt=""
          className="mx-auto w-full h-auto drop-shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
        />
      </div>
    </section>
  );
}
