import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left blue section */}
      <div className="w-[40%] bg-[#2F2483]"></div>

      {/* Right form section */}
      <div className="w-[60%] flex justify-center items-center">
        <div className="w-full max-w-sm px-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>

          <label className="block mb-2 font-medium">Enter OTP*</label>
          <div className="flex justify-between mb-6">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
                className="w-10 h-10 text-center border border-gray-400 rounded"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Verify OTP
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
