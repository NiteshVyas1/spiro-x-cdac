import React from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <div className="flex h-screen">
      {/* Left - Blue Section */}
      <div className="w-[40%] bg-[#372D8A]"></div>

      {/* Right - Form Section */}
      <div className="w-[60%] flex items-center justify-center">
        <div className="w-[80%] max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 mb-15">Reset Password</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">New Password*</label>
              <input
                type="password"
                placeholder="abc@gmail.com"
                className="w-full border border-gray-400 px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mt-5">Confirm Password*</label>
              <input
                type="password"
                placeholder="abc@gmail.com"
                className="w-full border border-gray-400 px-3 py-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-10"
            >
              Reset Password
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
