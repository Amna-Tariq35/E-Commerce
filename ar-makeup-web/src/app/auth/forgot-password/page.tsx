// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import AuthShell from "@/src/components/layout/AuthShell";
// import { supabase } from "@/src/lib/supabase/client";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setMsg(null);
//     setLoading(true);

//     try {
//       const response = await fetch("/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       setLoading(false);

//       if (!response.ok) {
//         setMsg(data.error || "Failed to send reset link");
//         return;
//       }

//       setSuccess(true);
//     } catch (err) {
//       setLoading(false);
//       setMsg("An error occurred. Please try again.");
//       console.error("Forgot password error:", err);
//     }
//   }

//   return (
//     <AuthShell
//       title="Reset password"
//       subtitle="Enter your email and we’ll send a secure reset link."
//     >
//       {!success ? (
//         <form onSubmit={onSubmit} className="space-y-4">
//           <div>
//             <label className="block text-xs font-medium text-black/70 mb-1">
//               Email
//             </label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               autoComplete="email"
//               placeholder="you@example.com"
//               className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-black/35 shadow-sm focus:border-[#C06C84]/50 focus:ring-4 focus:ring-[#F4C2C2]/35"
//               style={{ WebkitTextFillColor: "#000", WebkitBoxShadow: "0 0 0 1000px #fff inset" }}
//               required
//             />
//           </div>

//           {msg && (
//             <div className="rounded-2xl border border-[#C06C84]/25 bg-[#F4C2C2]/25 px-4 py-3 text-sm text-[#2A2A2A]">
//               {msg}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-2xl bg-[#C06C84] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#C06C84]/15 transition hover:opacity-95 disabled:opacity-60"
//           >
//             {loading ? "Sending link…" : "Send reset link"}
//           </button>

//           <div className="flex items-center justify-between text-sm">
//             <Link
//               href="/auth/sign-in"
//               className="text-black/60 hover:text-[#C06C84] hover:underline transition-colors"
//             >
//               Back to sign in
//             </Link>
//             <Link
//               href="/auth/sign-up"
//               className="font-semibold text-[#C06C84] hover:underline"
//             >
//               Create account
//             </Link>
//           </div>

//           <p className="text-xs text-black/50">
//             If an account exists for this email, we’ll send a reset link. Check your inbox and spam folder.
//           </p>
//         </form>
//       ) : (
//         <div className="space-y-4">
//           <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-4 text-sm text-black/70">
//             ✅ If your account exists, a password reset email has been sent. Follow the link to reset your password.
//           </div>

//           <button
//             type="button"
//             onClick={() => window.location.assign("/auth/sign-in")}
//             className="w-full rounded-2xl bg-[#C06C84] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
//           >
//             Return to sign in
//           </button>
//         </div>
//       )}
//     </AuthShell>
//   );
// }




"use client";

import Link from "next/link";
import { useState } from "react";
import AuthShell from "@/src/components/layout/AuthShell";
import { supabase } from "@/src/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      // Supabase ka built-in method bina kisi backend API route aur Resend ke chalega
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      setLoading(false);

      if (error) {
        setMsg(error.message || "Failed to send reset link");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setLoading(false);
      setMsg("An error occurred. Please try again.");
      console.error("Forgot password error:", err);
    }
  }

  return (
    <AuthShell
      title="Reset password"
      subtitle="Enter your email and we’ll send a secure reset link."
    >
      {!success ? (
        <form onSubmit={onSubmit} className="space-y-4">
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
            {loading ? "Sending link…" : "Send reset link"}
          </button>

          <div className="flex items-center justify-between text-sm">
            <Link
              href="/auth/sign-in"
              className="text-black/60 hover:text-[#C06C84] hover:underline transition-colors"
            >
              Back to sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className="font-semibold text-[#C06C84] hover:underline"
            >
              Create account
            </Link>
          </div>

          <p className="text-xs text-black/50">
            If an account exists for this email, we’ll send a reset link. Check your inbox and spam folder.
          </p>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-4 text-sm text-black/70">
            ✅ If your account exists, a password reset email has been sent. Follow the link to reset your password.
          </div>

          <button
            type="button"
            onClick={() => window.location.assign("/auth/sign-in")}
            className="w-full rounded-2xl bg-[#C06C84] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Return to sign in
          </button>
        </div>
      )}
    </AuthShell>
  );
}