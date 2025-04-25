 
import { PlayCircleIcon } from "lucide-react";
import WatchlistIcon from "./WatchlistIcon";

 const VideoCard = ({
  id,
  courseId,
  thumbnail,
  title,
  description,
  duration,
  level,
  onClick,
}) => {

  return (
    <div
      className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow transform hover:scale-103 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative group">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-50 object-cover group-hover:blur-sm transition duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <PlayCircleIcon className="text-white w-15 h-15" />
        </div>
      </div>

      <div className="pl-2 pt-3 p-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <WatchlistIcon 
              id={id}
              courseId={courseId}
              thumbnail={thumbnail}
              title={title}
              description={description}
              duration={duration}
              level={level}
           />
        </div>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="text-blue-500 text-sm font-medium">{duration}</p>
        <div className="pt-2 flex">
          <p
            className={`${
              level === "Beginner"
                ? "bg-blue-100 text-blue-800"
                : "bg-purple-100 text-purple-800"
            } text-xs px-3 py-1 rounded `}
          >
            {level}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard
