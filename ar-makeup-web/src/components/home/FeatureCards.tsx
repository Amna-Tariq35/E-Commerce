import Link from "next/link";
import { ShoppingBag, Tag, RotateCcw, Headphones } from "lucide-react";

const items = [
  {
    title: "Shop All Products",
    desc: "Browse our full catalog across makeup, skincare & fragrance.",
    href: "/products",
    Icon: ShoppingBag,
  },
  {
    title: "Sale & Offers",
    desc: "Up to 40% off on selected items. Limited time only.",
    href: "/sale",
    Icon: Tag,
  },
  {
    title: "Easy Returns",
    desc: "30-day hassle-free return policy on all orders.",
    href: "/returns",
    Icon: RotateCcw,
  },
  {
    title: "Customer Support",
    desc: "Available 7 days a week to help with your order.",
    href: "/support",
    Icon: Headphones,
  },
];

export default function FeatureCards() {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-[#1a0e13]">Why Shop With Us</h2>
          <p className="mt-1 text-xs font-light text-[#7a5a65]">
            Everything you need, nothing you don't
          </p>
        </div>
        <Link
          href="/products"
          className="hidden text-xs font-medium tracking-wide text-[#B65C7A] hover:underline sm:inline-flex"
        >
          View all products →
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, desc, href, Icon }) => (
          <Link
            key={title}
            href={href}
            className="group relative rounded-2xl border border-black/8 bg-white/70 p-5 backdrop-blur transition duration-200 hover:border-[#B65C7A]/25 hover:bg-white/90"
          >
            <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4EEE8]">
              <Icon size={16} className="text-[#B65C7A]" strokeWidth={1.5} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[13.5px] font-medium text-[#1a0e13]">{title}</p>
              <span className="text-xs text-black/25 transition group-hover:text-[#B65C7A]">→</span>
            </div>
            <p className="mt-1.5 text-xs font-light leading-relaxed text-[#7a5a65]">{desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}