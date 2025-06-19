import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const HistoryPage = () => {
  const { userId, token } = useContext(ShopContext);
  const [history, setHistory] = useState({ today: [], yesterday: [], older: [] });
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/history/", {
        headers: { token },
      });
      if (response.data.success) {
        setHistory(response.data.history);
      } else {
        toast.error("Failed to load history");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchHistory();
    }
  }, [userId, token]);

  const renderVideoItem = (item) => (
    <div key={`${item.courseId}-${item.lectureId}`} className="flex mb-4">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-40 h-24 object-cover rounded-md mr-4"
      />
      <div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">21k views • 2 Day ago</p>
        <p className="text-sm text-gray-600">{item.duration}</p>
      </div>
    </div>
  );

  if (loading) return <div>Loading history...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Watch history</h1>

      {history.today.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Today</h2>
          {history.today.map(renderVideoItem)}
        </section>
      )}

      {history.yesterday.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Yesterday</h2>
          {history.yesterday.map(renderVideoItem)}
        </section>
      )}

      {history.older.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Older</h2>
          {history.older.map(renderVideoItem)}
        </section>
      )}

      {history.today.length === 0 &&
        history.yesterday.length === 0 &&
        history.older.length === 0 && <p>No watch history found.</p>}
    </div>
  );
};

export default HistoryPage;
