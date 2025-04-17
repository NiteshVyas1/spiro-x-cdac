// VideoPlayer.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import courseVideos from "../assets/courseVideos";

const VideoPlayer = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  const videos = courseVideos[courseId];
  const currentIndex = videos?.findIndex((v) => v.id === lectureId);
  const currentVideo = videos?.[currentIndex];
  //const nextVideo = videos?.[currentIndex + 1];

  if (!currentVideo) {
    return <div className="text-red-500 p-6">Video not found</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          {currentVideo.title}
        </h1>

        <video
          controls
          autoPlay
          className="w-full h-[60vh] rounded-lg mb-4 border"
          src={currentVideo.videoUrl}
        />

        <p className="text-gray-600 mb-4">{currentVideo.description}</p>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Duration: {currentVideo.duration} | Level: {currentVideo.level}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
