// AIチャットAPI（Claude Haiku 4.5 を呼び出し）
// POST /api/chat
//   body: { messages: [{role: "user"|"assistant", content: string}, ...] }
//   res:  { reply: string }

import { NextResponse } from "next/server";
import { buildChatbotSystemPrompt } from "@/lib/chatbot-context";

// 動的レンダリング（毎回最新のシステムプロンプトを生成）
export const dynamic = "force-dynamic";
export const runtime = "edge";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 1024;
const MAX_MESSAGES_PER_CONVO = 30; // 1会話あたりのmessage上限（暴走防止）

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. ANTHROPIC_API_KEY を設定してください。" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as { messages?: Msg[] };
    const messages = body.messages ?? [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    if (messages.length > MAX_MESSAGES_PER_CONVO) {
      return NextResponse.json(
        { reply: "会話が長くなりすぎました。一度リロードして、また話しかけてくださいね♪" },
        { status: 200 }
      );
    }

    // ユーザーメッセージの最大長制限
    const sanitized = messages.map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 500), // 500文字まで
    }));

    const systemPrompt = buildChatbotSystemPrompt();

    const apiRes = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: systemPrompt,
        messages: sanitized,
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error("Anthropic API error:", apiRes.status, errText);
      return NextResponse.json(
        {
          reply:
            "申し訳ありません、ただいま接続が混み合っています。少し時間をおいてもう一度お試しくださいね🙏",
        },
        { status: 200 }
      );
    }

    const data = (await apiRes.json()) as {
      content?: { type: string; text: string }[];
    };
    const reply =
      data.content
        ?.filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("\n") ?? "（応答を取得できませんでした）";

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Chat route error:", e);
    return NextResponse.json(
      {
        reply:
          "申し訳ありません、エラーが発生しました。少し時間をおいてもう一度お試しください🙏",
      },
      { status: 200 }
    );
  }
}
