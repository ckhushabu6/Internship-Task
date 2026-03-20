import ProductCard from "./ProductCard";
import products from "../data/products";
import { Link } from "react-router-dom"; // Link import karein


function ProductGrid() {
  return (
    <section className="py-16 px-4 md:px-10 bg-gray-50">
      
      {/* Section Title & Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Latest Deals
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Upgrade to the newest Galaxy tech with exclusive offers.
          </p>
        </div>
        
        {/* Link add kiya Shop page ke liye */}
        <Link to="/products"> 
          <button className="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center gap-1 group">
            View All Products 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </Link>
      </div>

      {/* The Responsive Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State remains same */}
    </section>
  );
}

export default ProductGrid;