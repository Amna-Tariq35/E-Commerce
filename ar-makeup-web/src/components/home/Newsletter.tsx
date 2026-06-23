"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubscribe() {
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  return (
    <section className="mt-10 rounded-[22px] border border-black/8 bg-white/65 p-6 backdrop-blur sm:p-8">
      <h3 className="text-[15px] font-medium text-[#1a0e13]">
        Get exclusive offers
      </h3>
      <p className="mt-1 text-xs font-light text-[#7a5a65]">
        Subscribe to our newsletter for early access to sales, new arrivals, and member-only discounts.
      </p>

      {submitted ? (
        <p className="mt-5 text-sm font-medium text-[#B65C7A]">
          You're subscribed! Welcome to the family 🎉
        </p>
      ) : (
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full rounded-2xl border border-black/8 bg-white/80 px-4 py-3 text-sm font-light text-[#1a0e13] placeholder:text-black/30 outline-none transition focus:border-[#B65C7A]/40 focus:ring-2 focus:ring-[#B65C7A]/10"
          />
          <button
            type="button"
            onClick={onSubscribe}
            className="shrink-0 rounded-2xl bg-[#B65C7A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A94E6C]"
          >
            Subscribe
          </button>
        </div>
      )}
    </section>
  );
}