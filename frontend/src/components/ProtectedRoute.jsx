import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login if no token exists
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute; 