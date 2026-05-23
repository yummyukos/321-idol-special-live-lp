"use client";

import { motion } from "framer-motion";

const STANZAS: string[][] = [
  [
    "私たちにとって、人生で最大規模のワンマン。",
    "本当に、ここに立てるのかな。",
    "無謀すぎる挑戦だって、わかってる。",
  ],
  ["けど――"],
  [
    "配信画面から飛び出して、",
    "はじめてステージに立ったあの日から",
    "ずっと応援してくれていたあなたの顔を、",
    "大きな景色のなかで、見たかったから。",
  ],
  [
    "7月13日。",
    "一生忘れられない景色を",
    "いっしょに見られたら嬉しいな！",
  ],
];

export default function Message() {
  return (
    <section className="relative section-pad bg-ink overflow-hidden">
      {/* キラキラ装飾：金色の小さな星をちりばめる */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {SPARKLE_POSITIONS.map((pos, i) => (
          <span
            key={i}
            className="message-sparkle"
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: `${pos.delay}s`,
              fontSize: pos.size,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* うっすらしたゴールドのグロー */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-glow/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-14">
          MESSAGE
        </p>

        <div className="message-mincho text-mist space-y-10 sm:space-y-12 text-[16px] sm:text-[21px] leading-[2.1] text-center">
          {STANZAS.map((stanza, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1.2,
                delay: i * 0.18,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              {stanza.map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// キラキラ装飾の位置設定
const SPARKLE_POSITIONS = [
  { top: "8%", left: "10%", delay: 0, size: "1.2rem" },
  { top: "15%", left: "85%", delay: 1.2, size: "0.8rem" },
  { top: "25%", left: "5%", delay: 2.4, size: "0.9rem" },
  { top: "35%", left: "92%", delay: 0.6, size: "1.1rem" },
  { top: "48%", left: "15%", delay: 1.8, size: "0.7rem" },
  { top: "55%", left: "88%", delay: 3.0, size: "1rem" },
  { top: "68%", left: "8%", delay: 0.9, size: "0.85rem" },
  { top: "75%", left: "90%", delay: 2.1, size: "1.2rem" },
  { top: "85%", left: "20%", delay: 1.5, size: "0.9rem" },
  { top: "92%", left: "80%", delay: 0.3, size: "0.8rem" },
];
