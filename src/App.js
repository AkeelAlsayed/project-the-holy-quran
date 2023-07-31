import React from "react";
import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink,
  Routes,
} from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import QuranPlayer from "./QuranPlayer/QuranPlayer";

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

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box bg="teal.500" w="100%" p={4} color="white">
          <ChakraLink as={RouterLink} to="/quranplayer" m={3}>
            <Button colorScheme="teal" variant="ghost">
              Quran Player
            </Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/signup" m={3}>
            <Button colorScheme="teal" variant="ghost">
              Sign Up
            </Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/login" m={3}>
            <Button colorScheme="teal" variant="ghost">
              Login
            </Button>
          </ChakraLink>
        </Box>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quranplayer" element={<QuranPlayer />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
