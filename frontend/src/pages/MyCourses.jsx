// import React from 'react';
// import CourseItem from '../components/CourseItem';
// import { courses } from '../assets/assets';
// import { useLocation } from 'react-router-dom';

// const MyCourses = () => {
//   const location = useLocation();

//   // Conditional heading based on pathname
//   const renderHeading = () => {
//     if (location.pathname === '/') {
//       return <h3 className="text-xl font-semibold mb-4 text-gray-800">My Courses</h3>;
//     } else {
//       return <h2 className="text-2xl font-bold mb-6 underline">My Courses</h2>;
//     }
//   };

//   return (
//     <div className={`mt-6 ${location.pathname === '/' ? '' : 'pl-6'}`}>
//       {renderHeading()}
      
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 gap-y-6">
//         {courses.map((course, index) => (
//           <div
//             key={index}
//             className="overflow-hidden shadow-sm rounded-lg border border-gray-300 hover:shadow-lg transform hover:scale-103 cursor-pointer"
//           >
//             <CourseItem id={course._id} image={course.image} name={course.name} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyCourses;

import React from 'react';
import CourseItem from '../components/CourseItem';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { courses } from '../assets/assets';

const MyCourses = () => {
  const { purchasedCourses } = useCart();
  const location = useLocation();

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
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5 gap-y-6">
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
              </div>
            ))}
         
         {console.log("Purchased Courses:", purchasedCourses)}
          
          
        </div>
      )}
    </div>
  );
};

export default MyCourses;


