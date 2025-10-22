import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayoutComponent } from "../MainLayoutComponent";
import axios from "axios";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_KEY}/products/?id=${id}`);
        setProduct(res.data.data[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleCartChange = (change) => {
    setQuantity((prev) => Math.max(prev + change, 0));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Product not found.
      </div>
    );
  }

  return (
    <MainLayoutComponent>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-xl rounded-3xl p-6 md:p-10 transition-all duration-300 hover:shadow-2xl">
          
          {/* Left: Product Image */}
          <div className="flex justify-center items-center relative">
            <div className="overflow-hidden rounded-2xl bg-gray-100 group w-full flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-[420px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="absolute top-5 left-5 bg-indigo-600 text-white text-sm px-3 py-1 rounded-full shadow">
              {product.category}
            </span>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-500 mt-2 text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            <p className="text-4xl font-semibold text-indigo-600">
              ${product.price}
            </p>

            {/* Cart Controls */}
            <div className="flex items-center space-x-4">
              {quantity === 0 ? (
                <button
                  onClick={() => handleCartChange(1)}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium shadow hover:bg-indigo-700 transition-all"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center space-x-4 bg-gray-100 rounded-full px-4 py-2">
                  <button
                    onClick={() => handleCartChange(-1)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleCartChange(1)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Buy Now Button */}
              <button
                onClick={() => navigate("/cart")}
                className="px-8 py-3 bg-green-600 text-white rounded-full text-lg font-medium shadow hover:bg-green-700 transition-all"
              >
                Buy Now
              </button>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-400">
                ✅ Free shipping on orders above $100.
              </p>
              <p className="text-sm text-gray-400">
                🕒 Estimated delivery: 3–5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            You may also like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-gray-100 h-40 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt="Similar product"
                    className="h-24 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-semibold text-gray-700">
                    Sample Product {i}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium">$99.99</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayoutComponent>
  );
}
