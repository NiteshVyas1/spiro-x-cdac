import React from "react";
import { Link } from "react-router-dom";

const CourseItem = ({ id, name, image }) => {
  return (
    <Link to={`/course/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out w-full h-40 object-cover rounded-lg"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-semibold">{name}</p>
    </Link>
  );
};

export default CourseItem;
