// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? (
    <Route element={children} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
