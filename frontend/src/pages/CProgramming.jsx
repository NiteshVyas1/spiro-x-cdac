import React from 'react';
import CourseVideos from '../components/CourseVideos';


const CProgramming = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold p-6">C Programming</h1>
      <CourseVideos  courseId="c" />
    </div>
  );
};

export default CProgramming;