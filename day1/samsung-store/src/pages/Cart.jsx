import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCart();

  // Helper function to clean price string and return a number
  const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    return Number(price.replace(/[^0-9.]/g, "")) || 0;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* 1. ITEMS LIST SECTION */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                
                {/* Product Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-2xl p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>

                {/* Product Details */}
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-blue-600 font-bold mb-4">{item.price}</p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                      <button 
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-xl font-bold"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-bold ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Subtotal for this item (FIXED NaN) */}
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Total</p>
                  <p className="text-lg font-extrabold text-gray-900">
                    {/* Yahan hum price ko clean karke multiply kar rahe hain */}
                    ${(getNumericPrice(item.price) * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 2. ORDER SUMMARY SECTION */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-sm">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between text-xl font-extrabold text-gray-900">
                  <span>Total Bill</span>
                  <span className="text-blue-600">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100 mb-4">
                Checkout Now
              </button>
              
              <p className="text-center text-xs text-gray-400">
                Secure SSL encrypted payment
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;