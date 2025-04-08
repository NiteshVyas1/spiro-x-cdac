import React from "react";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left - Blue Panel (40%) */}
      <div className="w-[40%] bg-indigo-800"></div>

      {/* Right - Form Area (60%) */}
      <div className="w-[60%] flex items-center justify-center bg-white">
        <div className="w-full max-w-sm px-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>

          <form className="space-y-4">
            <div>
              <label className="text-sm block mb-1">Name*</label>
              <input
                type="text"
                placeholder="abc"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none"
              />
            </div>

            <div>
              <label className="text-sm block mb-1">Phone No. *</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none"
              />
            </div>

            <div>
              <label className="text-sm block mb-1">Password *</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md pr-10 outline-none"
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                  <FaEye />
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm block mb-1">Confirm Password *</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md pr-10 outline-none"
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                  <FaEye />
                </span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Login
            </button>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 cursor-pointer">Sign in</Link>
            </p>

            <div className="text-center text-gray-400">OR</div>

            <div className="flex justify-center space-x-4 text-3xl">
              <FcGoogle />
              <FaLinkedin className="text-blue-600" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
