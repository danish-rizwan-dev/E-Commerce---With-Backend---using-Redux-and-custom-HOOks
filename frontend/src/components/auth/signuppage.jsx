import { Link, useNavigate } from "react-router";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MainLayoutComponent } from "../MainLayoutComponent";
import axios from "axios";

export function Signup() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const isAuth = useSelector((state) => state.isAuth);
  useEffect(() => {
    if (isAuth) {
      navigate("/homepage");
    }
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!name || !email || !password || !confirmPassword) {
      setMessage("All fields are required.");
      return false;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return false;
    }

    setMessage("");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/auth/signup`,
        data,
        {
          headers: {
            "ngrok-skip-browser-warning": true,
          },
        }
      );
      if (res.data.success) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/signin"), 1500);
      } else {
        throw new Error(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayoutComponent>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-120 mr-50">
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
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Create Account ✨
          </h2>

          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                ref={nameRef}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                ref={confirmPasswordRef}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-semibold rounded-xl shadow-md transition-all duration-200 ${
                loading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {message && (
            <p
              className={`text-center mt-4 text-sm ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
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

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </MainLayoutComponent>
  );
}
