"use client";

/**
 * グループ写真セクション（白背景版）
 */
export default function GroupPhoto() {
  return (
    <section
      className="relative overflow-hidden pt-4 pb-8 sm:pb-12"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <img
          src="/messesita.png"
          alt=""
          className="mx-auto w-full h-auto drop-shadow-[0_15px_40px_rgba(0,0,0,0.10)]"
        />
      </div>
    </section>
  );
}
