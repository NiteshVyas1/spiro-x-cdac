import React, { useContext } from "react";
import CourseItem from "../components/CourseItem";
import { assets, courses } from "../assets/assets";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import { ShopContext } from "../context/ShopContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { PlayCircle } from "lucide-react";
import courseVideos from "../assets/courseVideos";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { userName } = useContext(ShopContext);
  const { addToCart } = useCart(); // hook to access cart context
  const navigate = useNavigate();

  const handleBuy = (course) => {
    addToCart(course); // Send course to cart
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
    <div>
    
      <div className="flex min-h-screen bg-white">
      
    

        {/* Main Content */}
        <div className="flex-1 p-5">
          {/* Greeting */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-2xl mt-2 shadow-xl flex flex-col md:flex-row items-center justify-between">
            {/* Left Side: Text */}
            <div className="mb-4 ml-3 md:mb-0 md:mr-4 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-1">
                Welcome Back, {userName || "Learner"}! 🚀
              </h2>
              <p className="text-sm md:text-base text-gray-100 mb-2">
                Dive into your personalized learning journey today. We’ve added
                new courses, exciting challenges, and exclusive resources to
                help you grow smarter every day.
              </p>
              <button className="mt-2 px-5 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition duration-300 cursor-pointer">
                Explore New Courses
              </button>
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/3">
              <img
                src={assets.online_learning}
                alt="Online Learning GIF"
                className="w-full h-52 rounded-lg pr-8 object-cover transform transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>

          {/* My Courses */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">My Courses</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 gap-y-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="overflow-hidden shadow-sm rounded-lg border border-gray-300 hover:shadow-lg transform hover:scale-103 cursor-pointer"
                >
                  <CourseItem id={course._id} image={course.image} />
                  <p className="ml-3 font-semibold">{course.name}</p>
                  <p className="text-sm text-gray-800 ml-3 pb-5">
                    By CDAC Chembur Computer Institute
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Playing */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Continue Playing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.entries(courseVideos)
                .flatMap(([courseId, videos]) =>
                  videos.map((video) => ({ ...video, courseId }))
                )
                .slice(3, 5)
                .map((video) => (
                  <div
                    key={video.id}
                    className="overflow-hidden shadow-sm rounded-lg border border-gray-300 hover:shadow-lg transform hover:scale-103 cursor-pointer"
                    onClick={() =>
                      navigate(`/course/${video.courseId}/${video.id}`)
                    }
                  >
                    <div className="relative group">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover group-hover:blur-sm transition duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ">
                        <PlayCircle className="text-white w-15 h-15" />
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold">{video.title}</h4>
                      <p className="text-sm text-gray-500">
                        {video.duration} • {video.level}
                      </p>
                    </div>

                    <div className="h-1 bg-gray-300 w-full">
                      <div className="h-1 bg-red-500 w-3/5 rounded-r"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Our Offerings */}
          <section>
            <h3 className="text-xl font-semibold mb-4 pl-3 pt-10">
              Our Offerings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {recommendations.map((course, index) => (
                <div
                  key={index}
                  className="overflow-hidden shadow-sm rounded-lg border border-gray-300 hover:shadow-lg transform hover:scale-103 cursor-pointer"
                >
                  <img
                    src={course.image}
                    alt={course.name}
                    className=" w-full h-50 rounded object-cover"
                  />
                  <div className="pl-2 pb-4">
                    <h4 className="font-bold mt-2">{course.name}</h4>
                    <p className="text-sm text-gray-600">
                      By Chembur Computer Institute
                    </p>
                    <div>
                      {[...Array(3)].map((_, i) => (
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
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
