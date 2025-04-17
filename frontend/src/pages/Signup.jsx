import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("Registration response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      const msg =
        error.response?.data?.message || "Registration failed. Try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Blue Panel (40%) */}
      <div className="w-[40%] bg-indigo-800"></div>

      {/* Right - Form Area (60%) */}
      <div className="w-[60%] flex items-center justify-center bg-white">
        <div className="w-full max-w-sm px-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>

          <form className="space-y-4" onSubmit={onSubmitHandler}>
            <div>
              <label className="text-sm block mb-1">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="abc"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="abc@gmail.com"
                className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Password</label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md pr-10 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign up
            </button>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 cursor-pointer">
                Sign in
              </Link>
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
