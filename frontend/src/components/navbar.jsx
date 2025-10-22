import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ACTION_TYPES } from "../store";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuth = useSelector((state) => state.isAuth);
  const cartItems = useSelector((state) => state.cartItems );

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch({ type: ACTION_TYPES.setSearch, action: { payload: search } });
  }, [search]);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18v4H3V3zm0 8h18v10H3V11z"
              />
            </svg>
            <Link to="/homepage" className="font-bold text-2xl text-gray-800">
              ShopEase
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center w-1/3">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="Search for products..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <Link
                to="/homepage"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Shop
              </Link>

              {isAuth ? (
                <>
                  <Link
                    to="/aboutpage"
                    className="text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/contactpage"
                    className="text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    Contact
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Cart + Help Icons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h18l-2 13H5L3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 21a2 2 0 11-4 0m-2 0a2 2 0 104 0"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Link>

              <button className="text-gray-700 hover:text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A10.004 10.004 0 0112 2a10.004 10.004 0 016.879 15.804M12 14v.01M12 10h.01"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/homepage"
              className="block text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-gray-700 hover:text-indigo-600 font-medium"
            >
              Shop
            </Link>

            {isAuth ? (
              <>
                <Link
                  to="/aboutpage"
                  className="block text-gray-700 hover:text-indigo-600 font-medium"
                >
                  About
                </Link>
                <Link
                  to="/contactpage"
                  className="block text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="block text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block text-gray-700 hover:text-indigo-600 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}

            <div className="mt-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
