// src/ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
