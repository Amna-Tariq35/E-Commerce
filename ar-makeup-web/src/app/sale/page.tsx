import { getProducts } from "@/src/lib/catalog/queries";
import ProductsClient from "@/src/components/products/ProductsClient";

export default async function SalePage() {
  const products = await getProducts();
  const saleProducts = products.filter(
    (product) =>
      typeof product.discount_percent === "number" &&
      typeof product.price === "number" &&
      product.discount_percent > 0 &&
      product.discount_percent < product.price
  );

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">
            Sale
          </h1>
          <p className="mt-2 text-[var(--text-muted)] max-w-2xl">
            Shop the best discounted beauty picks. Every item here has a price cut and a fresh savings tag.
          </p>
        </div>

        <ProductsClient initialProducts={saleProducts} />
      </div>
    </main>
  );
}
