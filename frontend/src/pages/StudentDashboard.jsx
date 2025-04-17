
import { assets, courses } from "../assets/assets";
import { PlayCircle } from "lucide-react";
import courseVideos from "../assets/courseVideos";
import { useNavigate } from "react-router-dom";
import MyCourses from "./MyCourses";
import RecommendationCard from "../components/RecommendationCard";

const StudentDashboard = () => {

  const navigate = useNavigate();


  return (
    <>
      {/* Main Content */}
      <div className="flex-1 p-5 pt-2">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-2xl mt-2 shadow-xl flex flex-col md:flex-row items-center justify-between">
          {/* Left Side: Text Content */}
          <div className="mb-4 ml-3 md:mb-0 md:mr-4 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              Welcome Back, Learner! 🚀
            </h2>
            <p className="text-sm md:text-base text-gray-100 mb-2">
              Dive into your personalized learning journey today. We’ve added
              new courses, exciting challenges, and exclusive resources to help
              you grow smarter every day.
            </p>
            <button
              className="mt-2 px-5 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-300 hover:text-white transition duration-300 cursor-pointer"
              onClick={() => navigate("/purchases")}
            >
              Explore New Courses
            </button>
          </div>

          {/* Right Side: Animated Image */}
          <div className="w-full md:w-1/3">
            <img
              src={assets.online_learning}
              alt="Online Learning GIF"
              className="w-full h-52 rounded-lg pr-8 object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>

        {/* Continue Playing */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Continue Playing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(courseVideos) // gives [courseId, videos]
              .flatMap(([courseId, videos]) =>
                videos.map((video) => ({ ...video, courseId }))
              )
              .slice(3, 5)
              .map((video) => (
                <div
                  key={video.id}
                  className="overflow-hidden shadow-sm rounded-lg border border-gray-300 hover:shadow-lg cursor-pointer"
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
                    {/* Play button on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ">
                      <PlayCircle className="text-white w-15 h-15" />
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold">{video.title}</h4>
                    <p className="text-sm text-gray-500">
                      {video.duration} • {video.level}
                    </p>
                  </div>
                  {/* Static progress bar */}
                  <div className="h-1 bg-gray-300 w-full">
                    <div className="h-1 bg-red-500 w-3/5 rounded-r"></div>{" "}
                    {/* 50% watched */}
                  </div>
                </div>
              ))}
          </div>
        </div>

        
        {/* My Courses */}
        <MyCourses />

        {/* Our Offerings */}
        <RecommendationCard />

      </div>
    </>
  );
};

export default StudentDashboard;
