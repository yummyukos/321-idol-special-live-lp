"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  GROUPS,
  getMembersByGroup,
  type GroupName,
  type Member,
} from "@/lib/members";

/**
 * ABOUT US セクション
 *  - 見出し「わたしたちについて」（はじめて知ってくれたあなたへ）
 *  - 2グループ紹介＋14人のプロフ写真グリッド（3列）
 *  - メンバーのカードをタップで、画面中央モーダルでアー写（全身）＋SNS表示
 */

function SocialIcon({
  kind,
}: {
  kind: "instagram" | "x" | "tiktok" | "pococha" | "youtube" | "profile";
}) {
  const cls = "w-4 h-4 fill-current";
  switch (kind) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.84 5.84 0 0 0-2.11 1.38A5.84 5.84 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.74 1.46 1.38 2.11.65.64 1.32 1.07 2.11 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.84 5.84 0 0 0 2.11-1.38c.64-.65 1.07-1.32 1.38-2.11.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.84 5.84 0 0 0-1.38-2.11A5.84 5.84 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.7a8.16 8.16 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1.84-.09Z" />
        </svg>
      );
    case "pococha":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M12 2c0 3.5-3 5.5-3 9a3 3 0 0 0 3 3 3 3 0 0 0 3-3c0-1 .5-2 1-2.5 1.5 1 3 3.5 3 6.5a7 7 0 1 1-14 0c0-5 4-7 4-13 1.5 0 3 0 3 0Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.57A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.13c1.8.57 9.4.57 9.4.57s7.6 0 9.4-.57a3 3 0 0 0 2.1-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6Z" />
        </svg>
      );
    case "profile":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2.5c-3.34 0-10 1.67-10 5V22h20v-2.5c0-3.33-6.66-5-10-5Z" />
        </svg>
      );
  }
}

function MemberModal({
  member,
  onClose,
}: {
  member: Member;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const socials: Array<{
    kind: Parameters<typeof SocialIcon>[0]["kind"];
    href: string;
    label: string;
  }> = [];
  if (member.instagram)
    socials.push({ kind: "instagram", href: member.instagram, label: "Instagram" });
  if (member.x) socials.push({ kind: "x", href: member.x, label: "X" });
  if (member.tiktok)
    socials.push({ kind: "tiktok", href: member.tiktok, label: "TikTok" });
  if (member.pococha)
    socials.push({ kind: "pococha", href: member.pococha, label: "Pococha" });
  if (member.youtube)
    socials.push({ kind: "youtube", href: member.youtube, label: "YouTube" });
  socials.push({ kind: "profile", href: member.profileUrl, label: "公式プロフィール" });

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" />
      <div
        className="relative max-w-md w-full max-h-[92vh] overflow-y-auto rounded-2xl border border-white/15 bg-velvet"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-ink/70 backdrop-blur-sm flex items-center justify-center text-mist hover:bg-ink transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-2xl">
          <Image
            src={member.arrangePhoto}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 92vw, 28rem"
            className="object-cover"
            priority
          />
        </div>
        <div className="px-5 py-4">
          <p className="font-mincho text-mist text-xl sm:text-2xl leading-tight">
            {member.name}
          </p>
          {member.subName && (
            <p className="text-mist/60 text-xs sm:text-sm mt-1">
              {member.subName}
            </p>
          )}
          <p className="text-gold/80 text-[10px] tracking-widest mt-2">
            {member.group}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} ${s.label}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-mist/85 hover:text-gold hover:border-gold/40 transition-colors text-[11px] sm:text-xs"
              >
                <SocialIcon kind={s.kind} />
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberCard({
  member,
  onOpen,
}: {
  member: Member;
  onOpen: (m: Member) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(member)}
        className="group block w-full text-left overflow-hidden rounded-2xl border border-white/10 hover:border-gold/40 transition-colors"
        aria-label={`${member.name} のプロフィールを開く`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-velvet">
          <Image
            src={member.portraitPhoto}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 220px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="bg-white px-2 py-3.5 sm:px-2.5 sm:py-4 flex items-center justify-center min-h-[54px] sm:min-h-[60px]">
          <p
            className="text-ink leading-tight text-center truncate w-full"
            style={{
              fontFamily: '"Dela Gothic One", system-ui, sans-serif',
              fontSize: "clamp(12px, 2.8vw, 16px)",
              fontWeight: 400,
            }}
          >
            {member.name}
          </p>
        </div>
      </button>
    </li>
  );
}

function GroupBlock({
  group,
  onOpen,
}: {
  group: GroupName;
  onOpen: (m: Member) => void;
}) {
  const info = GROUPS[group];
  const members = getMembersByGroup(group);
  return (
    <div className="mb-14 last:mb-0">
      <div className="text-center mb-7 sm:mb-9">
        <h3 className="font-mincho text-2xl sm:text-3xl text-mist">
          {info.name}
        </h3>
      </div>

      <ul className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
        {members.map((m) => (
          <MemberCard key={m.id} member={m} onOpen={onOpen} />
        ))}
      </ul>
    </div>
  );
}

export default function Artists() {
  const [open, setOpen] = useState<Member | null>(null);
  return (
    <section
      id="artists"
      className="section-pad bg-ink relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-aurora opacity-25" />
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-3">
          <span className="inline-block bg-white text-ink rounded-full px-4 py-1.5 text-[11px] sm:text-xs tracking-[0.2em]">
            はじめて知ってくれたあなたへ
          </span>
        </div>
        <h2 className="text-center text-3xl sm:text-4xl text-mist mb-6 font-semibold">
          わたしたちについて
        </h2>
        <p className="text-center text-mist/85 text-sm sm:text-base max-w-2xl mx-auto mb-14 leading-relaxed">
          2つのグループ「PALE TULLE」と「Glitter System」からなる
          <br />
          ライブ配信から生まれたアイドルプロジェクト「321 IDOL PROJECT」。
          <br />
          ライバーとして、日々みんなと配信でつながりながら、アイドル活動も全力で！
          <br />
          応援してくれるあなたと一緒に、
          <span className="text-gold">ライバー × アイドルの伝説</span>
          を作りたい！
        </p>

        <GroupBlock group="PALE TULLE" onOpen={setOpen} />
        <GroupBlock group="Glitter System" onOpen={setOpen} />
      </div>

      {open && <MemberModal member={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
