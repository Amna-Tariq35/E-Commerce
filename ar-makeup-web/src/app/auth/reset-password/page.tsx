"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import AuthShell from "@/src/components/layout/AuthShell";

// 1. Saara state logic aur UI ab is main content component ke andar hai
function ResetPasswordContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const token = sp.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if we have a valid reset token
    if (token) {
      setValidToken(true);
      setChecking(false);
    } else {
      setMsg("Invalid or missing reset link. Please request a new password reset.");
      setChecking(false);
    }
  }, [token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!token) {
      setMsg("Reset link is missing. Please request a new one.");
      return;
    }

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setMsg("Password must be at least 8 characters");
      return;
    }

    loading && setLoading(true);

    try {
      // Call API to reset password with token validation
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      setLoading(false);

      if (!response.ok) {
        setMsg(data.error || "Failed to reset password");
        return;
      }

      setSuccess(true);
      // Redirect to sign in after 2 seconds
      setTimeout(() => {
        router.push("/auth/sign-in?resetSuccess=true");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setMsg("An error occurred. Please try again.");
      console.error("Reset password error:", err);
    }
  }

  if (checking) {
    return (
      <AuthShell
        title="Reset password"
        subtitle="Verifying your reset link..."
      >
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-[#C06C84]" />
        </div>
      </AuthShell>
    );
  }

  if (!validToken) {
    return (
      <AuthShell
        title="Reset password"
        subtitle="There's an issue with your reset link."
      >
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
            <Link
              href="/auth/sign-in"
              className="text-black/60 hover:text-[#C06C84] hover:underline transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create new password"
      subtitle="Enter a strong password to secure your account."
    >
      {!success ? (
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-black/70 mb-1">
              New password
            </label>
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
            <p className="mt-1.5 text-xs text-black/50">
              Use at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-black/70 mb-1">
              Confirm password
            </label>
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

          <div className="flex items-center justify-between text-sm">
            <Link
              href="/auth/sign-in"
              className="text-black/60 hover:text-[#C06C84] hover:underline transition-colors"
            >
              Back to sign in
            </Link>
          </div>
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

          <p className="text-xs text-black/50 text-center">
            Your password has been securely updated.
          </p>
        </div>
      )}
    </AuthShell>
  );
}

// 2. Main Page component jo build ke time client-side hooks ko safely handle karega
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