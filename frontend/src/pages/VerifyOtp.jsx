import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("pendingEmail");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      if (index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/user/resend-otp", { email });

      if (response.data.success) {
        toast.success("OTP resent successfully! 📩");
        setTimer(180);
        setCanResend(false);
        localStorage.setItem("otpId", response.data.otpId);
      } else {
        toast.error(response.data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Server error. Try again later!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Important to prevent form default refresh

    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      toast.warning("Please enter all OTP fields.");
      return;
    }

    const otpId = localStorage.getItem("otpId");

    if (!otpId) {
      toast.error("OTP ID not found. Please request OTP again.");
      return;
    }

    try {
      console.log("Sending data to verify-otp:", { email, otp: otpCode, otpId });

      const response = await axios.post("http://localhost:4000/api/user/verify-otp", {
        email,
        otp: otpCode,
        otpId,
      });

      if (response.data.success) {
        toast.success("OTP Verified! 🎉");
        localStorage.removeItem("pendingEmail");
        localStorage.removeItem("otpId");
        navigate("/login");
      } else {
        toast.error(response.data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-[40%] bg-[#2F2483]"></div>

      <div className="w-[60%] flex justify-center items-center">
        <div className="w-full max-w-sm px-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>

          <form onSubmit={handleSubmit}>
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
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      document.getElementById(`otp-${index - 1}`).focus();
                    }
                    if (e.key === "ArrowLeft" && index > 0) {
                      document.getElementById(`otp-${index - 1}`).focus();
                    }
                    if (e.key === "ArrowRight" && index < 5) {
                      document.getElementById(`otp-${index + 1}`).focus();
                    }
                  }}
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
          </form>

          <p className="text-sm text-center mt-4">
            Didn't receive the OTP?{" "}
            {canResend ? (
              <button onClick={handleResendOtp} className="text-blue-600 hover:underline">
                Resend OTP
              </button>
            ) : (
              <span className="text-gray-400">
                Resend in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
              </span>
            )}
          </p>

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

export default VerifyOtp;
