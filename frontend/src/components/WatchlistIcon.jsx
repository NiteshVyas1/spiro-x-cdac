import React from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useWatchlist } from "../context/WatchlistContext";

const WatchlistIcon = ({id , courseId, thumbnail, title, description, duration, level }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const liked = isInWatchlist(title);

  const toggleHeart = (e) => {
    e.stopPropagation();
    if (liked) {
      removeFromWatchlist(title);
    } else {
      addToWatchlist({id , courseId , thumbnail, title, description, duration, level });
      toast.success("Added to Watchlist");
    }
  };

  return (
    <div>
      <button onClick={toggleHeart} className="hover:cursor-pointer">
        <FaHeart className={liked ? "text-red-500" : "text-gray-300"} />
      </button>
    </div>
  );
};

export default WatchlistIcon;
