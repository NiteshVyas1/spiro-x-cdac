// HistoryPage.jsx
import React from "react";
import { assets } from "../assets/assets"; 

const historyData = {
  today: [
    {
      title: "C++ | Introduction and functions of C++",
      views: "21k views",
      date: "2 Day ago",
      duration: "30 mins",
      thumbnail: assets.c,
    },
    {
      title: "C++ | Introduction and functions of C++",
      views: "21k views",
      date: "2 Day ago",
      duration: "30 mins",
      thumbnail: assets.python,
    },
  ],
  yesterday: [
    {
      title: "C++ | Introduction and functions of C++",
      views: "21k views",
      date: "2 Day ago",
      duration: "30 mins",
      thumbnail: assets.c,
    },
    {
      title: "C++ | Introduction and functions of C++",
      views: "21k views",
      date: "2 Day ago",
      duration: "30 mins",
      thumbnail: assets.c,
    },
  ],
};

const HistorySection = ({ label, videos }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-4">{label}</h3>
    <div className="space-y-4">
      {videos.map((video, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={video.thumbnail}
              alt="thumb"
              className="w-40 h-24 rounded object-cover"
            />
            <div>
              <h4 className="font-semibold">{video.title}</h4>
              <p className="text-gray-500 text-sm">
                {video.views} • {video.date}
              </p>
              <p className="text-sm text-gray-500 pr-4">{video.duration}</p>
            </div>
          </div>
          </div>
      ))}
    </div>
  </div>
);

const HistoryPage = () => {
  return (
    <div className="px-6 py-6">
      <h2 className="text-2xl font-bold mb-6 underline">Watch history</h2>
      <HistorySection label="Today" videos={historyData.today} />
      <HistorySection label="Yesterday" videos={historyData.yesterday} />
    </div>
  );
};

export default HistoryPage;
