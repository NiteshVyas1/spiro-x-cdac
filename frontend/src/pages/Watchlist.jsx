import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import VideoCard from '../components/VideoCard';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 underline">Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-600">No videos in your watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((video, index) => (
            <VideoCard
              key={index}
              {...video}
              onClick={() =>
                navigate(`/course/${video.courseId}/${video.id}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
