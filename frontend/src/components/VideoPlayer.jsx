// VideoPlayer.jsx - Enhanced with Advanced Screen Recording Prevention

import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courseVideos from "../assets/courseVideos";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

console.log("🔍 VideoPlayer.jsx file is being loaded");

const VideoPlayer = () => {
  console.log("🚀 VideoPlayer component is starting to render");
  
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const { userId, token } = useContext(ShopContext);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Existing states
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [savedProgress, setSavedProgress] = useState(null);
  const [hasResumed, setHasResumed] = useState(false);
  const [isProgressFetched, setIsProgressFetched] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  
  // Enhanced protection states
  const [isProtectionActive, setIsProtectionActive] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  
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

  // Enhanced Protection System
  const setupAdvancedProtection = useCallback(() => {
    let isRecording = false;
    let devToolsOpen = false;
    let focusLost = false;

    // Protected key combinations
    const protectedKeys = [
      'PrintScreen',
      { ctrl: true, shift: true, key: 'i' }, // Dev tools
      { key: 'F12' }, // Dev tools
      { ctrl: true, key: 'u' }, // View source
      { ctrl: true, shift: true, key: 'c' }, // Inspect
      { ctrl: true, shift: true, key: 'j' }, // Console
      { ctrl: true, key: 's' }, // Save page
      { alt: true, key: 'F4' }, // Screenshot tools
      { meta: true, key: 'PrintScreen' }, // Mac screenshot
      { meta: true, shift: true, key: '3' }, // Mac screenshot
      { meta: true, shift: true, key: '4' }, // Mac screenshot
      { meta: true, shift: true, key: '5' }, // Mac screenshot record
    ];

    // 1. Enhanced Screen Capture Detection
    const protectAgainstScreenCapture = () => {
      const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia;
      const originalGetUserMedia = navigator.mediaDevices.getUserMedia;

      // Override getDisplayMedia
      navigator.mediaDevices.getDisplayMedia = function(...args) {
        console.log("🚨 Screen recording via getDisplayMedia detected!");
        isRecording = true;
        setIsProtectionActive(true);
        setHideVideo(true);
        toast.error("⚠️ Screen recording is not allowed!");
        
        if (videoRef.current) {
          videoRef.current.pause();
        }
        
        return Promise.reject(new Error("Screen recording is not permitted"));
      };

      // Monitor getUserMedia for suspicious usage
      navigator.mediaDevices.getUserMedia = function(constraints) {
        if (constraints && constraints.video && constraints.video.mediaSource === 'screen') {
          console.log("🚨 Screen capture via getUserMedia detected!");
          isRecording = true;
          setIsProtectionActive(true);
          setHideVideo(true);
          toast.error("⚠️ Screen capture is not allowed!");
          return Promise.reject(new Error("Screen capture is not permitted"));
        }
        return originalGetUserMedia.call(this, constraints);
      };

      return () => {
        navigator.mediaDevices.getDisplayMedia = originalGetDisplayMedia;
        navigator.mediaDevices.getUserMedia = originalGetUserMedia;
      };
    };

    // 2. Advanced Developer Tools Detection
    const detectDevTools = () => {
      const threshold = 160;
      
      return setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
          devToolsOpen = true;
          setIsProtectionActive(true);
          setHideVideo(true);
          console.log("🚨 Developer tools detected!");
          toast.error("🛠️ Please close developer tools to continue.");
          
          if (videoRef.current) {
            videoRef.current.pause();
          }
        } else {
          devToolsOpen = false;
          checkOverallProtection();
        }
      }, 1000);
    };

    // 3. Window Focus and Visibility Protection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        focusLost = true;
        setIsProtectionActive(true);
        setHideVideo(true);
        console.log("🚨 Window lost focus - potential recording");
        
        if (videoRef.current) {
          videoRef.current.pause();
        }
      } else {
        focusLost = false;
        setTimeout(() => checkOverallProtection(), 1000);
      }
    };

    // 4. Enhanced Keyboard Protection
    const handleKeyDown = (e) => {
      const isProtectedKey = protectedKeys.some(keyConfig => {
        if (typeof keyConfig === 'string') {
          return e.key === keyConfig;
        }
        return (!keyConfig.ctrl || e.ctrlKey) &&
               (!keyConfig.shift || e.shiftKey) &&
               (!keyConfig.meta || e.metaKey) &&
               (!keyConfig.alt || e.altKey) &&
               e.key.toLowerCase() === keyConfig.key.toLowerCase();
      });

      if (isProtectedKey) {
        e.preventDefault();
        e.stopPropagation();
        setIsProtectionActive(true);
        setHideVideo(true);
        toast.error("🚫 This action is blocked!");
        
        // Hide video temporarily
        setTimeout(() => {
          checkOverallProtection();
        }, 3000);
        
        return false;
      }
    };

    // 5. Mouse Event Protection
    const handleMouseEvents = (e) => {
      // Prevent right-click context menu
      if (e.type === 'contextmenu') {
        e.preventDefault();
        toast.error("🚫 Right-click is disabled!");
        return false;
      }
      
      // Detect drag attempts
      if (e.type === 'dragstart') {
        e.preventDefault();
        setIsProtectionActive(true);
        setHideVideo(true);
        toast.error("🚫 Dragging is not allowed!");
        setTimeout(() => checkOverallProtection(), 2000);
        return false;
      }
    };

    // 6. Window Manipulation Detection
    const handleResize = () => {
      // Some screen capture tools manipulate window size
      if (Math.abs(window.innerWidth - window.outerWidth) > 20 || 
          Math.abs(window.innerHeight - window.outerHeight) > 20) {
        setIsProtectionActive(true);
        setHideVideo(true);
        toast.error("🚨 Window manipulation detected!");
      }
    };

    // 7. Overall Protection Status Check
    const checkOverallProtection = () => {
      const shouldHide = isRecording || devToolsOpen || focusLost;
      
      if (!shouldHide) {
        setTimeout(() => {
          setIsProtectionActive(false);
          setHideVideo(false);
        }, 1000);
      }
    };

    // 8. Monitor for Recording Software
    const monitorRecordingApps = () => {
      return setInterval(() => {
        // Check for recording software indicators
        const suspiciousPatterns = [
          'OBS', 'Camtasia', 'Bandicam', 'Fraps', 'ScreenFlow', 
          'Snagit', 'Loom', 'CloudApp', 'Monosnap'
        ];

        // Monitor media devices
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          navigator.mediaDevices.enumerateDevices().then(devices => {
            const videoInputs = devices.filter(device => device.kind === 'videoinput');
            const audioInputs = devices.filter(device => device.kind === 'audioinput');
            
            // Suspicious number of devices might indicate capture software
            if (videoInputs.length > 2 || audioInputs.length > 4) {
              console.log("🚨 Suspicious media devices detected");
              setIsProtectionActive(true);
              setHideVideo(true);
              toast.error("🚨 Recording software detected!");
            }
          }).catch(() => {
            // Ignore errors in device enumeration
          });
        }
      }, 3000);
    };

    // Initialize all protections
    const restoreGetDisplayMedia = protectAgainstScreenCapture();
    const devToolsInterval = detectDevTools();
    const recordingInterval = monitorRecordingApps();

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('contextmenu', handleMouseEvents, true);
    document.addEventListener('dragstart', handleMouseEvents, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);
    
    window.addEventListener('blur', () => {
      focusLost = true;
      setIsProtectionActive(true);
      setHideVideo(true);
    });
    
    window.addEventListener('focus', () => {
      focusLost = false;
      setTimeout(() => checkOverallProtection(), 1000);
    });

    // Cleanup function
    return () => {
      clearInterval(devToolsInterval);
      clearInterval(recordingInterval);
      restoreGetDisplayMedia();
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleMouseEvents, true);
      document.removeEventListener('dragstart', handleMouseEvents, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('blur', () => {});
      window.removeEventListener('focus', () => {});
    };
  }, []);

  // Initialize advanced protection
  useEffect(() => {
    const cleanup = setupAdvancedProtection();
    return cleanup;
  }, [setupAdvancedProtection]);

  // Existing utility functions
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

    resumeAttemptedRef.current = true;

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
      isProgressFetched &&
      isVideoReady
    ) {
      const resumeTime = savedProgress.time || savedProgress.lastPosition;
      console.log("⏰ Attempting to resume from:", resumeTime);

      try {
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = resumeTime;
            setHasResumed(true);
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

  // Video event handlers
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
        console.log(`⏱ Progress: ${progress.toFixed(1)}% at ${formatTime(videoTime)}`);

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

    const handlePause = async () => {
      const videoTime = video.currentTime;
      const progress = (videoTime / video.duration) * 100;
      console.log(`⏸ Video paused at ${formatTime(videoTime)} (${progress.toFixed(1)}%)`);
      saveToLocalStorage(videoTime, progress);

      if (userId && token) {
        try {
          await axios.post(
            "http://localhost:4000/api/history/add",
            {
              courseId,
              lectureId,
              title: currentVideo.title,
              thumbnail: currentVideo.thumbnail || "",
              duration: currentVideo.duration || "Unknown",
            },
            { headers: { token } }
          );
          console.log("📝 Added to watch history");
        } catch (err) {
          console.error("Error adding to watch history:", err);
        }
      }
    };

    const handlePlay = () => {
      console.log(`▶ Video playing at ${formatTime(video.currentTime)}`);
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
    <div className="p-6 select-none">
      <h1 className="text-xl font-bold mb-3">{currentVideo.title}</h1>
      
      {/* Enhanced Video Container with Protection */}
      <div 
        ref={videoContainerRef}
        className="relative w-full h-[60vh] rounded-md overflow-hidden bg-black"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      >
        {/* Main Video Element - Hidden when protection is active */}
        <video
          ref={videoRef}
          controls={!hideVideo && !isProtectionActive}
          autoPlay
          muted
          src={currentVideo.videoUrl}
          onLoadedMetadata={handleVideoLoaded}
          onCanPlay={handleVideoCanPlay}
          onLoadedData={handleLoadedData}
          onError={handleVideoError}
          className={`w-full h-full ${hideVideo || isProtectionActive ? 'invisible' : 'visible'}`}
          controlsList="nodownload nofullscreen noremoteplayback"
          onContextMenu={(e) => e.preventDefault()}
          disablePictureInPicture
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            pointerEvents: hideVideo || isProtectionActive ? 'none' : 'auto'
          }}
        />

        {/* Protection Status Overlay */}
        {(hideVideo || isProtectionActive) && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-2xl font-bold mb-2">CONTENT PROTECTED</h2>
              <p className="text-lg">Screen recording/screenshot blocked</p>
              <p className="text-sm mt-2 opacity-75">
                Close recording software and focus on this window
              </p>
            </div>
          </div>
        )}

        {/* Watermark - Always visible */}
        <div className="absolute top-4 right-4 text-white/30 text-sm pointer-events-none z-20">
          USER: {userId || 'GUEST'}
        </div>

        {/* Dynamic Watermark - Always visible */}
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div className="text-white/20 text-6xl font-bold transform rotate-45 select-none">
            {userId ? `USER: ${userId}` : 'PROTECTED CONTENT'}
          </div>
        </div>
      </div>

      {/* Video Progress Display */}
      {savedProgress && (
        <div className="text-blue-800 mt-2">
          Progress: {savedProgress.progress}% | Last watched:{" "}
          {formatTime(savedProgress.time || savedProgress.lastPosition)}
        </div>
      )}
      
      <p className="text-sm text-gray-600 mt-2">{currentVideo.description}</p>
      
      {/* Protection Status */}
      <div className="mt-4 text-xs text-gray-500 flex items-center space-x-2">
        <span>🔒 Advanced Protection Active</span>
        {isProtectionActive && <span className="text-red-500">⚠️ Protection Triggered</span>}
        {hideVideo && <span className="text-orange-500">👁️ Video Hidden</span>}
      </div>
    </div>
  );
};

export default VideoPlayer;