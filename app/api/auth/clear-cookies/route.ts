import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const c = await cookies();

  if (c.has("access_token")) {
    c.delete("access_token");
  }
  if (c.has("refresh_token")) {
    c.delete("refresh_token");
  }

  return NextResponse.json({ success: true });
}
