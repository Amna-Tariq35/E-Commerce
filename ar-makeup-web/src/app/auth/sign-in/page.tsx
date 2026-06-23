"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import AuthShell from "@/src/components/layout/AuthShell";
import { supabase } from "@/src/lib/supabase/client";

// ─── Admin email (FYP: hardcoded for demo; replace with role-based check in production) ───
const ADMIN_EMAIL = "admin@makeup.com";

// 1. Saara logic aur UI ek naye component me daal diya
function SignInFormContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    // Route admin users to the admin dashboard, everyone else to their intended destination.
    if (data.user?.email === ADMIN_EMAIL) {
      router.push("/admin");
    } else {
      router.push(next);
    }
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Access your saved looks and manage your cart."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-black/70 mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/35 shadow-sm focus:border-[#C06C84]/50 focus:ring-4 focus:ring-[#F4C2C2]/35"
            style={{ WebkitTextFillColor: "#000", WebkitBoxShadow: "0 0 0 1000px #fff inset" }}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-black/70 mb-1">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/35 shadow-sm focus:border-[#C06C84]/50 focus:ring-4 focus:ring-[#F4C2C2]/35"
            style={{ WebkitTextFillColor: "#000", WebkitBoxShadow: "0 0 0 1000px #fff inset" }}
            required
          />
        </div>

        {/* Error message */}
        {msg && (
          <div className="rounded-2xl border border-[#C06C84]/25 bg-[#F4C2C2]/25 px-4 py-3 text-sm text-[#2A2A2A]">
            {msg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[#C06C84] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#C06C84]/15 transition hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <div className="flex items-center justify-between text-sm">
          <Link
            href="/auth/forgot-password"
            className="text-black/60 hover:text-[#C06C84] hover:underline transition-colors"
          >
            Forgot password?
          </Link>
          <Link
            href={`/auth/sign-up?next=${encodeURIComponent(next)}`}
            className="font-semibold text-[#C06C84] hover:underline"
          >
            Create account
          </Link>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <Link
            href="/"
            className="text-black/60 hover:text-[#C06C84] hover:underline transition-colors"
          >
            Back to home
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

// 2. Main Page component jisme Suspense boundary hai
export default function SignInPage() {
  return (
    <Suspense 
      fallback={
        <AuthShell title="Sign in" subtitle="Loading...">
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-[#C06C84]" />
          </div>
        </AuthShell>
      }
    >
      <SignInFormContent />
    </Suspense>
  );
}