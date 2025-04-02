// import React from "react";
// import { useParams } from "react-router-dom";
// import { courses } from "../assets/assets"; // Import course data
// import Sidebar from "../components/Sidebar";
// import Searchbar from "../components/Searchbar";
// import VideoCard from '../components/VideoCard';
// import RecommendationCard from '../components/RecommendationCard';
// import VideoPlayerModal from "../components/VideoPlayer";

// const CoursePage = () => {
//   const { id } = useParams();
//   const course = courses.find((c) => c._id === id); // Find the selected course

//   if (!course) {
//     return <h2 className="text-center text-red-500">Course Not Found</h2>;
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar (Fixed Full Height) */}
//       <div className="w-1/5 bg-gray-100 p-4 h-full">
//         <Sidebar />
//       </div>

//       {/* Right Section (Searchbar + Content) */}
//       <div className="flex flex-col w-4/5">
//         {/* Searchbar - Positioned at the Top */}
//         <div className="p-4 bg-white shadow-md">
//           <Searchbar />
//         </div>

//         {/* Main Content Below Searchbar */}
//         {/* <div className="p-6 overflow-auto">
//           <h1 className="text-3xl font-bold text-blue-600 mb-4">
//             {course.name}
//           </h1>  
//         </div> */}

//         {/* Main Content Below Searchbar */}
// <div className="p-6 overflow-auto">
//   {/* Dynamic Course Title */}
//   <h1 className="text-3xl font-bold text-blue-600 mb-6">
//   {course.name}
//   </h1>

//   {/* Video Lectures Section */}
//   <section className="mb-12">
//     <h2 className="text-2xl font-semibold mb-4">Video Lectures</h2>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {window.location.pathname.includes('/course/Python') ? (
//         /* Python Videos */
//         <>
//           <VideoCard 
//             thumbnail="/thumbnails/python-intermediate.jpg"
//             title="1. Python Basics"
//             description="Introduction to Python syntax"
//             duration="12 min"
//             level="Beginner"
//           />
//           <VideoCard 
//             thumbnail="/thumbnails/python-functions.jpg"
//             title="2. Functions in Python"
//             description="Learn to create reusable code"
//             duration="18 min"
//             level="Intermediate"
//           />
//         </>
//       ) : (
//         /* Default C Videos */
//         <>
//           <VideoCard 
//             thumbnail="/thumbnails/c-intro.jpg"
//             title="1. Introduction to C"
//             description="Learn the basics of C programming"
//             duration="15 min"
//             level="Beginner"
//           />
//           <VideoCard 
//             thumbnail="/thumbnails/c-pointers.jpg"
//             title="2. Pointers in C"
//             description="Master memory management"
//             duration="22 min"
//             level="Intermediate"
//           />
//         </>
//       )}
//     </div>
//   </section>

//   {/* Recommendations Section */}
//   <section>
//     <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {window.location.pathname.includes('/course/Python') ? (
//         /* Python Recommendations */
//         <>
//           <RecommendationCard 
//             title="Python Data Structures"
//             description="Master lists, tuples, and dictionaries"
//             tag="Next Lesson"
//             badge="Popular"
//           />
//         </>
//       ) : (
//         /* C Recommendations */
//         <>
//           <RecommendationCard 
//             title="C Data Structures"
//             description="Learn arrays and linked lists"
//             tag="Next Lesson"
//             badge="Essential"
//           />
//         </>
//       )}
//     </div>
//   </section>
// </div>



        
//       </div>
//     </div>
//   );
// };

// export default CoursePage;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../assets/assets";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import VideoCard from '../components/VideoCard';
import RecommendationCard from '../components/RecommendationCard';
import VideoPlayerModal from "../components/VideoPlayer";

const CoursePage = () => {
  const { id } = useParams();
  const course = courses.find((c) => c._id === id);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  // Sample video data - replace with your actual data structure
  const courseVideos = {
    c: [
      {
        id: 'c-intro',
        title: '1. Introduction to C',
        description: 'Learn the basics of C programming',
        duration: '15 min',
        level: 'Beginner',
        thumbnail: '/thumbnails/c-intro.jpg',
        videoUrl: '/videos/c-intro.mp4'
      },
      {
        id: 'c-pointers',
        title: '2. Pointers in C',
        description: 'Master memory management',
        duration: '22 min',
        level: 'Intermediate',
        thumbnail: '/thumbnails/c-pointers.jpg',
        videoUrl: '/videos/c-pointers.mp4'
      }
    ],
    python: [
      {
        id: 'python-intro',
        title: '1. Python Basics',
        description: 'Introduction to Python syntax',
        duration: '12 min',
        level: 'Beginner',
        thumbnail: '/thumbnails/python-intro.jpg',
        videoUrl: '/videos/python-intro.mp4'
      }
    ]
  };

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    setShowVideoPlayer(true);
  };

  if (!course) {
    return <h2 className="text-center text-red-500">Course Not Found</h2>;
  }

  // Determine which videos to show based on course ID
  const videosToShow = courseVideos[id] || courseVideos.c;
  const recommendations = id === 'python' ? 
    [{ title: "Python Data Structures", description: "Master lists, tuples, and dictionaries" }] :
    [{ title: "C Data Structures", description: "Learn arrays and linked lists" }];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4 h-full">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-4/5">
        <div className="p-4 bg-white shadow-md">
          <Searchbar />
        </div>

        <div className="p-6 overflow-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            {course.name}
          </h1>

          {/* Video Lectures Section */}
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
                  onClick={() => handleVideoClick(video)}
                />
              ))}
            </div>
          </section>

          {/* Recommendations Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <RecommendationCard
                  key={index}
                  title={rec.title}
                  description={rec.description}
                  tag="Next Lesson"
                  badge={id === 'python' ? "Popular" : "Essential"}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Video Player Modal */}
      {showVideoPlayer && currentVideo && (
        <VideoPlayerModal
          video={currentVideo}
          onClose={() => setShowVideoPlayer(false)}
        />
      )}
    </div>
  );
};

export default CoursePage;
