import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08060f",
        velvet: "#13091f",
        glow: "#ff3aa1",
        glow2: "#7c5cff",
        gold: "#f5d27a",
        mist: "#e9e4f5",
      },
      fontFamily: {
        // 本文（和文ゴシック）
        sans: ['"Zen Kaku Gothic New"', "Hiragino Sans", "Noto Sans JP", "sans-serif"],
        // 見出し（和文明朝＋欧文セリフを併用）
        display: ['"DM Serif Display"', '"Shippori Mincho B1"', "Hiragino Mincho ProN", "serif"],
        // 和文専用見出し
        mincho: ['"Shippori Mincho B1"', "Hiragino Mincho ProN", "serif"],
        // 欧文専用見出し
        serif: ['"DM Serif Display"', "Playfair Display", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
