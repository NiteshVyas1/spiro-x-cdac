import React from "react";
import { Link } from "react-router-dom";

const GenerateOtp = () => {
  return (
    <div className="flex h-screen">
      {/* Left side - blue section */}
      <div className="w-[40%] bg-[#2F2483]"></div>

      {/* Right side - form */}
      <div className="w-[60%] flex justify-center items-center">
        <div className="w-full max-w-sm px-4">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Generate OTP
          </h2>

          <form>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Email*</label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                className="w-full px-3 py-2 border border-gray-400 rounded"
              />
            </div>
            <Link to="/generate-otp/verify-otp">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Generate OTP
              </button>
            </Link>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenerateOtp;
