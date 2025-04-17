import { PlayCircleIcon } from "lucide-react";
import { FaHeart } from "react-icons/fa";


const VideoCard = ({ thumbnail, title, description, duration, level, onClick }) => {
    return (
      <div
        className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow transition-transform transform hover:scale-103 cursor-pointer "
        onClick={onClick}
      >
        <div className="relative group"> 
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-cover group-hover:blur-sm transition duration-300"
        />
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ">
          <PlayCircleIcon className="text-white w-15 h-15" />
        </div>
        
        {/* Heart icon top-right */}
        <div className="absolute top-2 right-2 text-gray-600 hover:text-red-500 z-10">
          <FaHeart className="text-xl" />
        </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-500 text-sm font-medium">
              {duration}
            </span>
            <span
              className={`${
                level === "Beginner"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-purple-100 text-purple-800"
              } text-xs px-2 py-1 rounded`}
            >
              {level}
            </span>
          </div>
        </div>
      </div>
    );
  };

  export default VideoCard;