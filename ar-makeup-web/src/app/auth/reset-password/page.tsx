"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import AuthShell from "@/src/components/layout/AuthShell";
import { supabase } from "@/src/lib/supabase/client";

function ResetPasswordContent() {
  const router = useRouter();
  const sp = useSearchParams();
  
  // Supabase native flow me 'code' parameter bhejta hai (PKCE)
  const code = sp.get("code");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
  const verifyAndExchangeCode = async () => {
    try {
      if (code) {
        // 1. PKCE Flow: URL ke 'code' ko Supabase session se exchange karo
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
          console.error("Exchange error:", error.message);
          setMsg("Link expire ho chuka hai ya invalid hai. Naya link mangwayein.");
          setChecking(false);
          return;
        }
        
        // Agar exchange successful raha, toh session ban gaya!
        setChecking(false);
      } else {
        // 2. Fallback: Agar pehle se session maujood hai
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setChecking(false);
        } else {
          setMsg("Auth session missing! Please request a new password reset.");
          setChecking(false);
        }
      }
    } catch (err) {
      console.error("Error in session verification:", err);
      setMsg("Something went wrong. Please try again.");
      setChecking(false);
    }
  };

  verifyAndExchangeCode();
}, [code]);
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setMsg("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      // ✅ Kisi API Route ki zaroorat nahi, Supabase Client seedha login user ka password update kar dega
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      setLoading(false);

      if (error) {
        setMsg(error.message || "Failed to reset password");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/auth/sign-in?resetSuccess=true");
      }, 2500);
    } catch (err) {
      setLoading(false);
      setMsg("An error occurred. Please try again.");
      console.error("Reset password error:", err);
    }
  }

  if (checking) {
    return (
      <AuthShell title="Reset password" subtitle="Verifying your reset link...">
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-[#C06C84]" />
        </div>
      </AuthShell>
    );
  }

  if (msg && !success && password === "") {
    return (
      <AuthShell title="Reset password" subtitle="There's an issue with your reset link.">
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#C06C84]/25 bg-[#F4C2C2]/25 px-4 py-3 text-sm text-[#2A2A2A]">
            {msg}
          </div>

          <Link
            href="/auth/forgot-password"
            className="block rounded-2xl bg-[#C06C84] px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-[#C06C84]/15 transition hover:opacity-95"
          >
            Request new reset link
          </Link>

          <div className="flex items-center justify-between text-sm">
            <Link href="/auth/sign-in" className="text-black/60 hover:text-[#C06C84] hover:underline transition-colors">
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Create new password" subtitle="Enter a strong password to secure your account.">
      {!success ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-black/70 mb-1">New password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/35 shadow-sm focus:border-[#C06C84]/50 focus:ring-4 focus:ring-[#F4C2C2]/35"
              style={{ WebkitTextFillColor: "#000", WebkitBoxShadow: "0 0 0 1000px #fff inset" }}
              required
            />
            <p className="mt-1.5 text-xs text-black/50">Use at least 8 characters.</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-black/70 mb-1">Confirm password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/35 shadow-sm focus:border-[#C06C84]/50 focus:ring-4 focus:ring-[#F4C2C2]/35"
              style={{ WebkitTextFillColor: "#000", WebkitBoxShadow: "0 0 0 1000px #fff inset" }}
              required
            />
          </div>

          {msg && (
            <div className="rounded-2xl border border-[#C06C84]/25 bg-[#F4C2C2]/25 px-4 py-3 text-sm text-[#2A2A2A]">
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#C06C84] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#C06C84]/15 transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Resetting…" : "Reset password"}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-4 text-sm text-black/70">
            ✅ Password reset successful! You can now sign in with your new password.
          </div>

          <button
            type="button"
            onClick={() => router.push("/auth/sign-in")}
            className="w-full rounded-2xl bg-[#C06C84] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Go to sign in
          </button>
        </div>
      )}
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Reset password" subtitle="Verifying your reset link...">
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-[#C06C84]" />
          </div>
        </AuthShell>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}