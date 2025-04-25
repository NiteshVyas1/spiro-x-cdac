import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { assets, courses } from "../assets/assets";
import axios from "axios";

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
  {
    name: "C Programming",
    image: assets.c,
    price: "₹1299",
    rating: 4.9,
  },
];

const RecommendationCard = () => {
  const { addToCart } = useCart();
  const [showAll, setShowAll] = useState(false);

  const visibleRecommendations = showAll ? recommendations : recommendations.slice(0, 3);

  const fetchCart = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post("http://localhost:4000/api/cart/get", { userId });
      console.log(response.data.cartData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cart.");
    }
  };

  const handleBuy = async (course) => {
    try {
      const fullCourse = courses.find((c) => c.name === course.name);

      if (!fullCourse) {
        toast.error("Course not found in list.");
        return;
      }

      const userId = localStorage.getItem("userId");

      const response = await axios.post("http://localhost:4000/api/cart/add", {
        userId,
        itemId: fullCourse._id, 
      });

      if (response.data.success) {
        toast.success(`${fullCourse.name} added to cart!`);
        fetchCart(); // Fetch the updated cart data after adding
      } else {
        toast.error("Failed to add course to cart.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding course.");
    }
  };

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Popular Courses For You!</h3>
        {recommendations.length > 3 && (
          <button
            className="text-lg text-gray-900 hover:text-blue-700"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View All >"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleRecommendations.map((course, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 shadow-lg w-full mx-auto overflow-hidden"
          >
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold text-lg">{course.name}</h4>
              <p className="text-sm text-gray-600">
                By Chembur Computer Institute
              </p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">
                    {i < Math.floor(course.rating) ? "★" : "☆"}
                  </span>
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  ({course.rating})
                </span>
              </div>
              <p className="text-gray-800 font-semibold mt-1">{course.price}</p>
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
  );
};

export default RecommendationCard;
