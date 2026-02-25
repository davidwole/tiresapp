import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("/api/products");
                setFeaturedProducts(data.slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Premium Trailers for Every Need</h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                    Find the perfect trailer for your cargo with our curated marketplace of high-quality, durable trailers.
                </p>
                <Link to="/inventory" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                    See All Listings
                </Link>
            </div>

            {/* Featured Inventory */}
            {!loading && featuredProducts.length > 0 && (
                <div className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-10">Featured Inventory</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProducts.map((product) => (
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
                        </div>
                        <div className="text-center mt-10">
                            <Link to="/inventory" className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
                                View All Inventory &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Value Proposition */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 justify-center">
                    <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Verified Sellers</h3>
                            <p className="text-gray-600">Every trailer on our platform is sourced from trusted, verified dealers.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                            <p className="text-gray-600">We ensure high standards for durability and safety.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
                            <p className="text-gray-600">Get the best value for your money with transparent pricing.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-gray-600 italic mb-4">"Absolutely the best place to find a heavy-duty trailer. The process was smooth and the quality exceeded my expectations."</p>
                        <p className="font-semibold">- John Doe</p>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="border border-gray-200 rounded p-4">
                            <h3 className="font-semibold text-lg">Do you deliver?</h3>
                            <p className="text-gray-600 mt-2">Delivery options vary by seller. Check the product page for specific details.</p>
                        </div>
                        <div className="border border-gray-200 rounded p-4">
                            <h3 className="font-semibold text-lg">Are these new or used?</h3>
                            <p className="text-gray-600 mt-2">We offer both new and pre-owned trailers. The condition is clearly marked on each listing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
