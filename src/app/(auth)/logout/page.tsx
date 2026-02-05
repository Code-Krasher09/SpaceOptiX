"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";

export default function LogoutPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("Click below to sign out.");

  async function handleLogout() {
    setStatus("loading");
    setMessage("Signing you out...");

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data?.error?.message ?? "Logout failed.");
        return;
      }

      setStatus("success");
      setMessage("You have been signed out successfully.");
    } catch {
      setStatus("error");
      setMessage("Logout failed. Please try again.");
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <LogOut className="h-3.5 w-3.5" />
          Session
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">Sign out</h2>
        <p className="mt-1 text-sm text-slate-400">
          End your current session securely.
        </p>
      </div>

      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
          status === "success"
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
            : status === "error"
              ? "border-red-500/40 bg-red-500/10 text-red-300"
              : "border-slate-700/50 bg-slate-800/50 text-slate-300"
        }`}
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {message}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="relative w-full rounded-xl bg-linear-to-r from-blue-600 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={status === "loading"}
      >
        <span className={status === "loading" ? "opacity-0" : "opacity-100"}>
          Sign out
        </span>
        {status === "loading" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
          </span>
        )}
      </button>

      <div className="text-sm text-slate-400">
        Back to{" "}
        <Link href="/login" className="text-blue-400 hover:text-blue-300">
          Sign in
        </Link>
      </div>
    </div>
  );
}
