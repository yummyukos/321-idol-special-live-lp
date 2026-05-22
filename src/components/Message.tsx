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
    "2026年7月13日。",
    "一生忘れられない景色を",
    "いっしょに見られたら嬉しいな！",
  ],
];

export default function Message() {
  return (
    <section className="relative section-pad bg-ink">
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-gold/80 mb-14">
          MESSAGE
        </p>

        <div className="message-mincho text-mist space-y-10 sm:space-y-12 text-[17px] sm:text-[22px] leading-[2.1] text-center">
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
