import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 h-16 text-white flex items-center justify-between px-8 shadow-lg font-sans">
      {/* Logo Section */}
      <div className="flex items-center">
        <h3 className="text-xl font-extrabold tracking-tight cursor-pointer">
          📱 Samsung Store
        </h3>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 items-center text-sm uppercase tracking-wide">
        <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
        <Link to="/about" className="hover:text-blue-200 transition-colors">About</Link>
        <Link to="/products" className="hover:text-blue-200 transition-colors">Products</Link>
        <Link to="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
      </div>

      {/* Action Area (Search & Buttons) */}
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <input 
            type="text" 
            placeholder="Search..." 
            className="rounded-full py-1 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all w-40 focus:w-60"
          />
        </div>
        
        <button className="bg-white text-blue-600 px-4 py-1.5 rounded-md text-sm font-bold hover:bg-blue-50 transition-colors">
          Add To Cart
        </button>
        
        <button className="border border-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-white hover:text-blue-600 transition-all">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;