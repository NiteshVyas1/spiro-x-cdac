import React from "react";
import { Link } from "react-router-dom";

const CourseItem = ({ id, name, description, image }) => {
  return (
    <Link to={`/course/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          className=" w-full object-cover"
          src={image[0]}
          alt={name}
        />
      </div>
      <h3 className="pt-3 pb-1 text-md text-black ">{name}</h3>
    </Link>
  );
};

export default CourseItem;
