import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-50 flex justify-center items-center h-48">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-40 object-contain group-hover:scale-110 transition-transform duration-500"
        />
        {/* Discount Badge (Optional) */}
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
          NEW
        </span>
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{product.name}</h3>
        <p className="text-blue-600 font-extrabold text-xl mt-1">
          ${product.price}
        </p>
        
        {/* Star Rating (Static example) */}
        <div className="flex text-yellow-400 text-xs mt-2">
          ★★★★★ <span className="text-gray-400 ml-1">(45)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
          Add To Cart
        </button>
        
        <Link to={`/product/${product.id}`} className="w-full">
          <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;