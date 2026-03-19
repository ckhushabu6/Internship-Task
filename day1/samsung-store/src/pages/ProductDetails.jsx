import React from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  // URL ki ID ko data se compare karke product find karna
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold mb-4">Product not found!</h2>
        <Link to="/" className="text-blue-600 font-bold hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Top Bar */}
      <div className="bg-black py-5 px-6 md:px-16 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-white font-bold text-2xl tracking-tighter">SAMSUNG</Link>
        <Link to="/cart" className="text-white text-xl">🛒</Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Product Image Card */}
        <div className="bg-gray-50 rounded-[3rem] p-12 flex items-center justify-center border border-gray-100 shadow-inner">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-[450px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col">
          <p className="text-blue-600 font-bold tracking-widest text-xs mb-4 uppercase">Samsung Exclusive</p>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            {product.name}
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{product.price}</h2>
          
          <div className="border-t border-gray-200 pt-8 mb-10">
            <h4 className="text-lg font-bold text-gray-900 mb-3">Key Highlights</h4>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => addToCart(product)}
            className="w-full md:w-3/4 bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-95"
          >
            Add to Cart
          </button>
          
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <span className="block text-xl mb-1">🚚</span>
              <p className="text-xs font-bold text-gray-500">Free Shipping</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <span className="block text-xl mb-1">🛡️</span>
              <p className="text-xs font-bold text-gray-500">1 Year Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;