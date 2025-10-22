import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MainLayoutComponent } from "../MainLayoutComponent";
import { useFetch } from "../../hooks/usefetch";
import { ACTION_TYPES } from "../../store/index.js";
import { Link } from "react-router-dom";

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("popularity");
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const cartItems = useSelector((state) => state.cartItems);
  const isAuth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();

  const { data, error } = useFetch({
    url: `${process.env.REACT_APP_API_KEY}/products`,
    category: selectedCategory,
  });

  useEffect(() => {
    if (data?.length) setProducts(data);
    if (error) {
      setErrorMessage(error);
      console.error("Error fetching products:", error);
    }
  }, [data, error]);

  const handleCartChange = async (productId, count) => {
    if (!isAuth) {
      alert("Kindly login to add product to cart");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_KEY}/cartItems`,
        { productId, count },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {
      console.log("Error updating cart:", err);
    }
  };

  const getQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const categories = ["All", "Mens", "Womens", "Accessories"];
  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "low-high", label: "Price: Low to High" },
    { value: "high-low", label: "Price: High to Low" },
  ];

  const fetchCartItems = async () => {
    const updated = await axios.get(`${process.env.REACT_APP_API_KEY}/cartItems`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    dispatch({
      type: ACTION_TYPES.setCartItems,
      payload: updated.data.data,
    });
  };

  return (
    <MainLayoutComponent>
      <div className="bg-gray-50 min-h-screen pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header & Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Explore Our Products
            </h1>

            <div className="flex items-center space-x-3">
              <label htmlFor="sort" className="text-gray-600 font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Sidebar Filters */}
            <aside className="md:col-span-1 bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-6">Filters</h2>
              <div className="mb-8">
                <h3 className="font-medium text-gray-700 mb-3">Category</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="accent-indigo-600"
                        />
                        <span className="text-gray-600 hover:text-indigo-600 transition">
                          {cat}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Product Cards */}
            <main className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {!errorMessage ? (
                  products.map((product) => {
                    const quantity = getQuantity(product.id);

                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
                      >
                        {console.log(product.id)}
                        <Link to={`/products/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-60 w-full object-cover"
                          />
                        </Link>
                        <div className="p-4 space-y-2">
                          <h3 className="font-semibold text-lg text-gray-800">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Category: {selectedCategory}
                          </p>
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-indigo-600">
                              ${product.price}
                            </p>

                            {quantity === 0 ? (
                              <button
                                onClick={() => {
                                  handleCartChange(product.id, 1);
                                  fetchCartItems();
                                }}
                                className="text-sm bg-indigo-600 text-white px-3 py-2 rounded-full hover:bg-indigo-700 transition"
                              >
                                Add to Cart
                              </button>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    handleCartChange(product.id, -1);
                                    fetchCartItems();
                                  }}
                                  className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition"
                                >
                                  -
                                </button>
                                <span className="font-medium">{quantity}</span>
                                <button
                                  onClick={() => {
                                    handleCartChange(product.id, 1);
                                    fetchCartItems();
                                  }}
                                  className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1 className="text-xl font-bold text-gray-800">
                    Unable to get products
                  </h1>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </MainLayoutComponent>
  );
}
