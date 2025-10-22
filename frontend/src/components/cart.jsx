import { useEffect } from "react";
import { MainLayoutComponent } from "./MainLayoutComponent";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFetchCartItems } from "../hooks/useFetchCartItems";
import { ACTION_TYPES } from "../store";
import axios from "axios";

export function Cart() {
  const isAuth = useSelector((state) => state.isAuth);
  const cartItems = useSelector((state) => state.cartItems); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cart = useFetchCartItems({
    url: `${process.env.REACT_APP_API_KEY}/cartItems`,
  });

  // Update cart in global state when data is fetched
  useEffect(() => {
    if (cart.data) {
      dispatch({ type: ACTION_TYPES.setCartItems, payload: cart.data });
    }
  }, [cart.data]);

  // Handle increment, decrement, or removal of items
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

      // Refresh cart data
      const updated = await axios.get(`${process.env.REACT_APP_API_KEY}/cartItems`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      dispatch({
        type: ACTION_TYPES.setCartItems,
        payload: updated.data.data,
      });
    } catch (err) {
      console.log("Error updating cart:", err);
    }
  };

  // Totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 25 : 0;
  const tax = subtotal > 0 ? 18 : 0;
  const total = subtotal + shipping + tax;

  // Navigation
  const handleCheckout = () => {
    navigate(isAuth ? "/checkout" : "/signin");
  };

  return (
    <MainLayoutComponent>
      <section className="min-h-screen bg-gray-50 py-30 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Your Shopping Cart
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-lg">Your cart is empty 🛍️</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white rounded-2xl shadow-md p-4 sm:p-6 transition hover:shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1 ml-6">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-indigo-600 font-semibold mt-1">
                      ${item.price}
                    </p>
                    <div className="flex items-center mt-3 space-x-3">
                      <button
                        onClick={() => handleCartChange(item.id, -1)
                          
                        }
                        className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleCartChange(item.id, 1)}
                        className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          handleCartChange(item.id, -item.quantity)
                        }
                        className="ml-4 text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-gray-700 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
              Order Summary
            </h3>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-6 space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 rounded-full font-medium hover:bg-indigo-700 transition"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate("/products")}
                className="w-full bg-gray-100 text-gray-800 py-3 rounded-full font-medium hover:bg-gray-200 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayoutComponent>
  );
}
