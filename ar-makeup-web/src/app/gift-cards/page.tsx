import Link from "next/link";

export default function GiftCardsPage() {
  const amounts = ["$25", "$50", "$100", "$150", "$200", "Custom"];

  const features = [
    {
      label: "Instant Delivery",
      value: "By email",
      desc: "Your recipient gets their gift card instantly — no waiting, no wrapping.",
    },
    {
      label: "Flexible Amounts",
      value: "$25 – $200",
      desc: "Pick a preset amount or enter a custom value that feels just right.",
    },
    {
      label: "Shop Anything",
      value: "Full catalog",
      desc: "Redeemable on every single product across our entire collection.",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#B65C7A]/20 bg-[#B65C7A]/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest text-[#B65C7A] uppercase">
            Gift Cards
          </span>
          <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-[#1a0e13] sm:text-5xl">
            The gift of{" "}
            <span className="italic text-[#B65C7A]">beauty.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
            Perfect for birthdays, celebrations, or anytime someone deserves a little extra glow.
          </p>
        </div>

        {/* Amount picker */}
        <div className="mb-8 rounded-[22px] border border-[var(--border-soft)] bg-[var(--bg-section)] p-8 shadow-sm">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Choose an amount
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {amounts.map((a, i) => (
              <button
                key={a}
                className={[
                  "rounded-2xl border py-3 text-[13px] font-bold transition hover:border-[#B65C7A]/40 hover:bg-[#B65C7A]/5",
                  i === 1
                    ? "border-[#B65C7A] bg-[#B65C7A]/8 text-[#B65C7A]"
                    : "border-[var(--border-soft)] bg-white/70 text-[#1a0e13]",
                ].join(" ")}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Recipient's email address"
              className="w-full rounded-xl border border-[var(--border-soft)] bg-white/80 px-4 py-3 text-sm text-[#1a0e13] placeholder:text-[var(--text-muted)] outline-none transition focus:border-[#B65C7A]/40 focus:ring-2 focus:ring-[#B65C7A]/10"
            />
            <button
              className="shrink-0 rounded-xl px-7 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              style={{ background: "var(--rose-primary)" }}
            >
              Send Gift Card
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.label}
              className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--bg-section)] p-6 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {f.label}
              </p>
              <p className="mt-3 text-[17px] font-bold text-[#B65C7A]">{f.value}</p>
              <div className="my-4 h-px bg-[var(--border-soft)]" />
              <p className="text-[12.5px] leading-6 text-[var(--text-muted)]">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mb-8 rounded-[20px] border border-[#B65C7A]/15 bg-gradient-to-br from-[#FDF0F4] to-[#FBF7F4] p-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#B65C7A]">How it works</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8">
            {[
              "Pick an amount above or enter a custom value.",
              "Enter the recipient's email and hit Send.",
              "They redeem it at checkout on any product.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B65C7A]/15 text-[11px] font-bold text-[#B65C7A]">
                  {i + 1}
                </span>
                <p className="text-[13px] leading-6 text-[var(--text-muted)]">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-[20px] border border-[var(--border-soft)] bg-[var(--bg-section)] p-6 sm:flex-row sm:items-center">
          <p className="text-sm text-[var(--text-muted)]">
            Not sure what to gift? Let them pick their favorite shades themselves.
          </p>
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
            style={{ background: "var(--rose-primary)" }}
          >
            Browse Products
          </Link>
        </div>

      </div>
    </main>
  );
}