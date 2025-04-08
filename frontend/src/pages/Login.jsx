import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Links } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left side (blue/purple panel) */}
      <div className="w-[40%] bg-indigo-800"></div>

      {/* Right side (login form) */}
      <div className="w-[60%] flex items-center justify-center bg-white">
        <div className="w-full max-w-sm px-6">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form className="space-y-5">
            {/* Username */}
            <div>
              <label className="text-sm font-medium block mb-1">
                User name *
              </label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium block mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="abc@gmail.com"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <Link to="/login/ResetPassword">
                <div className="text-right text-sm mt-1 text-blue-600 hover:underline cursor-pointer">
                  Forgot password?
                </div>
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Create account */}
            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <Link to="/Signup" className="text-blue-600">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
