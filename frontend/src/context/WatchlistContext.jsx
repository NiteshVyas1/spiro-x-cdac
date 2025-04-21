// src/context/WatchlistContext.js

import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);


  const addToWatchlist = (video) => {
    setWatchlist((prev) => [...prev, video]);
  };

  const removeFromWatchlist = (title) => {
    setWatchlist((prev) => prev.filter((video) => video.title !== title));
  };

  const isInWatchlist = (title) => {
    return watchlist.some((video) => video.title === title);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};


