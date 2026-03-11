import ProductCard from "./ProductCard";
import products from "../data/products";

function ProductGrid() {
  return (
    <section className="py-12 px-6 bg-gray-50">
      {/* Section Title */}
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Latest Deals</h2>
          <p className="text-gray-500 mt-1">Upgrade to the newest Galaxy tech</p>
        </div>
        <button className="text-blue-600 font-bold hover:underline">View All →</button>
      </div>

      {/* The Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;