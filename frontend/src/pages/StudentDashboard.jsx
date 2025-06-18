import React, { useContext } from "react";
import { assets, courses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { ShopContext } from "../context/ShopContext";
import MyCourses from "./MyCourses";
import ContinuePlaying from "../components/ContinuePlaying";
import WelcomeCard from "../components/WelcomeCard";
import RecommendationCard from "../components/RecommendationCard";
import axios from "axios";

const StudentDashboard = () => {
  const { userName } = useContext(ShopContext);
  const { addToCart, continueWatching, purchasedCourses } = useCart();
  const navigate = useNavigate();

 
 

  const recommendations = [
    {
      name: "Java",
      image: assets.java,
      price: "₹1999",
      rating: 4.5,
    },
    {
      name: "Web Development",
      image: assets.web,
      price: "₹1599",
      rating: 4.0,
    },
    {
      name: "Generative AI",
      image: assets.genAI,
      price: "₹1799",
      rating: 4.7,
    },
  ];

  return (
    <div className="flex-1 p-5 pt-2">
      {/* Welcome Card */}
      <WelcomeCard />

      {/* Continue Playing - Only show if user has watched videos */}
      {continueWatching.length > 0 && <ContinuePlaying />}

      {/* My Courses - Only show if user has purchased courses */}
      {purchasedCourses.length > 0 && <MyCourses />}

      {/* Our Offerings */}
      <RecommendationCard />
    </div>
  );
};

export default StudentDashboard;

