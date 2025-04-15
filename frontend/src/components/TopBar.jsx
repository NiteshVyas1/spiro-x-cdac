import React from "react";
import { assets } from "../assets/assets";
import Searchbar from "../components/Searchbar";
import { Bell } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // 👈 import cart hook

const TopBar = () => {
  const { cartItems } = useCart(); // 👈 get cart items

  return (
    <div className="flex items-center justify-between p-4">
      {/* Left - Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={assets.spiro} alt="spiro logo" className="h-20 w-40 cursor-pointer" />
        </Link>
      </div>

      {/* Center - Searchbar */}
      <div className="flex-1 px-4">
        <Searchbar />
      </div>

      {/* Right - Icons */}
      <div className="flex items-center space-x-6">
        <Bell className="w-7 h-7 cursor-pointer" />

        {/* Cart Icon with badge */}
        <Link to="/cart" className="relative">
          <FaShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* Profile Icon */}
        <Link to="/profile" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-medium">
            V
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
