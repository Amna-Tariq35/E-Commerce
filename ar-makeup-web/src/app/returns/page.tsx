export default function ReturnsPage() {
  const steps = [
    { n: "01", text: "Open your order from My Orders and select the item you want to return." },
    { n: "02", text: "Choose return or exchange and print the pre-paid shipping label." },
    { n: "03", text: "Pack the product securely and drop it off at any courier point." },
    { n: "04", text: "Once received, your refund is processed within 3–5 business days." },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#B65C7A]/20 bg-[#B65C7A]/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest text-[#B65C7A] uppercase">
            Returns & Exchanges
          </span>
          <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-[#1a0e13] sm:text-5xl">
            Hassle-free returns,{" "}
            <span className="italic text-[#B65C7A]">always.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
            Not in love with your order? Return it within 30 days — no questions asked.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-8 rounded-[24px] border border-[var(--border-soft)] bg-[var(--bg-section)] p-8 shadow-sm">
          <h2 className="mb-6 text-[11px] font-bold tracking-widest text-[var(--text-muted)] uppercase">
            How it works
          </h2>
          <div className="flex flex-col gap-5">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-start gap-5">
                {/* Number + connector */}
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#B65C7A]/10 text-[12px] font-bold text-[#B65C7A]">
                    {s.n}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-1 h-6 w-px bg-[#B65C7A]/15" />
                  )}
                </div>
                <p className="pt-1.5 text-sm leading-6 text-[var(--text-main)]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Policy pills */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Return window", value: "30 days" },
            { label: "Refund time", value: "3–5 days" },
            { label: "Shipping", value: "Pre-paid label" },
            { label: "Condition", value: "Unopened items" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-section)] p-4 text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                {item.label}
              </p>
              <p className="mt-1.5 text-[15px] font-bold text-[#B65C7A]">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Contact card */}
        <div className="rounded-[24px] border border-[#B65C7A]/20 bg-gradient-to-br from-[#FDF0F4] to-[#FBF7F4] p-8">
          <h2 className="text-lg font-semibold text-[#1a0e13]">Need help with a return?</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
            Our support team is available 7 days a week to walk you through the process.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 rounded-2xl bg-white/80 px-5 py-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Email</p>
              <p className="mt-1 text-sm font-semibold text-[#1a0e13]">support@lumiere.com</p>
            </div>
            <div className="flex-1 rounded-2xl bg-white/80 px-5 py-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Hours</p>
              <p className="mt-1 text-sm font-semibold text-[#1a0e13]">Mon – Sun, 9 am – 9 pm</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}