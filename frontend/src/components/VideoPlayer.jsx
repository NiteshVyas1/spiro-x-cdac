import { useState } from 'react';

const VideoPlayerModal = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sample video data
  const videos = {
    c: [
      {
        id: 'intro',
        title: 'Introduction to C',
        description: 'Course introduction covering basic concepts',
        duration: '15:30',
        url: '/videos/c-intro.mp4'
      },
      {
        id: 'pointers',
        title: 'Pointers in C',
        description: 'Understanding memory addresses and pointers',
        duration: '22:45',
        url: '/videos/c-pointers.mp4'
      }
    ],
    python: [
      {
        id: 'python-basics',
        title: 'Python Basics',
        description: 'Introduction to Python syntax',
        duration: '12:20',
        url: '/videos/python-basics.mp4'
      }
    ]
  };

  const playVideo = (video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
  };

  const closeModal = () => {
    setIsPlaying(false);
    setCurrentVideo(null);
  };

  return (
    <div className="p-8">
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.c.map((video) => (
          <div 
            key={video.id}
            onClick={() => playVideo(video)}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative">
              <img 
                src={`/thumbnails/${video.id}.jpg`} 
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-50 rounded-full p-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{video.title}</h3>
              <p className="text-gray-600 text-sm">{video.duration}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {isPlaying && currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{currentVideo.title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="aspect-w-16 aspect-h-9">
              <video
                controls
                autoPlay
                className="w-full"
                src={currentVideo.url}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="p-4 border-t">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{currentVideo.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">{currentVideo.duration}</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Next Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayerModal;