import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "portfolio-studio-demo",
    timestamp: new Date().toISOString()
  });
}
