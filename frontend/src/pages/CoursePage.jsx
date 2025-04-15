// CoursePage.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, courses } from "../assets/assets";
import VideoCard from '../components/VideoCard';
import RecommendationCard from '../components/RecommendationCard';
import courseVideos from "../assets/courseVideos";

const CoursePage = () => {
  const { id } = useParams();
  const normalizedId = id.toLowerCase();
  const course = courses.find((c) => c._id === id);
  const navigate = useNavigate();

  if (!course) {
    return <h2 className="text-center text-red-500">Course Not Found</h2>;
  }

  const videosToShow = courseVideos[id] || [];

  const handleVideoClick = (videoId) => {
    navigate(`/course/${id}/${videoId}`);
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">{course.name}</h1>

      {/* Video Lectures */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Video Lectures</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videosToShow.map((video) => (
            <VideoCard
              key={video.id}
              thumbnail={video.thumbnail}
              title={video.title}
              description={video.description}
              duration={video.duration}
              level={video.level}
              onClick={() => handleVideoClick(video.id)}
            />
          ))}
        </div>
      </section>

      {/* Recommendations */}
      
      <RecommendationCard />
    </div>
  );
};

export default CoursePage;

