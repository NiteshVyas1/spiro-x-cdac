import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Text */}
        <h1 className="text-7xl md:text-9xl font-bold text-blue-600 animate-bounce">
          404
        </h1>
        
        {/* Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8 select-none">
          <div className="text-8xl animate-pulse">
            🤔
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          If you think this is a mistake, please{" "}
          <Link to="/contact" className="text-blue-600 hover:underline">
            contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound; 