import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-600">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h3 className="text-black font-extrabold text-lg">📱 Samsung Store</h3>
          <p className="leading-relaxed">
            Experience the latest innovations in tech, from mobile devices to home appliances, all in one place.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-black font-bold mb-4 uppercase tracking-wider text-xs">Products</h4>
          <ul className="space-y-2">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Smartphones</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Watches</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Tablets</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Laptops</li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h4 className="text-black font-bold mb-4 uppercase tracking-wider text-xs">Support</h4>
          <ul className="space-y-2">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Chat with us</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Repair Service</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Warranty</li>
          </ul>
        </div>

        {/* Column 4: Account */}
        <div>
          <h4 className="text-black font-bold mb-4 uppercase tracking-wider text-xs">Account</h4>
          <ul className="space-y-2">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">My Orders</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Wishlist</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Track Delivery</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Login / Register</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Policy */}
      <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2026 Samsung Store. All rights reserved. Developed with ❤️ by You.</p>
        <div className="flex gap-6">
          <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-gray-600 cursor-pointer">Terms & Conditions</span>
          <span className="hover:text-gray-600 cursor-pointer">Accessibility</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;