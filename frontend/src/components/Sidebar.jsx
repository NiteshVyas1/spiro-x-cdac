import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaPlay,
  FaShoppingCart,
  FaHeart,
  FaHistory,
  FaCode,
  FaTrophy,
  FaComments,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const navLinks = [
  { label: "Home", icon: <FaHome />, path: "/" },
  { label: "My Courses", icon: <FaPlay />, path: "/mycourses" },
  { label: "Purchases", icon: <FaShoppingCart />, path: "/purchases" },
  { label: "Watchlist", icon: <FaHeart />, path: "/watchlist" },
  { label: "History", icon: <FaHistory />, path: "/history" },
  { label: "Quiz", icon: <FaCode />, path: "/quiz" },
  { label: "Achievements", icon: <FaTrophy />, path: null }, // static
  { label: "Chatbox", icon: <FaComments />, path: null },    // static
];

const mobileNavLabels = ["Home", "My Courses", "History", "Purchases", "Watchlist"];

const Sidebar = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredNavLinks = isMobile
    ? navLinks.filter((item) => mobileNavLabels.includes(item.label))
    : navLinks;

  return (
    <div className="w-full h-16 md:w-64 md:min-h-screen p-2 md:p-5 bg-white fixed bottom-0 md:relative md:bottom-auto z-50 border-t md:border-none">
      <ul className="flex md:flex-col justify-around md:justify-start items-center md:items-start md:space-y-3 space-x-0 px-3">
        {filteredNavLinks.map((item, index) => (
          <li key={index} className="w-full">
            {item.path ? (
              <Link
                to={item.path}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors duration-150 ${
                  location.pathname === item.path
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
