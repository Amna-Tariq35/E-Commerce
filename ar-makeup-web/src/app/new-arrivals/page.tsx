import { getProducts } from "@/src/lib/catalog/queries";
import ProductsClient from "@/src/components/products/ProductsClient";

export default async function NewArrivalsPage() {
  const products = await getProducts();
  const newArrivals = products.filter((product) => product.is_new === true);

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">
            New Arrivals
          </h1>
          <p className="mt-2 text-[var(--text-muted)] max-w-2xl">
            Discover the latest additions to our beauty collection. These products are freshly curated for a polished daily routine.
          </p>
        </div>

        <ProductsClient initialProducts={newArrivals} />
      </div>
    </main>
  );
}
