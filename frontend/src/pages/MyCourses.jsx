import React from 'react';
import CourseItem from '../components/CourseItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MyCourses = () => {
  const { purchasedCourses } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Conditional heading based on pathname
  const renderHeading = () => {
    if (location.pathname === '/mycourses') {
      return (
        <h2 className="text-2xl font-bold mb-6 underline">My Courses</h2>
      );
    } else if (location.pathname === '/purchases'){
      return (
        <h3 className="text-xl font-semibold mb-6 text-gray-900">Past Purchases</h3>
      );
    } else{
      return (
        <h3 className="text-xl font-semibold mb-6 text-gray-800">My Courses</h3>
      );
    }
  };

  return (
    <div className={`mt-6 ${location.pathname === "/mycourses" ? "pl-6" : ""} flex-1 `}>
      {renderHeading()}

      {purchasedCourses.length === 0 ? (
        <p className="text-gray-600">You haven't purchased any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 gap-y-6">
          {purchasedCourses.map((course, index) => (
              <div
                key={index}
                className="overflow-hidden shadow-sm rounded-lg border border-gray-300 hover:shadow-lg transform hover:scale-103 cursor-pointer"
              >
                <CourseItem
                  id={course._id}
                  name={course.name}
                  image={course.image}
                />
                <button
                  className="mt-2 px-5 py-2 border border-white bg-transparent text-white font-medium rounded-lg hover:bg-white hover:text-blue-500 transition duration-300 cursor-pointer"
                  onClick={() => navigate("/purchases")}
                >
                  View Details
                </button>
              </div>
            ))}
          
        </div>
      )}
    </div>
  );
};

export default MyCourses;
