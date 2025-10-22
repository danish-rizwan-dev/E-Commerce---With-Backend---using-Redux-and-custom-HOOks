import { Link, useNavigate } from "react-router";
import { useFetch } from "../../hooks/usefetch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_TYPES } from "../../store";

export function HomePageDesign() {
  const isAuth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [featuredProducts, setfeaturedProducts] = useState([
    {
      id: 1,
      name: "Apple iPhone 15",
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-select-2023-family",
      price: 1199,
    },
  ]);

  const { data, error } = useFetch({
    url: `${process.env.REACT_APP_API_KEY}/products`,
    category: "featured",
  });

  useEffect(() => {
    if (data.length) {
      setfeaturedProducts(data);
    }
  }, [data]);

  console.log("Featured Products:", featuredProducts);
  console.log("Fetch Error:", error);

  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-20">
          <div className="space-y-6 md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover the Latest Trends in Fashion
            </h1>
            <p className="text-lg text-gray-100">
              Shop our new arrivals and elevate your style with exclusive
              collections crafted for comfort and confidence.
            </p>
            <div className="flex space-x-4">
              <Link
                to={"/products"}
                className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
              >
                Shop Now
              </Link>
              {!isAuth ? (
                <Link
                  to={"/signin"}
                  className="border border-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    localStorage.clear();
                    dispatch({
                      type: ACTION_TYPES.updateIsAuth,
                      action: { payload: true },
                    });
                  }}
                  className="border border-white  bg-red-600 font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-red-600 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80"
              alt="Fashion Banner"
              className="rounded-2xl shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Mens",
              img: "https://imgs.search.brave.com/38HS4MNyY8VtBbA0_JeNtvhQav4cyEg0JqTZawFa3U4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9kZncvODgy/MmFlZjYtNzcyMy9r/Mi1fMDExMGViZWEt/NzlhMy00ZWJjLWI2/NTgtMGNhZTAxMGRm/MjU5LnYxLmpwZz9v/ZG5IZWlnaHQ9Mjkw/Jm9kbldpZHRoPTI5/MCZvZG5CZz1GRkZG/RkY",
            },
            {
              name: "Womens",
              img: "https://imgs.search.brave.com/bzy0ZwPeUy97kSx1swzJR9KtSAYqkUY0dZWyCgvVT-4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9kZncvNGZm/OWM2YzktYjhhMy9r/Mi1fM2RjOTkxMGQt/MGFiNC00NDEzLThh/MzUtNWNhYzIxMDZi/OGU0LnYxLmpwZz9v/ZG5IZWlnaHQ9Mjkw/Jm9kbldpZHRoPTI5/MCZvZG5CZz1GRkZG/RkY",
            },
            {
              name: "Electronics",
              img: "https://imgs.search.brave.com/dcUBQStIMdScONZadvA-2ej8obQ0kzXiQtG_mYpm7ic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zLmFs/aWNkbi5jb20vQHNj/MDQva2YvSDFiMWI0/OTViOWNlNDQ3Mjc5/MWE4MTlkY2RjNWQ3/ZGIxVS5wbmdfMzAw/eDMwMC5qcGc",
            },
            {
              name: "Accessories",
              img: "https://imgs.search.brave.com/dcUBQStIMdScONZadvA-2ej8obQ0kzXiQtG_mYpm7ic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zLmFs/aWNkbi5jb20vQHNj/MDQva2YvSDFiMWI0/OTViOWNlNDQ3Mjc5/MWE4MTlkY2RjNWQ3/ZGIxVS5wbmdfMzAw/eDMwMC5qcGc",
            },
          ].map((cat) => (
            <div
              key={cat.name}
              className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-sm hover:shadow-lg transition"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((item) => (
              <div
                key={item.id}
                className="group bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-indigo-100 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-8.682a4.5 4.5 0 010-6.364z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-3 text-center">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-indigo-600 font-medium text-lg">
                    ${item.price}
                  </p>
                  <Link to={"/products?id"} className="w-full bg-indigo-600 text-white p-2.5 px-18   rounded-full font-medium hover:bg-indigo-700 transition">
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 my-10">
        <div className="max-w-7xl mx-auto text-center space-y-6 px-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            50% OFF — End of Season Sale!
          </h2>
          <p className="text-lg text-gray-100">
            Grab your favorites before they’re gone. Limited-time offer.
          </p>
          <Link
            to={"/products"}
            className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 text-white">ShopEase</h3>
            <p className="text-sm">
              Your one-stop destination for modern fashion and lifestyle trends.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to={"/homepage"} className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/products"} className="hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              {["facebook", "instagram", "twitter"].map((icon) => (
                <a key={icon} href="#" className="hover:text-white text-xl">
                  <i className={`fa-brands fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-10">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
