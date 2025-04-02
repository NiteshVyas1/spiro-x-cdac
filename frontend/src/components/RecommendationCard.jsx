const RecommendationCard = ({ title, description, tag, badge }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center">
          <span className="text-blue-500 text-sm font-medium mr-3">{tag}</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{badge}</span>
        </div>
      </div>
    </div>
  );
  
  export default RecommendationCard;