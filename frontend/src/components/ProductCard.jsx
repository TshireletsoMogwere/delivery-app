import { ArrowRight, Package, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="relative rounded-2xl p-6 overflow-hidden">
      {/* Animated Background Glow
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div> */}

      {/* Product Image Container */}
      <div className="relative mb-6">
        <div className="relative w-full h-48 bg-gradient-to-br from-white/5 to-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
          <img
            src={product?.image || "/api/placeholder/300/200"}
            alt={product?.name || "Product"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Floating Badge */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          Fast Delivery
        </div>
      </div>

      {/* Content */}
      <div className="relative space-y-4">
        <div>
          <h3 className="text-lg font-bold text-black mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
            {product?.name || "Sample Product"}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {product?.description ||
              "Experience premium quality with fast delivery across Johannesburg. Perfect for your needs."}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-lg font-bold text-black">
              R{product?.price || "89.99"}
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500"></div>
          </div>
        </div>

        {/* Action Button */}
        <Link to={`/order/${product.id}`}>
          <button className="w-34 mt-2 group/btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-blue-500/25 flex items-center justify-center space-x-2">
            <span>Deliver Now</span>
            <ArrowRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </button>
        </Link>
      </div>

      {/* Subtle Border Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
    </div>
  );
}
