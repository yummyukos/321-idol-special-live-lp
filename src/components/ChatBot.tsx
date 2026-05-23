"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LINE風チャットUI
 * ハンバーガーメニュー経由で開く（layout.tsx で window.event でトリガー）
 */

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED_QUESTIONS = [
  "招待特典について教えて",
  "達成特典って何？",
  "公演はいつ？どこ？",
  "特典会の時間は？",
];

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "こんにちは♪\n321 IDOL PROJECT Special LIVEについて何でも案内します。\n\n気になることをタップするか、自由に質問してくださいね！",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // window.open-chatbot イベントをリッスン（ハンバーガーメニューから）
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chatbot", handler);
    return () => window.removeEventListener("open-chatbot", handler);
  }, []);

  // 開いている時はbody scrollを止める
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESCで閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // メッセージが追加されたら一番下にスクロール
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const newMessages: Msg[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          // 初回greetingはAPIには送らない（システムプロンプト側で完結させる）
          messages: newMessages.slice(1),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ??
        "申し訳ありません、応答を取得できませんでした。少し時間をおいてもう一度お試しください🙏";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "申し訳ありません、ネットワークエラーが発生しました。少し時間をおいて再度お試しください🙏",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* オーバーレイ全画面 */}
      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* 背景：暗いオーバーレイ（クリックで閉じる） */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* チャットウィンドウ */}
        <div
          className={`absolute inset-x-0 bottom-0 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[400px] h-[90vh] sm:h-[640px] sm:max-h-[80vh] bg-white rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl transition-transform duration-300 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ヘッダー */}
          <header className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-glow via-glow2 to-gold rounded-t-3xl">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current text-ink"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L1 23l6.71-1.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.36 0-2.66-.35-3.82-.95l-2.62.76.76-2.62C5.35 16.66 5 15.36 5 14c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-mincho text-ink font-semibold text-sm leading-tight">
                  AIチャット
                </p>
                <p className="text-ink/60 text-[10px] leading-tight">
                  321 IDOL PROJECT 公式
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="チャットを閉じる"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current text-ink"
                aria-hidden="true"
              >
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </header>

          {/* メッセージ一覧（スクロール可） */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 bg-[#f5f4f6]"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap break-words ${
                      m.role === "user"
                        ? "bg-glow text-white rounded-tr-sm"
                        : "bg-white text-ink rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="typing-dot" />
                      <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
                      <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* おすすめ質問（初回のみ表示） */}
              {messages.length === 1 && !loading && (
                <div className="pt-2 space-y-2">
                  <p className="text-center text-[11px] text-mist-700 text-ink/60">
                    ▼ よくある質問
                  </p>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left px-3.5 py-2.5 rounded-2xl bg-white border border-glow/30 text-ink text-[13px] hover:bg-glow/5 transition-colors shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 入力エリア */}
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 px-3 py-3 bg-white border-t border-gray-200"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="メッセージを入力..."
              rows={1}
              maxLength={500}
              disabled={loading}
              className="flex-1 resize-none rounded-2xl border border-gray-200 px-3.5 py-2.5 text-[14px] text-ink placeholder-gray-400 focus:outline-none focus:border-glow/50 disabled:bg-gray-50 max-h-24"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="送信"
              className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-glow to-glow2 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 disabled:hover:scale-100"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                aria-hidden="true"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
