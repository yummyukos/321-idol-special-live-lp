"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  GROUPS,
  MEMBERS,
  getMembersByGroup,
  type GroupName,
  type Member,
} from "@/lib/members";

/**
 * ARTISTSセクション
 * PALE TULLE と Glitter System の紹介＋14人のメンバーカード
 *
 * カード上半分：2枚スワイプ式
 *  - 1枚目: arrangePhoto（正式アー写・フルポスター）
 *  - 2枚目: portraitPhoto（顔アップ）
 *
 * カードをタップで一言メッセージ・SNSが展開
 */

function SocialIcon({ kind }: { kind: "instagram" | "x" | "tiktok" | "pococha" | "youtube" | "profile" }) {
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

function PhotoSwipe({ photos }: { photos: { src: string; alt: string }[] }) {
  const [idx, setIdx] = useState(0);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const moved = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    moved.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = (e.touches[0].clientY - (startY.current ?? 0));
    if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) moved.current = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = (e.changedTouches[0].clientX) - startX.current;
    startX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0 && idx < photos.length - 1) setIdx(idx + 1);
    if (dx > 0 && idx > 0) setIdx(idx - 1);
  };

  return (
    <div
      className="relative aspect-[3/4] overflow-hidden bg-velvet"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{
          width: `${photos.length * 100}%`,
          transform: `translateX(-${(100 / photos.length) * idx}%)`,
        }}
      >
        {photos.map((p, i) => (
          <div
            key={p.src}
            className="relative h-full shrink-0"
            style={{ width: `${100 / photos.length}%` }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* 左右ボタン（PC用・ホバーで出現） */}
      {idx > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx - 1);
          }}
          aria-label="前の写真"
          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-ink/70 backdrop-blur-sm text-mist flex items-center justify-center hover:bg-ink/90 transition-opacity opacity-0 group-hover:opacity-100"
        >
          ‹
        </button>
      )}
      {idx < photos.length - 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIdx(idx + 1);
          }}
          aria-label="次の写真"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-ink/70 backdrop-blur-sm text-mist flex items-center justify-center hover:bg-ink/90 transition-opacity opacity-0 group-hover:opacity-100"
        >
          ›
        </button>
      )}

      {/* ドットインジケーター */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIdx(i);
            }}
            aria-label={`写真 ${i + 1}`}
            className={`block h-1.5 rounded-full transition-all ${
              i === idx ? "w-5 bg-mist" : "w-1.5 bg-mist/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  const [expanded, setExpanded] = useState(false);
  const socials: Array<{ kind: Parameters<typeof SocialIcon>[0]["kind"]; href: string; label: string }> = [];
  if (member.instagram) socials.push({ kind: "instagram", href: member.instagram, label: "Instagram" });
  if (member.x) socials.push({ kind: "x", href: member.x, label: "X" });
  if (member.tiktok) socials.push({ kind: "tiktok", href: member.tiktok, label: "TikTok" });
  if (member.pococha) socials.push({ kind: "pococha", href: member.pococha, label: "Pococha" });
  if (member.youtube) socials.push({ kind: "youtube", href: member.youtube, label: "YouTube" });
  socials.push({ kind: "profile", href: member.profileUrl, label: "公式プロフィール" });

  const photos = [
    { src: member.arrangePhoto, alt: `${member.name}（アー写）` },
    { src: member.portraitPhoto, alt: `${member.name}（プロフ写真）` },
  ];

  return (
    <li className="group">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-gold/40 transition-colors">
        <PhotoSwipe photos={photos} />
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
        >
          <div className="min-w-0">
            <p className="font-mincho text-mist text-sm sm:text-base leading-tight truncate">
              {member.name}
            </p>
            {member.subName && (
              <p className="text-mist/60 text-[10px] sm:text-xs leading-tight mt-0.5 truncate">
                {member.subName}
              </p>
            )}
          </div>
          <span
            aria-hidden
            className={`shrink-0 text-mist/60 text-[10px] transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </button>
      </div>

      {expanded && (
        <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-mist/85 text-xs sm:text-sm leading-relaxed mb-3 whitespace-pre-wrap">
            {member.message ?? (
              <span className="text-mist/45 italic">
                一言メッセージ準備中...
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} ${s.label}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-mist/80 hover:text-gold hover:border-gold/40 transition-colors text-[11px]"
              >
                <SocialIcon kind={s.kind} />
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

function GroupBlock({ group }: { group: GroupName }) {
  const info = GROUPS[group];
  const members = getMembersByGroup(group);
  return (
    <div className="mb-16 last:mb-0">
      <div className="text-center mb-8 sm:mb-10">
        <p className="text-xs tracking-[0.4em] text-gold/80 mb-2">
          {info.name === "PALE TULLE" ? "GROUP 01" : "GROUP 02"}
        </p>
        <h3 className="font-mincho text-2xl sm:text-3xl text-mist mb-1">
          {info.name}
        </h3>
        <p className="text-mist/60 text-xs sm:text-sm">
          {info.nameJa} ／ {info.nickname} ／ {info.memberCount}人
        </p>
        {info.concept && (
          <p className="text-mist/75 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4 font-mincho">
            {info.concept}
          </p>
        )}
        <a
          href={info.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-5 text-gold hover:text-mist text-xs sm:text-sm transition-colors"
        >
          公式サイトを見る
          <span aria-hidden>↗</span>
        </a>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {members.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </ul>
    </div>
  );
}

export default function Artists() {
  return (
    <section id="artists" className="section-pad bg-ink relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-aurora opacity-25" />
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
          ARTISTS
        </p>
        <h2 className="text-center font-mincho text-3xl sm:text-4xl text-mist mb-3">
          出演アーティスト
        </h2>
        <p className="text-center text-mist/70 text-sm sm:text-base max-w-2xl mx-auto mb-14 leading-relaxed font-mincho">
          321 IDOL PROJECT の2つのグループ、{MEMBERS.length}名がこのステージに立ちます。
          <br className="hidden sm:inline" />
          写真は<span className="text-gold">スワイプ</span>で切替、カードをタップで一言メッセージ＆SNSが見られます。
        </p>

        <GroupBlock group="PALE TULLE" />
        <GroupBlock group="Glitter System" />
      </div>
    </section>
  );
}
