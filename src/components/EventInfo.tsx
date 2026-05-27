"use client";

import { EVENT, TICKETS } from "@/lib/event";

export default function EventInfo() {
  const items = [
    {
      label: "日程",
      value: (
        <>
          {EVENT.date}
          <span className="block mt-0.5">{EVENT.doorsLabel}</span>
        </>
      ),
    },
    {
      label: "会場",
      value: (
        <>
          {EVENT.venueName}
          <span className="block text-xs text-mist/50 mt-0.5">
            {EVENT.venueNote}
          </span>
        </>
      ),
    },
    {
      label: "出演",
      value: EVENT.performers.join(" / "),
    },
    {
      label: "特典会",
      value: (
        <>
          ライブ前 {EVENT.meetGreet.before}
          <span className="block">終演後 {EVENT.meetGreet.after}</span>
        </>
      ),
    },
    {
      label: "席種",
      value: (
        <>
          <span>アリーナ席</span>
          <span className="block mt-1">バルコニー席</span>
        </>
      ),
    },
  ];

  return (
    <section id="info" className="section-pad bg-ink">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
          INFORMATION
        </p>
        <h2 className="text-center font-display text-3xl sm:text-4xl text-mist mb-10">
          公演情報
        </h2>

        <dl className="divide-y divide-white/10 border-y border-white/10">
          {items.map((it) => (
            <div
              key={it.label}
              className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-4 sm:py-5"
            >
              <dt className="text-xs sm:text-sm tracking-[0.2em] text-gold/70 pt-1">
                {it.label}
              </dt>
              <dd className="text-mist text-sm sm:text-base leading-relaxed">
                {it.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
