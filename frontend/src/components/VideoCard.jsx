const VideoCard = ({ thumbnail, title, description, duration, level, onClick }) => {
    return (
      <div 
        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-500 text-sm font-medium">{duration}</span>
            <span className={`${
              level === 'Beginner' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
            } text-xs px-2 py-1 rounded`}>
              {level}
            </span>
          </div>
        </div>
      </div>
    );
  };

  export default VideoCard;