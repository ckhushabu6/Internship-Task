import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Assets
import tabBanner1 from "../assets/tabBanner.png"
import tabBanner2 from "../assets/tabBanner2.png"
import tabBanner3 from "../assets/tabBanner3.png"

function Shop() {
  const [activeTab, setActiveTab] = useState("all");
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const filteredProducts = products.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-white">
      
      {/* --- PREMIUM OVERLAY BANNER SECTION --- */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-[550px] md:min-h-[650px] flex items-center px-6 md:px-16 overflow-hidden border-b border-gray-100">
        
        {/* 1. NAVBAR */}
        <nav className="absolute top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-16 py-8">
          <h2 className="text-black text-xl md:text-2xl font-black tracking-tighter">SAMSUNG</h2>
          
          <div className="flex items-center gap-6 md:gap-10 text-gray-800 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/products" className="text-blue-600 border-b-2 border-blue-600 pb-1">Shop</Link>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-lg hover:scale-110 transition-all"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 text-black normal-case tracking-normal z-[110]">
                    <p className="font-extrabold truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400 mb-4 truncate">{user.email}</p>
                    <hr className="mb-3" />
                    <button onClick={logout} className="w-full bg-red-50 text-red-600 py-2.5 rounded-xl font-bold text-[10px] hover:bg-red-100 transition-all text-center">
                      SIGN OUT
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-blue-600 transition-colors">Login</Link>
            )}

            <Link to="/cart" className="relative group">
              <span className="text-xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* 2. BANNER CONTENT */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between relative z-10 mt-12">
          
          {/* Left Text */}
          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-6 leading-none tracking-tighter">
              Galaxy <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Universe.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-sm mb-10 leading-relaxed">
              Precision meets performance. Discover the most advanced mobile technology.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
                <span className="px-5 py-2 bg-white rounded-full text-[10px] font-black shadow-sm border border-gray-100 uppercase tracking-widest text-gray-600">Premium Tech</span>
                <span className="px-5 py-2 bg-white rounded-full text-[10px] font-black shadow-sm border border-gray-100 uppercase tracking-widest text-gray-600">Galaxy AI</span>
            </div>
          </div>

          {/* Right Slider */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <Slider {...settings}>
              {[tabBanner1, tabBanner2, tabBanner3].map((img, index) => (
                <div key={index} className="outline-none relative group px-4">
                  <div className="absolute -inset-4 bg-blue-400 rounded-full blur-[100px] opacity-10"></div>
                  <img 
                    src={img}
                    alt="Galaxy Banner" 
                    className="w-full max-w-[500px] mx-auto h-auto drop-shadow-3xl hover:translate-y-[-10px] transition-transform duration-700 ease-out"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* --- PRODUCTS SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Explore <br/> <span className="text-blue-600 text-5xl md:text-6xl">Innovation.</span>
          </h2>
          
          <div className="flex bg-gray-50 p-1.5 rounded-3xl border border-gray-100">
            {["all", "mobile", "tablet"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-white text-blue-600 shadow-xl scale-105"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20 pb-20">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;