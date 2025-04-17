// CourseItem.jsx
import React from "react";
import { Link } from "react-router-dom";

const CourseItem = ({ id, name, image }) => {
  return (
    <Link to={`/course/${id}`} className="text-gray-800 cursor-pointer block">
      <div className="overflow-hidden">
        <img className="w-full h-50 object-cover" src={image && image[0]} alt={name} />
      </div>
      <h3 className="pt-3 pb-1 text-lg font-semibold text-black ml-3">{name}</h3>
      <p className="text-sm text-gray-800 ml-3 pb-5">By CDAC Chembur Computer Institute</p>
    </Link>
  );
};

export default CourseItem;
