export default function SupportPage() {
  const faqs = [
    { q: "Where is my order?", a: "Track your order anytime from My Orders. You'll also receive a tracking link via email once it ships." },
    { q: "How do I return an item?", a: "Open the order in My Orders, select the item, and follow the return steps. Pre-paid label included." },
    { q: "Can I change my shipping address?", a: "Contact us before your order ships and we'll update the address right away." },
    { q: "How long do refunds take?", a: "Refunds are processed within 3–5 business days after we receive your return." },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#B65C7A]/20 bg-[#B65C7A]/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest text-[#B65C7A] uppercase">
            Customer Support
          </span>
          <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-[#1a0e13] sm:text-5xl">
            We're here to{" "}
            <span className="italic text-[#B65C7A]">help.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
            Questions about your order, a return, or anything else — our team responds within 24 hours.
          </p>
        </div>

        {/* Contact cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--bg-section)] p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Email us</p>
            <p className="mt-3 text-[17px] font-bold text-[#1a0e13]">support@lumiere.com</p>
            <p className="mt-1 text-[12px] text-[var(--text-muted)]">We reply within 24 hours</p>
            <div className="my-4 h-px bg-[var(--border-soft)]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Call us</p>
            <p className="mt-3 text-[17px] font-bold text-[#1a0e13]">+1 (555) 123-4567</p>
            <p className="mt-1 text-[12px] text-[var(--text-muted)]">Mon – Sun, 9 am – 9 pm</p>
          </div>

          <div className="rounded-[22px] border border-[#B65C7A]/15 bg-gradient-to-br from-[#FDF0F4] to-[#FBF7F4] p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#B65C7A]">Response time</p>
            <p className="mt-3 text-[17px] font-bold text-[#1a0e13]">Under 24 hours</p>
            <p className="mt-1 text-[12px] text-[var(--text-muted)]">Average reply time is 4–6 hours</p>
            <div className="my-4 h-px bg-[#B65C7A]/10" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#B65C7A]">Availability</p>
            <p className="mt-3 text-[17px] font-bold text-[#1a0e13]">7 days a week</p>
            <p className="mt-1 text-[12px] text-[var(--text-muted)]">Including weekends & holidays</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--bg-section)] p-8 shadow-sm">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Common Questions
          </p>
          <div className="flex flex-col gap-5">
            {faqs.map((faq, i) => (
              <div key={i}>
                <p className="text-[14px] font-semibold text-[#1a0e13]">{faq.q}</p>
                <p className="mt-1.5 text-[13px] leading-6 text-[var(--text-muted)]">{faq.a}</p>
                {i < faqs.length - 1 && <div className="mt-5 h-px bg-[var(--border-soft)]" />}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}