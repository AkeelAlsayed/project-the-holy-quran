import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./AuthContext"; // Assuming this is the correct path to your AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
