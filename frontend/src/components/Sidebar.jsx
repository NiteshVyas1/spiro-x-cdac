import React from 'react'
import { 
    FaSearch, FaMicrophone, FaHome, FaTrophy, FaShoppingCart, 
    FaHistory, FaHeart, FaCode, FaComments 
  } from "react-icons/fa";


const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-5">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">SPIRO</h1>    
          <ul className="py-2 space-y-4">
          <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600"><FaHome /> <span>Home</span></li>
          <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600"><FaTrophy /> <span>Achievements</span></li>
          <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600"><FaShoppingCart /> <span>Purchases</span></li>
          <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600"><FaHistory /> <span>History</span></li>
          <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600"><FaHeart /> <span>Watchlist</span></li>
          <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600"><FaCode /> <span>Code Compiler</span></li>
          <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600"><FaComments /> <span>Chatbox</span></li>
        </ul>
    </div>
  )

}

export default Sidebar

