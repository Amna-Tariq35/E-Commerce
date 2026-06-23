"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/src/components/products/ProductsClient";
import ProductCard from "@/src/components/products/ProductCard";
import type { MakeupProduct } from "@/src/types/catalog";

export default function WishlistClient({ products }: { products: MakeupProduct[] }) {
  const { wishlist, toggle, isWished } = useWishlist();

  const wishedProducts = useMemo(
    () => products.filter((p) => wishlist.includes(p.product_key)),
    [products, wishlist]
  );

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">
            My Wishlist
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {wishedProducts.length > 0
              ? `${wishedProducts.length} saved ${wishedProducts.length === 1 ? "product" : "products"}`
              : "Save your favorite products and come back anytime."}
          </p>
        </div>

        {wishedProducts.length === 0 ? (
          /* Empty state */
          <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 rounded-[24px] border border-[var(--border-soft)] bg-[var(--bg-section)] text-center p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--rose-primary)]/10">
              <Heart size={28} style={{ color: "var(--rose-primary)" }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-main)]">No favorites yet</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--text-muted)]">
                Tap the heart icon on any product to save it here. Your selections are stored in your browser.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
              style={{ background: "var(--rose-primary)" }}
            >
              Browse products
            </Link>
          </div>
        ) : (
          /* Products grid — exact same as products page */
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishedProducts.map((product) => (
              <ProductCard
                key={product.product_key}
                product={product}
                isWished={isWished(product.product_key)}
                onWishlistToggle={toggle}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}