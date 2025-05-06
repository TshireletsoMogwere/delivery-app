import { products } from "../data/prducts";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  return (
    <div className="p-6 mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}