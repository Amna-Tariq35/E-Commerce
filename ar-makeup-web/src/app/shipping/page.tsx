import Link from "next/link";

export default function ShippingInfoPage() {
  const options = [
    {
      label: "Standard Shipping",
      time: "5–7 business days",
      price: "Free over $50",
      desc: "Our most popular option. Free on all orders above $50, otherwise a flat rate applies at checkout.",
    },
    {
      label: "Express Shipping",
      time: "2–3 business days",
      price: "From $9.99",
      desc: "Need it sooner? Select express at checkout for priority handling and faster delivery.",
    },
    {
      label: "Order Tracking",
      time: "Real-time updates",
      price: "Always free",
      desc: "Once shipped, you'll receive a tracking link via email to follow your order every step of the way.",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)]">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#B65C7A]/20 bg-[#B65C7A]/6 px-4 py-1.5 text-[11px] font-semibold tracking-widest text-[#B65C7A] uppercase">
            Shipping Info
          </span>
          <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-[#1a0e13] sm:text-5xl">
            Fast delivery,{" "}
            <span className="italic text-[#B65C7A]">every time.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
            Free standard shipping on orders over $50. Express options available at checkout.
          </p>
        </div>

        {/* Delivery cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {options.map((o) => (
            <div
              key={o.label}
              className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--bg-section)] p-6 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {o.label}
              </p>
              <p className="mt-3 text-[17px] font-bold text-[#B65C7A]">{o.time}</p>
              <p className="mt-0.5 text-[12px] font-semibold text-[var(--text-muted)]">{o.price}</p>
              <div className="my-4 h-px bg-[var(--border-soft)]" />
              <p className="text-[12.5px] leading-6 text-[var(--text-muted)]">{o.desc}</p>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div className="mb-8 rounded-[20px] border border-[#B65C7A]/15 bg-gradient-to-br from-[#FDF0F4] to-[#FBF7F4] p-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#B65C7A]">Important</p>
          <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
            Shipping times may vary by region and product availability. Orders placed after 3 pm local time will begin processing the next business day.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start justify-between gap-4 rounded-[20px] border border-[var(--border-soft)] bg-[var(--bg-section)] p-6 sm:flex-row sm:items-center">
          <p className="text-sm text-[var(--text-muted)]">
            Questions about your shipment? We're happy to help.
          </p>
          <Link
            href="/support"
            className="inline-flex shrink-0 items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
            style={{ background: "var(--rose-primary)" }}
          >
            Contact Support
          </Link>
        </div>

      </div>
    </main>
  );
}