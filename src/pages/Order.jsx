import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/prducts";

export default function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/track");
    }, 2000); 
  };

  if (!product) {
    return <div className="p-6 text-center text-red-500">Product not found.</div>;
  }

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p>Your delivery request for <strong>{product.name}</strong> has been submitted.</p>
        <p>Redirecting to tracking...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order: {product.name}</h2>
      <img src={product.image} alt={product.name} className="w-32 mb-4 rounded" />
      <p className="mb-2 text-gray-600">{product.description}</p>
      <p className="mb-4 font-semibold">Price: R{product.price}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" required className="w-full border p-2 rounded" />
        <input type="text" placeholder="Delivery Address" required className="w-full border p-2 rounded" />
        <input type="tel" placeholder="Phone Number" required className="w-full border p-2 rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Order</button>
      </form>
    </div>
  );
}
