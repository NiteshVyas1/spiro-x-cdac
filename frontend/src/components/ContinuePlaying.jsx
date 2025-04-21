// ContinuePlaying.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle } from "lucide-react";
import WatchlistIcon from "./WatchlistIcon";
import { useCart } from "../context/CartContext";

const ContinuePlaying = () => {
  const navigate = useNavigate();
  const { continueWatching } = useCart();

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Continue Playing
      </h3>

      {continueWatching.length === 0 ? (
        <p className="text-gray-500">No videos in progress.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {continueWatching.slice(0, 3).map((video) => (
            <div
              key={video.id}
              className="overflow-hidden shadow-sm rounded-lg border border-gray-300 hover:shadow-lg transform hover:scale-103 cursor-pointer"
              onClick={() =>
                navigate(`/course/${video.courseId}/${video.id}`)
              }
            >
              <div className="relative group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover group-hover:blur-sm transition duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <PlayCircle className="text-white w-15 h-15" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{video.title}</h4>
                  <WatchlistIcon {...video} />
                </div>
                <p className="text-sm text-gray-700">
                  {video.duration} • {video.level}
                </p>
              </div>
              <div className="h-1 bg-gray-300 w-full">
                <div className="h-1 bg-red-500 w-3/5 rounded-r" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContinuePlaying;
