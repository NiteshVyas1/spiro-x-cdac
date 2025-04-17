import React, { useState, useRef, useEffect, useContext } from "react";
import { Bell } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa"; // ✅ Added
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Searchbar from "../components/Searchbar";
import { assets } from "../assets/assets";

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userName, userEmail, userInitial, cartItems } = useContext(ShopContext); // ✅ Added cartItems

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-between p-4 shadow-md">
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
      <div className="flex items-center space-x-6 relative" ref={dropdownRef}>
        {/* Bell Icon */}
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

        {/* Avatar Button */}
        <div
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-medium cursor-pointer"
        >
          {userInitial ? userInitial : ""}
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-14 w-60 bg-white shadow-lg rounded-lg border z-50">
            <div className="p-4 border-b flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-semibold">
                {userInitial || "U"}
              </div>
              <p className="font-medium">{userName || "Loading..."}</p>
              <p className="text-sm text-gray-500">{userEmail || "Loading..."}</p>
            </div>
            <ul className="divide-y">
              <li className="p-1 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="p-1 hover:bg-gray-100 cursor-pointer">Appearance</li>
              <li className="p-1 hover:bg-gray-100 cursor-pointer">Payments</li>
              <li className="p-1 hover:bg-gray-100 cursor-pointer">Help</li>
              <li className="p-1 hover:bg-gray-100 cursor-pointer">Feedback</li>
              <Link to="/profile">
                <li className="p-1 hover:bg-gray-100 cursor-pointer">Profile</li>
              </Link>
              <li className="p-1 hover:bg-gray-100 cursor-pointer text-red-500">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
