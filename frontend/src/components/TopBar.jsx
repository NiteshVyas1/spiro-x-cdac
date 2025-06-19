import React, { useState, useRef, useEffect, useContext } from "react";
import { Bell } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa"; // ✅ Added
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Searchbar from "../components/Searchbar";
import { assets } from "../assets/assets";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
// import FeedbackPage from './pages/FeedbackPage';
// import HelpPage from './pages/HelpPage';

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userName, userEmail, userInitial, token, setToken, setUserId } = useContext(ShopContext); // ✅ Added cartItems
  const { cartItems } = useCart(); // ✅ Added
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Clear token and userId from context
    setToken(null);
    setUserId(null);

    // Clear from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Show success message
    toast.success("Logged out successfully!");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-60 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={assets.spiro} alt="Logo" className="h-15 w-auto " />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <Searchbar />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <FaShoppingCart className="h-6 w-6 text-gray-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                  {userInitial}
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border border-gray-100 transform transition-all duration-200 ease-out origin-top-right">
                  {/* User Info Section */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                        {userInitial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {userName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link to="/profile">
                      <div className="px-4 py-3 hover:bg-blue-50 flex items-center space-x-3 cursor-pointer group transition-colors duration-200">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700 group-hover:text-blue-600">Profile</span>
                      </div>
                    </Link>

                    <div className="px-4 py-3 hover:bg-blue-50 flex items-center space-x-3 cursor-pointer group transition-colors duration-200">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">Settings</span>
                    </div>

                    <div className="px-4 py-3 hover:bg-blue-50 flex items-center space-x-3 cursor-pointer group transition-colors duration-200">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">Appearance</span>
                    </div>

                    {/* Help menu item */}
                    <Link to='/help' className="px-4 py-3 hover:bg-blue-50 flex items-center space-x-3 cursor-pointer group transition-colors duration-200">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">Help</span>
                    </Link>

                    {/* Feedback menu item */}
                    <Link to='/feedback' className="px-4 py-3 hover:bg-blue-50 flex items-center space-x-3 cursor-pointer group transition-colors duration-200">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M18 10c0 3.314-3.582 6-8 6-.982 0-1.927-.09-2.813-.26-.31-.06-.63.03-.86.24l-2.13 1.93A1 1 0 013 17.13V15.5c0-.28-.11-.55-.3-.75C1.57 13.36 1 11.74 1 10c0-3.314 3.582-6 8-6s8 2.686 8 6z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 group-hover:text-blue-600">Feedback</span>
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div onClick={handleLogout} className="mt-2 border-t">
                    <div className="px-4 py-3 hover:bg-red-50 flex items-center space-x-3 cursor-pointer group transition-colors duration-200">
                      <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-200 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-red-600 group-hover:text-red-700 font-medium">Logout</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
