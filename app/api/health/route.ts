import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: "ok",
    environment: {
      deepseekConfigured: !!process.env.DEEPSEEK_API_KEY,
      openaiConfigured: !!process.env.OPENAI_API_KEY,
      nodeEnv: process.env.NODE_ENV,
    },
    timestamp: new Date().toISOString(),
  });
}

