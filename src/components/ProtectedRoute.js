import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    alert("Please sign in to view this episode.");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
