"use client";

import Link from "next/link";
import { useAuth } from "@/features/auth";

export default function Navbar() {
  const auth = useAuth();

  const isAuthenticated = auth.user !== null;
  const user = isAuthenticated ? auth.user?.id : null;

  return (
    <nav className="w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold text-zinc-900 dark:text-zinc-50"
        >
          Eventor
        </Link>

        <div className="flex items-center gap-4">
          <span>User ID: ${user}</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
