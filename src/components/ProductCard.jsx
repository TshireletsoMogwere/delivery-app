import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="rounded mb-3" />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="mt-2 font-semibold">R{product.price}</p>
      <Link to={`/order/${product.id}`} className="inline-block mt-2 text-blue-600 font-medium hover:underline">
        Deliver Now
      </Link>
    </div>
  );
}
