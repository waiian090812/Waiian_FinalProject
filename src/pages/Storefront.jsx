import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Storefront() {
  const featured = products
  .filter((p) => p.tags?.length)
  .slice(0, 4);

  return (
    <div>
      <h2 className="text-2xl font-bold">Storefront (Featured)</h2>
      <p className="text-gray-600 mt-1">New, trending, best-seller items.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}