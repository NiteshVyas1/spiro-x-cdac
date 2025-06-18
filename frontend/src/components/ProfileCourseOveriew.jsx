import React from 'react'
import { Code, Code2, Sigma } from 'lucide-react';

const ProfileCourseOveriew = () => {

    const courses = [
        { name: 'C++', icon: <Code2 />, progress: 75 },
        { name: 'Python', icon: <Sigma />, progress: 80 },
    ];

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Course Status</h2>
        <button className="text-sm text-blue-600 hover:underline">See all</button>
      </div>
      <div className="flex space-x-6 overflow-x-auto w-full">
        {courses.map((course, index) => (
          <div key={index} className="flex flex-col items-start space-y-2 border border-gray-200 px-6 py-4 rounded-lg shadow-sm bg-gray-50 w-48 flex-shrink-0">
            <div className="flex items-center space-x-3 text-blue-600">
              {course.icon}
              <p className="text-lg font-semibold">{course.name}</p>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{course.progress}% completed</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileCourseOveriew
