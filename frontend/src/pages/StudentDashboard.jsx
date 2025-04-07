import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CourseItem from "../components/CourseItem";
import { assets, courses } from "../assets/assets";
import TopBar from "../components/TopBar";

const StudentDashboard = () => {
  return (
    <div>
    <TopBar/>
    <div className="flex min-h-screen bg-gray-100">
      {/* SideBar Component */}

      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-5">
        {/* Greeting */}
        <div className="bg-blue-600 text-white p-9 rounded-lg mt-6 shadow-lg ">
          <h2 className="text-xl font-semibold">Welcome, Student </h2>
          <p>Announcement: new course update</p>
          <button className="mt-2 px-4 py-2 bg-white text-blue-600 rounded-lg">
            View Details
          </button>
        </div>

        {/* Course Sections */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Continue Playing</h3>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={assets.c}
                  alt="Course"
                  className="w-full"
                />
                <div className="p-4">
                  <h4 className="font-semibold">
                    C++ Introduction and Functions
                  </h4>
                  <p className="text-sm text-gray-500">
                    21k views • 2 days ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">My Courses</h3>
          <div className="grid grid-cols-2 gap-4">
            {["Python", "C++"].map((course, i) => (
              <Link
                key={i}
                to={`/MyCourses`} // or your desired route path
                className="bg-white rounded-lg shadow-md overflow-hidden block hover:shadow-lg transition-shadow"
              >
                <img
                  src="https://via.placeholder.com/300"
                  alt={course}
                  className="w-full"
                />
                <div className="p-4">
                  <h4 className="font-semibold">{course}</h4>
                  <p className="text-sm text-gray-500">
                    By Chembur Computer Institute
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div> */}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">My Courses</h3>
          {/*Map Courses*/}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {courses.map((course, index) => (
              <CourseItem
                key={index}
                name={course.name}
                id={course._id}
                image={course.image}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Our Offerings</h3>
          <div className="grid grid-cols-3 gap-4">
            {["C Programming", "Python", "C++"].map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={assets.c}
                  alt={course}
                  className="w-full"
                />
                <div className="p-4">
                  <h4 className="font-semibold">{course}</h4>
                  <p className="text-sm text-gray-500">
                    By Chembur Computer Institute
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentDashboard;
