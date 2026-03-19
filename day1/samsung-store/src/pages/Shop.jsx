import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext"; // 1. Hook import karein
import SimpleNavbar from "../components/SimpleNavbar";

function Shop() {
  const [activeTab, setActiveTab] = useState("all");
  
  // 2. Cart context se items nikaalein aur total count calculate karein
  const { cartItems } = useCart();
  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const filteredProducts = products.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-white">
        <SimpleNavbar/>
        
      {/* --- STICKY HEADER --- */}
      {/* <nav className="sticky top-0 z-50 bg-black text-white px-6 md:px-16 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl hover:text-blue-400 transition-colors">
            ←
          </Link>
          <h2 className="text-xl md:text-2xl font-bold tracking-tighter uppercase">Samsung Store</h2>
        </div>

        {/* 3. Cart Icon with Dynamic Badge */}
        {/* <Link to="/cart" className="relative group p-2">
          <span className="text-2xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute top-0 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-black font-bold animate-bounce">
              {totalItems}
            </span>
          )}
        </Link>
      </nav> */} 

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-8">Explore Devices</h1>

        {/* --- TABS --- */}
        <div className="flex gap-4 mb-10 border-b border-gray-100 pb-4 overflow-x-auto no-scrollbar">
          {["all", "mobile", "tablet"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 rounded-full font-bold text-sm transition-all duration-300 capitalize ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;