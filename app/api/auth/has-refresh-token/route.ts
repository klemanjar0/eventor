import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const c = await cookies();
  const hasToken = c.has("refresh_token") && !!c.get("refresh_token")?.value;

  return NextResponse.json({ hasToken });
}
