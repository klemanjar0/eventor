"use server";

import { cookies } from "next/headers";

export async function clearAuthCookies() {
  const c = await cookies();
  if (c.has("access_token")) {
    c.delete("access_token");
  }
  if (c.has("refresh_token")) {
    c.delete("refresh_token");
  }
}

export async function hasRefreshToken(): Promise<boolean> {
  const c = await cookies();
  return c.has("refresh_token") && !!c.get("refresh_token")?.value;
}
