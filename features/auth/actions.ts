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
