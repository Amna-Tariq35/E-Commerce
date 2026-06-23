import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/8 bg-[#F4EEE8]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-white/80 ring-1 ring-black/8">
                <div className="h-2 w-2 rounded-full bg-[#B65C7A]" />
              </div>
              <span className="text-[13.5px] font-medium text-[#1a0e13]">Lumière</span>
            </div>
            <p className="mt-4 max-w-[240px] text-xs font-light leading-6 text-[#6a4a55]">
              Premium beauty products delivered to your door. Trusted by thousands of customers worldwide.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[10.5px] font-medium tracking-widest text-[#3a1a25]">SHOP</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {[
                { label: "All Products", href: "/products" },
                { label: "New Arrivals", href: "/new-arrivals" },
                { label: "Sale", href: "/sale" },
                { label: "Gift Cards", href: "/gift-cards" },
              ].map((x) => (
                <Link key={x.label} href={x.href} className="text-xs font-light text-[#6a4a55] hover:text-[#B65C7A]">
                  {x.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <p className="text-[10.5px] font-medium tracking-widest text-[#3a1a25]">CUSTOMER CARE</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {[
                { label: "Track My Order", href: "/my-orders" },
                { label: "Returns & Exchanges", href: "/returns" },
                { label: "Shipping Info", href: "/shipping" },
                { label: "Contact Support", href: "/support" },
              ].map((x) => (
                <Link key={x.label} href={x.href} className="text-xs font-light text-[#6a4a55] hover:text-[#B65C7A]">
                  {x.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <p className="text-[10.5px] font-medium tracking-widest text-[#3a1a25]">MY ACCOUNT</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {[
                { label: "Sign In", href: "/auth/sign-in" },
                { label: "Create Account", href: "/auth/sign-up" },
                { label: "My Orders", href: "/my-orders" },
                { label: "Wishlist", href: "/wishlist" },
              ].map((x) => (
                <Link key={x.label} href={x.href} className="text-xs font-light text-[#6a4a55] hover:text-[#B65C7A]">
                  {x.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/8 pt-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-[#9a7a85]">
            © {new Date().getFullYear()} Lumière. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-[11px] text-[#9a7a85] hover:text-[#B65C7A]">Privacy</Link>
            <Link href="/terms" className="text-[11px] text-[#9a7a85] hover:text-[#B65C7A]">Terms</Link>
            <Link href="/cookies" className="text-[11px] text-[#9a7a85] hover:text-[#B65C7A]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}