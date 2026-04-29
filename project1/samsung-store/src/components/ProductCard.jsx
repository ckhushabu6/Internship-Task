import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white border border-gray-100 rounded-[10px] p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Product Image Section */}
      <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-50 flex justify-center items-center h-48 sm:h-56">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-32 sm:h-40 object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
          NEW
        </span>
      </div>

      {/* Product Information */}
      <div className="flex-grow space-y-1">
        <h3 className="font-bold text-gray-800 text-base md:text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-blue-600 font-extrabold text-xl">
          ₹{product.price.toLocaleString()}
        </p>
        
        <div className="flex items-center text-yellow-400 text-xs">
          ★★★★★ <span className="text-gray-400 ml-2">(45)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-col gap-2">
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all text-sm shadow-md shadow-blue-100"
        >
          Add To Cart
        </button>
        
        {/* ✅ FIX: Link ko template literal mein dala taaki ID sahi se jaye */}
        <Link to={`/product/${product.id}`} className="w-full">
          <button className="w-full border border-gray-200 text-gray-600 py-2.5 rounded-xl font-bold hover:bg-gray-50 active:scale-95 transition-all text-sm text-center">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;