"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

type MenuItem = {
  label: string;
  href: string;
  external?: boolean;
};

const ITEMS: MenuItem[] = [
  { label: "招待特典", href: "/#guest-reward" },
  { label: "公演情報", href: "/#info" },
  { label: "チケット達成特典", href: "/#achievement" },
  { label: "スタンド花について", href: "/#stand-flower" },
  { label: "チケット購入", href: EVENT.ticketUrl, external: true },
];

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  // ESCで閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // メニュー開いている間はbody scrollを止める
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClick = (item: MenuItem) => {
    setOpen(false);
    // ハッシュリンクは少し遅延してスムーズスクロール
    if (!item.external && item.href.startsWith("/#")) {
      setTimeout(() => {
        const id = item.href.slice(2);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  return (
    <>
      {/* ハンバーガーボタン */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-[60] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-velvet/80 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-[5px] transition-all hover:bg-velvet"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
      >
        <span
          className={`block w-5 h-[1.5px] bg-mist transition-all duration-300 ${
            open ? "rotate-45 translate-y-[6.5px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-mist transition-opacity duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-mist transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-[6.5px]" : ""
          }`}
        />
      </button>

      {/* オーバーレイメニュー */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* 背景クリックで閉じる */}
        <div
          className="absolute inset-0 bg-ink/95 backdrop-blur-xl bg-aurora"
          onClick={() => setOpen(false)}
        />

        {/* メニュー本体 */}
        <nav className="relative flex flex-col items-center justify-center min-h-full px-6 py-20">
          <ul className="flex flex-col items-center gap-7 sm:gap-8">
            {ITEMS.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: open ? `${i * 80 + 100}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (!item.external && item.href.startsWith("/#")) {
                      e.preventDefault();
                    }
                    handleClick(item);
                  }}
                  className="group flex items-center gap-3 font-mincho text-2xl sm:text-3xl text-mist hover:text-gold transition-colors"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="text-base text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all"
                  >
                    {item.external ? "↗" : "→"}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* メニュー下のロゴ */}
          <div
            className={`mt-16 transition-all duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: open ? "500ms" : "0ms" }}
          >
            <img
              src="/logo-idol.png"
              alt="321 IDOL PROJECT"
              className="h-8 w-auto opacity-70"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </nav>
      </div>
    </>
  );
}
