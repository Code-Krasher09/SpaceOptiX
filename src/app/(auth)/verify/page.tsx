"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >(token ? "loading" : "idle");
  const [message, setMessage] = useState<string>(
    token ? "Verifying your email..." : "Waiting for verification token.",
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    let active = true;

    async function verify() {
      try {
        const response = await fetch(`/api/auth/verify?token=${token}`);
        const data = await response.json();

        if (!active) {
          return;
        }

        if (!response.ok) {
          setStatus("error");
          setMessage(data?.error?.message ?? "Verification failed");
          return;
        }

        setStatus("success");
        setMessage("Email verified. You can now sign in.");
      } catch {
        if (!active) {
          return;
        }
        setStatus("error");
        setMessage("Verification failed. Please try again.");
      }
    }

    verify();

    return () => {
      active = false;
    };
  }, [token]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Mail className="h-3.5 w-3.5" />
          Verification
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight">
          Verify your email
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Check your inbox for a verification link. Once verified, you can sign
          in.
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
        {status === "success" && <CheckCircle2 className="h-4 w-4" />}
        {status === "error" && <XCircle className="h-4 w-4" />}
        {message}
      </div>
      <div className="text-sm text-slate-400">
        Back to{" "}
        <Link href="/login" className="text-blue-400 hover:text-blue-300">
          Sign in
        </Link>
      </div>
    </div>
  );
}
