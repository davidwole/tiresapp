import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../assets/search.svg";
import ArrowDown from "../assets/arrowdown.svg";
import Bars from "../assets/bars.svg";
import People from "../assets/people.svg";
import Location from "../assets/location.svg";
import Message from "../assets/message.svg";

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
      <div className="bg-gray-900 text-white py-20 px-4 bg-[url('https://res.cloudinary.com/dqf8qs0jk/image/upload/v1772291530/Tires/tires-hero_isytde.png')] bg-cover h-[28rem]">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-12 text-left max-w-7xl mx-auto text-shadow-subtle">
          Your Destination for
          <h1 className="text-[#fdd799] text-left max-w-7xl mx-auto mt-4 text-shadow-subtle">
            Semi Trailer Tires
          </h1>
        </h1>
        {/* <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Find the perfect trailer for your cargo with our curated marketplace
          of high-quality, durable trailers.
        </p>
        <Link
          to="/inventory"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
        >
          See All Listings
        </Link> */}
        <div className="flex max-w-7xl mx-auto">
          <input
            className="px-4 py-4 text-[1.25rem] w-[15rem] md:w-[38.625rem] rounded-lg"
            type="text"
            placeholder="Search Tire Size..."
          />
          <button className="bg-[#4569cf] py-4 px-2 relative -left-[5px]">
            <img src={Search} alt="Search" width={30} />
          </button>
          <button className="bg-[#50a353] px-4 py-4 text-[1.25rem] rounded-lg relative -left-[7px]">
            Call Now
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-4 pt-4">
        <div className="bg-[#eaecf4] text-[14px] px-[0.25rem] py-[0.25rem] md:text-[1.5rem] md:px-8 md:py-2 font-[600] rounded-lg flex items-center">
          <img src={Bars} className="w-[16px] md:w-[24px]" />
          <p className="mx-2">All Prices</p>
          <img src={ArrowDown} width={12} />
        </div>

        <div className="bg-[#eaecf4] text-[14px] px-[0.25rem] py-[0.25rem] md:text-[1.5rem] md:px-8 md:py-2 font-[600] rounded-lg flex items-center">
          <img src={People} className="w-[16px] md:w-[24px]" />
          <p className="mx-2">New & Used</p>
          <img src={ArrowDown} width={12} />
        </div>

        <div className="bg-[#eaecf4] text-[14px] px-[0.25rem] py-[0.25rem] md:text-[1.5rem] md:px-8 md:py-2 font-[600] rounded-lg flex items-center">
          <img src={Location} className="w-[16px] md:w-[24px]" />
          <p className="mx-2">All Locations</p>
          <img src={ArrowDown} width={12} />
        </div>
      </div>

      {/* Featured Inventory */}
      {!loading && featuredProducts.length > 0 && (
        <div className="py-16  bg-[#f7f6fb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold  mb-10">
              Fresh Inventory In Stock
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
                    <h2 className="text-xl font-semibold mb-2">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-bold">
                        ${product.price.toLocaleString()}
                      </span>
                      {/* {product.inStock ? (
                        <Link
                          to={`/product/${product._id}`}
                          className="text-[blue-600] hover:text-blue-800 font-medium"
                        >
                          View Details
                        </Link>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Out of Stock
                        </span>
                      )} */}
                    </div>

                    <button className="bg-[#3661AE] text-white px-2 py-2 rounded-lg flex items-center w-[80%]">
                      <img src={Message} width={24} className="mr-4" />
                      Message/Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button className="bg-[#3661AE] px-12 py-4 border border-white rounded-[2.1875rem]">
                <Link
                  to="/inventory"
                  className="text-white font-semibold text-lg"
                >
                  See All Listings
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="h-[32.125rem] flex flex-col items-center bg-[url('https://res.cloudinary.com/dqf8qs0jk/image/upload/v1772295566/Tires/footer_xgyuhz.png')] pt-12
      "
      >
        <h1 className="text-[2rem] text-white text-center">
          Get the best deals on{" "}
          <span className="font-[500] ">semi trailer tires.</span>
        </h1>
        <h1 className="font-[500] text-[2rem] text-[#fdd799] mb-8 text-center">
          Shop our inventory today!
        </h1>
        <button className="bg-[#3661AE] px-12 py-4 border border-white rounded-[2.1875rem]">
          <Link to="/inventory" className="text-white font-semibold text-lg">
            Browse Tires
          </Link>
        </button>
      </div>
    </div>
  );
}
