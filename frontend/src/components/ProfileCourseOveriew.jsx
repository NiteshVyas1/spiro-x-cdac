import React from 'react'
import { Code, Code2, Sigma } from 'lucide-react';

const ProfileCourseOveriew = () => {


    const courses = [
        { name: 'C', icon: <Code />, progress: 100 },
        { name: 'C++', icon: <Code2 />, progress: 100 },
        { name: 'Python', icon: <Sigma />, progress: 100 },
    ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mr-20">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Course Status</h2>
      <button className="text-sm text-blue-600">See all</button>
    </div>
    <div className="flex space-x-4 overflow-x-auto">
      {courses.map((course, index) => (
        <div key={index} className="flex items-center space-x-2 border px-4 py-2 rounded-lg shadow-sm bg-gray-50">
          {course.icon}
          <div>
            <p className="text-sm font-medium">{course.name}</p>
            <p className="text-xs text-gray-500">{course.progress}%</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
  
}

export default ProfileCourseOveriew
