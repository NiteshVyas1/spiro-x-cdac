import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { ShopContext } from "../context/ShopContext";
import MyCourses from "./MyCourses";
import ContinuePlaying from "../components/ContinuePlaying";
import WelcomeCard from "../components/WelcomeCard";
import RecommendationCard from "../components/RecommendationCard";

const StudentDashboard = () => {
  const { userName } = useContext(ShopContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuy = (course) => {
    addToCart(course);
    toast.success(`${course.name} course added to cart!`);
  };

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

      {/* Continue Playing */}
      <ContinuePlaying />

      {/* My Courses */}
      <MyCourses />

      {/* Our Offerings */}
      <RecommendationCard />
    </div>
  );
};

export default StudentDashboard;
