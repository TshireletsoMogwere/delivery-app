import React, { useState } from "react";
import { products } from "../data/prducts";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar"; 

export default function ProductList() {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="pt-20 mt-10">
     <div className="flex justify-center mb-6">
    <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
  </div>


      {/* Product grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
}
