import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { provider, messages } = await request.json();

  const headers = {
    Authorization: `Bearer ${process.env.EDEN_AI_API_KEY}`,
    "Content-Type": "application/json",
  };
  const url = "https://api.edenai.run/v2/multimodal/chat";
  const body = JSON.stringify({
    providers: [provider],
    messages: messages,
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch AI response" },
      { status: 500 },
    );
  }

  const result = await response.json();
  const res = {
    role: "assistant",
    content: result[provider]?.generated_text || "No Response",
  };

  return NextResponse.json(res);
}
