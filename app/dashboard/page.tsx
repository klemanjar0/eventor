"use client";

import { useAuth } from "@/features/auth/context";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Eventor Dashboard
          </h1>
          <button
            onClick={logout}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-800">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Welcome, {user?.email}!
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            This is your dashboard. Content will be added here.
          </p>
        </div>
      </main>
    </div>
  );
}
