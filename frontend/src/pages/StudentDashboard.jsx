import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { ShopContext } from "../context/ShopContext";
import MyCourses from "./MyCourses";
import ContinuePlaying from "../components/ContinuePlaying";
import WelcomeCard from "../components/WelcomeCard";

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
      <section>
        <h3 className="text-xl font-semibold mb-4 pl-3 pt-10">Our Offerings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendations.map((course, index) => (
            <div
              key={index}
              className="overflow-hidden shadow-sm rounded-lg border border-gray-300 hover:shadow-lg transform hover:scale-103 cursor-pointer"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-50 rounded object-cover"
              />
              <div className="pl-2 pb-4">
                <h4 className="font-bold mt-2">{course.name}</h4>
                <p className="text-sm text-gray-600">
                  By Chembur Computer Institute
                </p>
                <div>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">
                      {i < Math.floor(course.rating) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    ({course.rating})
                  </span>
                </div>
                <p className="text-gray-800">{course.price}</p>
                <button
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600 cursor-pointer"
                  onClick={() => handleBuy(course)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
