import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/${id}`,
        );
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return <div className="text-center py-20">Loading product...</div>;
  if (!product)
    return (
      <div className="text-center py-20 font-bold text-red-500">
        Product not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/inventory"
        className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
      >
        &larr; Back to Inventory
      </Link>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden grid md:grid-cols-2">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 md:h-full object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6 whitespace-pre-line">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-8">
            <span className="text-3xl font-extrabold">
              ${product.price.toLocaleString()}
            </span>
            {product.inStock ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
            )}
          </div>
          {product.inStock && (
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors">
              Contact Seller
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
