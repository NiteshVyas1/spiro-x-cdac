// VideoPlayer.jsx - Using react-player

import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courseVideos from "../assets/courseVideos";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

// Add this at the very top to test if console logging works
console.log("🔍 VideoPlayer.jsx file is being loaded");

const VideoPlayer = () => {
  // Add this immediately when component starts
  console.log("🚀 VideoPlayer component is starting to render");
  
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const { userId, token } = useContext(ShopContext);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);
  const [hasResumed, setHasResumed] = useState(false);
  const [isProgressFetched, setIsProgressFetched] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const localStorageKey = `video_progress_${courseId}_${lectureId}`;
  const resumeAttemptedRef = useRef(false);

  console.log("📋 Initial State:", {
    courseId,
    lectureId,
    userId,
    hasToken: !!token,
    isLoading,
    isVideoReady,
    hasProgress: !!savedProgress,
    hasResumed,
    isProgressFetched,
    localStorageKey
  });

  const videos = courseVideos[courseId];
  const currentVideo = videos?.find((v) => v.id === lectureId);
  if (!currentVideo) return <div>Video not found</div>;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const saveToLocalStorage = (time, progress) => {
    const progressData = {
      time,
      progress,
      timestamp: Date.now(),
      videoTitle: currentVideo.title,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(progressData));
    console.log("💾 Saved to localStorage:", progressData);
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  // Load localStorage progress
  useEffect(() => {
    const localProgress = loadFromLocalStorage();
    if (localProgress) {
      setSavedProgress(localProgress);
      console.log("📂 Loaded from localStorage:", localProgress);
    }
  }, [currentVideo]);

  // Fetch backend progress
  useEffect(() => {
    const fetchProgress = async () => {
      if (!currentVideo || !userId || !token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/api/progress/${courseId}/${lectureId}`,
          { headers: { token } }
        );
        if (response.data.success && response.data.data?.lastPosition > 0) {
          const data = response.data.data;
          setSavedProgress(data);
          saveToLocalStorage(data.lastPosition, data.progress);
          console.log("✅ Found backend progress:", data);
        }
      } catch (err) {
        console.error("Progress fetch error:", err);
      } finally {
        setIsLoading(false);
        setIsProgressFetched(true);
      }
    };

    fetchProgress();
  }, [currentVideo, userId, token]);

  const attemptResume = () => {
    if (resumeAttemptedRef.current) return;
    
    console.log("🔄 Resume check:", {
      hasVideoRef: !!videoRef.current,
      hasSavedProgress: !!savedProgress,
      savedTime: savedProgress?.time || savedProgress?.lastPosition,
      isVideoReady,
      hasResumed,
      isProgressFetched
    });

    if (
      videoRef.current &&
      savedProgress &&
      (savedProgress.time > 0 || savedProgress.lastPosition > 0) &&
      !hasResumed &&
      isProgressFetched
    ) {
      const resumeTime = savedProgress.time || savedProgress.lastPosition;
      console.log("⏰ Attempting to resume from:", resumeTime);
      
      try {
        // Add a small delay to ensure video is ready
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = resumeTime;
            setHasResumed(true);
            resumeAttemptedRef.current = true;
            // toast.info(`⏰ Resumed from ${formatTime(resumeTime)}`);
            console.log("✅ Successfully resumed from:", resumeTime);
          }
        }, 500);
      } catch (err) {
        console.error("Error resuming video:", err);
      }
    }
  };

  const handleVideoLoaded = () => {
    console.log("🎥 Video metadata loaded");
    setIsVideoReady(true);
  };

  const handleVideoCanPlay = () => {
    console.log("🎮 Video can play now");
    attemptResume();
  };

  const handleLoadedData = () => {
    console.log("📼 Video data loaded");
    attemptResume();
  };

  const handleVideoError = (e) => {
    console.error("❌ Video load error:", e);
    setError("Video load error");
    toast.error("Video failed to load");
  };

  useEffect(() => {
    if (!isVideoReady || !videoRef.current || !isProgressFetched) return;
    const video = videoRef.current;
    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 3000;

    const handleTimeUpdate = async () => {
      const now = Date.now();
      if (now - lastUpdateTime >= UPDATE_INTERVAL) {
        const videoTime = video.currentTime;
        const progress = (videoTime / video.duration) * 100;
        setCurrentTime(videoTime);
        saveToLocalStorage(videoTime, progress);
        console.log(`⏱️ Progress: ${progress.toFixed(1)}% at ${formatTime(videoTime)}`);

        if (userId && token) {
          try {
            await axios.post(
              "http://localhost:4000/api/progress/update",
              {
                courseId,
                lectureId,
                progress: Math.round(progress),
                lastPosition: videoTime,
              },
              { headers: { token } }
            );
          } catch (err) {
            console.error("Progress update error:", err);
          }
        }
        lastUpdateTime = now;
      }
    };

    const handleEnded = async () => {
      saveToLocalStorage(video.duration, 100);
      console.log("🎬 Video ended");
      if (userId && token) {
        await axios.post(
          "http://localhost:4000/api/progress/update",
          {
            courseId,
            lectureId,
            progress: 100,
            lastPosition: video.duration,
          },
          { headers: { token } }
        );
      }
      toast.success("🎉 Video completed!");
    };

    const handlePause = () => {
      const videoTime = video.currentTime;
      const progress = (videoTime / video.duration) * 100;
      console.log(`⏸️ Video paused at ${formatTime(videoTime)} (${progress.toFixed(1)}%)`);
      saveToLocalStorage(videoTime, progress);
    };

    const handlePlay = () => {
      console.log(`▶️ Video playing at ${formatTime(video.currentTime)}`);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("pause", handlePause);
    video.addEventListener("play", handlePlay);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("play", handlePlay);
    };
  }, [isVideoReady, isProgressFetched, userId, token]);

  if (isLoading) return <div>Loading video progress...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-3">{currentVideo.title}</h1>
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        src={currentVideo.videoUrl}
        onLoadedMetadata={handleVideoLoaded}
        onCanPlay={handleVideoCanPlay}
        onLoadedData={handleLoadedData}
        onError={handleVideoError}
        className="w-full h-[60vh] rounded-md"
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
      />
      {savedProgress && (
        <div className="text-blue-800 mt-2">
          Progress: {savedProgress.progress}% | Last watched:{" "}
          {formatTime(savedProgress.time || savedProgress.lastPosition)}
        </div>
      )}
      <p className="text-sm text-gray-600 mt-2">{currentVideo.description}</p>
    </div>
  );
};

export default VideoPlayer;