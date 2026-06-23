import { getProducts } from "@/src/lib/catalog/queries";
import WishlistClient from "@/src/components/products/WishlistClient";

export default async function WishlistPage() {
  const products = await getProducts();

  return <WishlistClient products={products} />;
}
