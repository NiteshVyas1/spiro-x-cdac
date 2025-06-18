// HistoryPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const HistorySection = ({ label, videos, onVideoClick }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-4">{label}</h3>
    <div className="space-y-4">
      {videos.map((video, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
          onClick={() => onVideoClick(video)}
        >
          <div className="flex items-center gap-4">
            <img
              src={video.thumbnail}
              alt="thumb"
              className="w-40 h-24 rounded object-cover"
            />
            <div>
              <h4 className="font-semibold">{video.title}</h4>
              <p className="text-gray-500 text-sm">
                {new Date(video.watchedAt).toLocaleString()}
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
  const [history, setHistory] = useState({ today: [], yesterday: [], older: [] });
  const [loading, setLoading] = useState(true);
  const { token } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    fetchHistory();
  }, [token]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/history', {
        headers: { token }
      });
      if (response.data.success) {
        setHistory(response.data.history);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Failed to load watch history');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    navigate(`/course/${video.courseId}/${video.lectureId}`);
  };

  const clearHistory = async () => {
    try {
      const response = await axios.delete('http://localhost:4000/api/history', {
        headers: { token }
      });
      if (response.data.success) {
        setHistory({ today: [], yesterday: [], older: [] });
        toast.success('History cleared successfully');
      }
    } catch (error) {
      console.error('Error clearing history:', error);
      toast.error('Failed to clear history');
    }
  };

  if (loading) {
    return (
      <div className="px-6 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-40 h-24 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold underline">Watch history</h2>
        {Object.values(history).some(arr => arr.length > 0) && (
          <button
            onClick={clearHistory}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear all history
          </button>
        )}
      </div>

      {Object.values(history).every(arr => arr.length === 0) ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No watch history yet</p>
        </div>
      ) : (
        <>
          {history.today.length > 0 && (
            <HistorySection 
              label="Today" 
              videos={history.today} 
              onVideoClick={handleVideoClick}
            />
          )}
          {history.yesterday.length > 0 && (
            <HistorySection 
              label="Yesterday" 
              videos={history.yesterday} 
              onVideoClick={handleVideoClick}
            />
          )}
          {history.older.length > 0 && (
            <HistorySection 
              label="Older" 
              videos={history.older} 
              onVideoClick={handleVideoClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HistoryPage;
