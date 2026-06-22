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
 * ABOUT US セクション（暗背景版・ロゴの裏に白いブラーを敷いて視認性UP）
 */

function SocialIcon({
  kind,
}: {
  kind: "instagram" | "x" | "tiktok" | "room" | "youtube";
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
    case "room":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-3.05-2.83a.75.75 0 0 1 0 1.06 4.62 4.62 0 0 0 0 6.54.75.75 0 1 1-1.06 1.06 6.12 6.12 0 0 1 0-8.66.75.75 0 0 1 1.06 0Zm6.1 0a.75.75 0 0 1 1.06 0 6.12 6.12 0 0 1 0 8.66.75.75 0 0 1-1.06-1.06 4.62 4.62 0 0 0 0-6.54.75.75 0 0 1 0-1.06ZM6.12 3.84a.75.75 0 0 1 0 1.06 10 10 0 0 0 0 14.2.75.75 0 1 1-1.06 1.06 11.5 11.5 0 0 1 0-16.32.75.75 0 0 1 1.06 0Zm11.76 0a.75.75 0 0 1 1.06 0 11.5 11.5 0 0 1 0 16.32.75.75 0 1 1-1.06-1.06 10 10 0 0 0 0-14.2.75.75 0 0 1 0-1.06Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.57A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.13c1.8.57 9.4.57 9.4.57s7.6 0 9.4-.57a3 3 0 0 0 2.1-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6Z" />
        </svg>
      );
  }
}

function ProfileRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 py-2 border-b border-white/10 last:border-b-0">
      <dt className="text-xs sm:text-sm tracking-[0.2em] text-gold/80">{label}</dt>
      <dd className="text-mist text-sm sm:text-base">{value}</dd>
    </div>
  );
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
    primary?: boolean;
  }> = [];
  if (member.streamingRoom)
    socials.push({ kind: "room", href: member.streamingRoom, label: "配信ルーム", primary: true });
  if (member.instagram)
    socials.push({ kind: "instagram", href: member.instagram, label: "Instagram" });
  if (member.x) socials.push({ kind: "x", href: member.x, label: "X" });
  if (member.tiktok) socials.push({ kind: "tiktok", href: member.tiktok, label: "TikTok" });
  if (member.youtube) socials.push({ kind: "youtube", href: member.youtube, label: "YouTube" });

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start sm:items-center justify-center p-4 sm:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" />
      <div
        className="relative max-w-md w-full my-auto rounded-2xl border border-white/15 bg-velvet"
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
        <div className="px-5 py-5 sm:px-6 sm:py-6">
          <p className="font-mincho text-mist text-2xl sm:text-3xl leading-tight">
            {member.name}
          </p>
          {member.subName && (
            <p className="text-mist/60 text-xs sm:text-sm mt-1">{member.subName}</p>
          )}
          <dl className="mt-5">
            <ProfileRow label="誕生日" value={member.birthday} />
            <ProfileRow label="出身地" value={member.birthplace} />
            <ProfileRow label="身長" value={member.height} />
            <ProfileRow label="カラー" value={member.color} />
          </dl>
          {member.comment && (
            <div className="mt-5">
              <p className="text-xs sm:text-sm tracking-[0.2em] text-gold/80 mb-2">
                コメント
              </p>
              <p className="text-mist/90 text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
                {member.comment}
              </p>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} ${s.label}`}
                className={
                  s.primary
                    ? "inline-flex items-center gap-1.5 rounded-full border border-glow/50 bg-glow/20 px-4 py-2 text-white hover:bg-glow/30 hover:border-glow transition-colors text-xs sm:text-sm font-semibold"
                    : "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-mist/85 hover:text-gold hover:border-gold/40 transition-colors text-[11px] sm:text-xs"
                }
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
        <div className="bg-white px-2 py-4 sm:px-2.5 sm:py-5 flex items-center justify-center min-h-[62px] sm:min-h-[70px]">
          <p
            className="text-ink leading-tight text-center truncate w-full"
            style={{
              fontFamily: '"Dela Gothic One", system-ui, sans-serif',
              fontSize: "clamp(14px, 3.4vw, 19px)",
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
      <div className="flex justify-center mb-7 sm:mb-9">
        {info.logoUrl ? (
          <div className="relative inline-flex items-center justify-center px-4">
            {/* ロゴの裏に白いブラー光（視認性UP）
                Glitter System は紺ベースのロゴで暗いので、横幅広め＋色を明るくする */}
            <div
              aria-hidden
              className={`absolute inset-0 rounded-full pointer-events-none ${
                group === "Glitter System"
                  ? "-mx-16 sm:-mx-28 -my-6 sm:-my-10"
                  : "-m-6 sm:-m-10"
              }`}
              style={{
                background:
                  group === "Glitter System"
                    ? "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 75%)"
                    : "radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0) 75%)",
                filter: "blur(30px)",
              }}
            />
            <img
              src={info.logoUrl}
              alt={info.name}
              className={`relative z-10 ${
                group === "PALE TULLE"
                  ? "h-20 sm:h-28"
                  : "h-14 sm:h-20"
              } w-auto object-contain`}
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                const next = el.nextElementSibling as HTMLElement | null;
                if (next) next.style.display = "block";
              }}
            />
            <h3
              className="hidden text-2xl sm:text-3xl text-mist font-bold tracking-wide"
              aria-hidden="true"
            >
              {info.name}
            </h3>
          </div>
        ) : (
          <h3 className="text-2xl sm:text-3xl text-mist font-bold tracking-wide">
            {info.name}
          </h3>
        )}
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
        <div className="text-center mt-10 sm:mt-14 mb-4 sm:mb-5">
          <span className="inline-block rounded-full border border-gold/40 bg-gold/15 text-gold px-4 py-1.5 text-[11px] sm:text-xs tracking-[0.2em] backdrop-blur-sm">
            はじめて知ってくれたあなたへ
          </span>
        </div>
        <h2
          className="text-center text-3xl sm:text-5xl mb-8 sm:mb-10 italic font-bold tracking-wide leading-tight"
          style={{
            fontFamily: '"Zen Maru Gothic", system-ui, sans-serif',
            color: "transparent",
            WebkitTextStroke: "1.3px #e9e6f0",
          }}
        >
          わたしたちについて
        </h2>
        <p className="text-center text-mist/85 text-base sm:text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
          「<strong className="font-bold text-mist">PALE TULLE</strong>」と「
          <strong className="font-bold text-mist">Glitter System</strong>」からなる
          <br />
          ライブ配信から生まれたアイドルプロジェクト
          <br />
          「321 IDOL PROJECT」
          <br />
          ライバーとして、日々みんなと
          <br />
          配信でつながりながら、アイドル活動も全力で！
          <br />
          応援してくれるあなたと一緒に、
          <br />
          <span className="text-glow font-bold">ライバー × アイドルの伝説</span>
          を作りたい！
        </p>

        <GroupBlock group="PALE TULLE" onOpen={setOpen} />
        <GroupBlock group="Glitter System" onOpen={setOpen} />
      </div>

      {open && <MemberModal member={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
