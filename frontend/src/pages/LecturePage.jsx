import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courseVideos from "../assets/courseVideos";
import { useCart } from "../context/CartContext";

const LecturePage = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const { markAsWatching } = useCart();

  const videos = courseVideos[courseId];
  const currentVideo = videos?.find((v) => v.id === lectureId); // use optional chaining in case videos is undefined

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId, lectureId]);

  useEffect(() => {
    if (currentVideo) {
      markAsWatching({ ...currentVideo, courseId });
    }
  }, [currentVideo, courseId, markAsWatching]);

  if (!videos) return <div className="p-10">Course not found.</div>;
  if (!currentVideo) return <div className="p-10">Lecture not found.</div>;

  const previouslyWatched = videos.filter((v) => v.id !== lectureId).slice(0, 3);


  if (!videos) return <div className="p-10">Course not found.</div>;

  if (!currentVideo) return <div className="p-10">Lecture not found.</div>;


  const faqs = [
    { question: "How can I download notes?", answer: "Notes will be available after each lecture." },
    { question: "Can I rewatch lectures?", answer: "Yes, you can watch lectures as many times as you like." },
    { question: "Is there a certificate?", answer: "Yes, on course completion, you’ll receive a certificate." },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8 h-full">
          {/* Left - Video and Description */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 mb-6">
              <h2 className="text-xl font-bold mb-4">{currentVideo.title}</h2>
              <video controls className="w-full rounded-lg mb-4" src={currentVideo.videoUrl} />
              <div>
                <h3 className="font-semibold">Description</h3>
                <p className="text-gray-700">{currentVideo.description}</p>
                <p className="text-sm text-gray-500 mt-1">{currentVideo.duration}</p>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">FAQs</h3>
              {faqs.map((faq, index) => (
                <div key={index} className="mb-3">
                  <h4 className="font-medium text-gray-800">{faq.question}</h4>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Playlist and Previously Watched */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Up next */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 pl-3">Up next</h3>
              <div className="space-y-3">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className={`flex gap-3 items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition ${
                      video.id === lectureId ? "bg-blue-50" : ""
                    }`}
                    onClick={() => navigate(`/course/${courseId}/${video.id}`)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-2">{video.title}</h4>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Previously Watched */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 pl-3">Previously Watched</h3>
              <div className="space-y-3">
                {previouslyWatched.map((video) => (
                  <div
                    key={video.id}
                    className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => navigate(`/course/${courseId}/${video.id}`)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-sm">{video.title}</h4>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturePage;
