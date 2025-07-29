import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner
  }

  // If no user (not logged in), redirect to admin login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is logged in but not an admin (shouldn't happen with admin-only login),
  // redirect to login or show an error.
  if (user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;