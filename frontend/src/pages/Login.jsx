import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { setToken, setUserName, setUserEmail } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        {
          email,
          password,
        }
      );

      // console.log("Login response:", response.data);

      if (response.data.success) {
        setToken(response.data.token); // Store token in context and localStorage
        setUserName(response.data.name); // Set userName in context
        setUserEmail(email); // Set userEmail in context

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", email); // Store email in localStorage
        localStorage.setItem("userId", response.data.userId);


        toast.success("Login successful!");
        navigate("/"); // Redirect to home page after successful login
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during Login:", error);
      const msg = error.response?.data?.message || "Login failed. Try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="flex w-full flex-col md:flex-row h-screen">
      <div className="w-[40%] bg-indigo-800"></div>

      <div className="w-[60%] flex items-center justify-center bg-white">
        <div className="w-full max-w-sm px-6">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form className="space-y-5" onSubmit={onSubmitHandler}>
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
              <Link to="/login/ResetPassword">
                <div className="text-right text-sm mt-1 text-blue-600 hover:underline cursor-pointer">
                  Forgot password?
                </div>
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600">
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
