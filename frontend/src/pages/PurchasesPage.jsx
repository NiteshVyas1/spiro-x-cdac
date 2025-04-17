// src/pages/PurchasesPage.jsx
import React from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const pastPurchases = [
  {
    name: "C Programming",
    institute: "CDAC Gist Pace Jai Enterprises Chembur Computer Institute",
    date: "27th March'25",
    image: assets.c,
  },
  {
    name: "Python",
    institute: "CDAC Gist Pace Jai Enterprises Chembur Computer Institute",
    date: "24th March'25",
    image: assets.python,
  },
];

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

const PurchasesPage = () => {
  const { addToCart } = useCart(); //hook to access cart context
  const handleBuy = (course) => {
    addToCart(course); // Send course to cart
    toast.success(`${course.name} course added to cart!`);
  };

  return (
    <div className="flex-1 p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 underline">Purchases</h2>

      {/* Recommendations Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4 pl-2 ">Recommendations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 ">
          {recommendations.map((course, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 shadow-lg max-w-sm w-full mx-auto"
            >
              <img
                src={course.image}
                alt={course.name}
                className=" w-full h-50 object-cover rounded-t-lg "
              />
              <div className="pl-2 pb-4">
                <h4 className="font-bold mt-2">{course.name}</h4>
                <p className="text-sm text-gray-600">
                  By Chembur Computer Institute
                </p>
                <div>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">
                      {i < Math.floor(course.rating)
                        ? "★"
                        : i < course.rating
                        ? "☆"
                        : "☆"}
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

      {/* Past Purchases Section */}
      <section className="px-4 pt-8 pl-2">
        <h3 className="text-xl font-semibold mb-6">Past purchases</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastPurchases.map((course, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-50 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold">{course.name}</h4>
                <p className="text-sm text-gray-700 mb-1">{course.institute}</p>
                <p className="text-xs text-gray-500">Date: {course.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PurchasesPage;
