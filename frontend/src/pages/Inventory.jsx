import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading inventory...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">All Trailers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-grow flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-bold">
                  ${product.price.toLocaleString()}
                </span>
                {product.inStock ? (
                  <Link
                    to={`/product/${product._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
}
