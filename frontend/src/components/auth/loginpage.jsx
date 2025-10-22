import { Link, useNavigate } from "react-router";
import { MainLayoutComponent } from "../MainLayoutComponent";
import { ACTION_TYPES } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.isAuth);

  useEffect(() => {
    if (isAuth) {
      setTimeout(() => {
        console.log("navigated");
        navigate("/homepage");
      }, 1000);
    }
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!email || !password) {
      setMessage("Both fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Invalid email format.");
      return false;
    }

    setMessage("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/auth/signin`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      );

      if (res.data.success) {
        setMessage("Login successful! Redirecting...");
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: ACTION_TYPES.updateIsAuth,
          payload: true,
        });
      } else {
        throw new Error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayoutComponent>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 p-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8 ">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign in to your account to continue
          </p>

          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div className="flex justify-between text-sm">
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                loading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {message && (
            <p
              className={`text-center mt-4 text-sm ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="w-5 h-5"
              />
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to={"/signup"}
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
        <div className="max-w-120 ml-50">
          <div className="text-center">
            <img src="/images/iPhone-16-Teal-1.png" />
          </div>
          <p className="text-xl font-medium text-slate-900">
            "Great project management isn’t about control — it’s about clarity.
            The clearer the path, the smoother the execution."
          </p>
          <h1 className="mt-2 text-sm text-slate-500">
            <strong className="text-blue-600 font-semibold">
              — Danish Rizwan
            </strong>
            , Founder of Project Manager
          </h1>
        </div>
      </div>
    </MainLayoutComponent>
  );
}
