import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./AuthContext"; // Assuming this is the correct path to your AuthProvider
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Define a custom theme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        // Use any color keys in your palette
        bg: "gray.100",
        color: "gray.800",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
