import React from "react";
import { assets } from "../assets/assets";
import Searchbar from "../components/Searchbar";
import { Bell } from "lucide-react"; // lucide-react for icons
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between p-4 shadow-md">
      {/* Left - Logo */}
      <div className="flex items-center ">
        <Link to="/" className="flex items-center">
          <img
            src={assets.spiro}
            alt="spiro logo"
            className="h-20 w-40 cursor-pointer"
          />
        </Link>
      </div>

      {/* Center - Searchbar */}
      <div className="flex-1 px-4">
        <Searchbar />
      </div>

      {/* Right - Nav Icons */}
      <div className="flex items-center space-x-6">
        <Bell className="w-7 h-7 cursor-pointer " />
        <Link to = "/profile" className="flex items-center space-x-2">

        <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-medium">
          V
        </div>

        </Link>

      </div>
    </div>
  );
};

export default TopBar;
