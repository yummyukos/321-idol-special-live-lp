"use client";

import { EVENT } from "@/lib/event";

export default function Access() {
  return (
    <section id="access" className="section-pad bg-velvet/40">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-2">
          ACCESS
        </p>
        <h2 className="text-center font-display text-3xl sm:text-4xl text-mist mb-10">
          会場アクセス
        </h2>

        <div className="rounded-2xl border border-white/10 bg-velvet/60 p-7">
          <h3 className="font-display text-2xl text-mist mb-1">
            {EVENT.venueName}
          </h3>
          <p className="text-xs text-mist/60 mb-4">{EVENT.venueNote}</p>
          <p className="text-sm text-mist mb-5">{EVENT.venueAddress}</p>

          <ul className="space-y-2 mb-6">
            {EVENT.accessNotes.map((n, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-mist/80"
              >
                <span className="mt-1.5 inline-block h-1 w-1 rounded-full bg-gold" />
                <span>{n}</span>
              </li>
            ))}
          </ul>

          <a
            href={EVENT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-white/20 bg-white/5 text-mist hover:bg-white/10 transition-colors"
          >
            Googleマップで開く
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
