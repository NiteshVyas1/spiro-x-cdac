import React, { useContext } from 'react';
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';

const WelcomeCard = () => {
  const navigate = useNavigate();
  const { userName } = useContext(ShopContext); // ✅ useContext moved here

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-2xl mt-2 shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 ml-3 md:mb-0 md:mr-4 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Welcome Back, {userName || "Learner"}! 🚀
          </h2>
          <p className="text-sm md:text-base text-gray-100 mb-2">
            Dive into your personalized learning journey today. We’ve added new
            courses, exciting challenges, and exclusive resources to help you
            grow smarter every day.
          </p>
          <button
            className="mt-2 px-5 py-2 border border-white bg-blue-500 text-white font-medium rounded-lg hover:bg-white hover:text-blue-500 transition duration-300 cursor-pointer"
            onClick={() => navigate("/purchases")}
          >
            Explore New Courses
          </button>
        </div>
        <div className="w-full md:w-1/3">
          <img
            src={assets.online_learning}
            alt="Online Learning GIF"
            className="w-full h-52 rounded-lg pr-8 object-cover transform transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
