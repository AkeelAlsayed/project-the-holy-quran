// import React from "react";
// import {
//   Box,
//   Button,
//   ChakraProvider,
//   extendTheme,
//   Heading,
//   Link as ChakraLink,
// } from "@chakra-ui/react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link as RouterLink,
//   Routes,
// } from "react-router-dom";
// import SignUp from "./SignUp/SignUp";
// import Login from "./Login/Login";
// import QuranPlayer from "./QuranPlayer/QuranPlayer";

// // Define a custom theme
// const theme = extendTheme({
//   colors: {
//     customColor1: {
//       50: "#f2e7fe",
//       100: "#d4b5fd",
//       200: "#aa80fb",
//       300: "#7f49f7",
//       400: "#561cf5",
//       500: "#3c00e0",
//       600: "#2e00a3",
//       700: "#1f0073",
//       800: "#110044",
//       900: "#08002c",
//     },
//     customColor2: {
//       // Your custom color shades here
//     },
//     // More custom colors
//   },
//   styles: {
//     global: {
//       body: {
//         bg: "gray.900",
//         color: "gray.800",
//       },
//     },
//   },
// });

// // App
// const App = () => {
//   return (
//     <ChakraProvider theme={theme}>
//       <Router>
//         <Box bg="teal.500" w="100%" p={4} color="white">
//           <ChakraLink as={RouterLink} to="/quranplayer" m={3}>
//             <Button colorScheme="teal" variant="ghost">
//               Quran Player
//             </Button>
//           </ChakraLink>
//           <ChakraLink as={RouterLink} to="/signup" m={3}>
//             <Button colorScheme="teal" variant="ghost">
//               Sign Up
//             </Button>
//           </ChakraLink>
//           <ChakraLink as={RouterLink} to="/login" m={3}>
//             <Button colorScheme="teal" variant="ghost">
//               Login
//             </Button>
//           </ChakraLink>
//         </Box>
//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/quranplayer" element={<QuranPlayer />} />
//         </Routes>
//       </Router>
//     </ChakraProvider>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   ChakraProvider,
//   extendTheme,
//   Link as ChakraLink,
// } from "@chakra-ui/react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link as RouterLink,
//   Routes,
// } from "react-router-dom";
// import SignUp from "./SignUp/SignUp";
// import Login from "./Login/Login";
// import QuranPlayer from "./QuranPlayer/QuranPlayer";

// const customColors = {
//   customColor1: {
//     500: "#3c00e0",
//   },
//   customColor2: {
//     500: "#ff0000", // You can add other custom colors here
//   },
//   // More custom colors
// };

// // App Component
// const App = () => {
//   // Use state to manage theme
//   const [theme, setTheme] = useState(
//     extendTheme({
//       styles: {
//         global: {
//           body: {
//             bg: "gray.900",
//             color: "gray.800",
//           },
//         },
//       },
//     })
//   );

//   // Function to set custom color
//   const setCustomColor = (color) => {
//     setTheme(
//       extendTheme({
//         styles: {
//           global: {
//             body: {
//               bg: color[500],
//               color: "gray.800",
//             },
//           },
//         },
//       })
//     );
//   };

//   return (
//     <ChakraProvider theme={theme}>
//       <Router>
//         <Box
//           bg="teal.500"
//           w="100%"
//           p={4}
//           color="white"
//           d="flex"
//           alignItems="center"
//         >
//           <ChakraLink as={RouterLink} to="/quranplayer" m={3}>
//             <Button colorScheme="teal" variant="ghost">
//               Quran Player
//             </Button>
//           </ChakraLink>
//           <ChakraLink as={RouterLink} to="/signup" m={3}>
//             <Button colorScheme="teal" variant="ghost">
//               Sign Up
//             </Button>
//           </ChakraLink>
//           <ChakraLink as={RouterLink} to="/login" m={3}>
//             <Button colorScheme="teal" variant="ghost">
//               Login
//             </Button>
//           </ChakraLink>
//           {Object.values(customColors).map((color, index) => (
//             <Box
//               key={index}
//               as="button"
//               w={8}
//               h={8}
//               borderRadius="full"
//               bg={color[500]}
//               m={2}
//               onClick={() => setCustomColor(color)}
//             />
//           ))}
//         </Box>
//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/quranplayer" element={<QuranPlayer />} />
//         </Routes>
//       </Router>
//     </ChakraProvider>
//   );
// };

// export default App;

import React, { useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink,
  Routes,
} from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import QuranPlayer from "./QuranPlayer/QuranPlayer";

const customColors = {
  customColor1: {
    50: "#f2e7fe",
    100: "#d4b5fd",
    200: "#aa80fb",
    300: "#7f49f7",
    400: "#561cf5",
    500: "#3c00e0",
    600: "#2e00a3",
    700: "#1f0073",
    800: "#FF4136",
    900: "#001f3f",
    1000: "#3D9970",
    1100: "#FF851B",
  },
  // More custom colors
};

const App = () => {
  const [theme, setTheme] = useState(
    extendTheme({
      styles: {
        global: {
          body: {
            bg: "gray.900",
            color: "gray.800",
          },
        },
      },
    })
  );

  const setCustomColor = (color) => {
    setTheme(
      extendTheme({
        styles: {
          global: {
            body: {
              bg: color,
              color: "gray.800",
            },
          },
        },
      })
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box
          bg="teal.500"
          w="100%"
          p={4}
          color="white"
          d="flex"
          alignItems="center"
        >
          {/* Other Links */}
          <ChakraLink as={RouterLink} to="/" m={3}>
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

          {/* Colors Tab */}
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="teal"
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
            >
              Colors
            </MenuButton>
            <MenuList>
              <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr)"
                gridGap={2}
              >
                {Object.values(customColors.customColor1).map(
                  (color, index) => (
                    <MenuItem key={index} onClick={() => setCustomColor(color)}>
                      <Box w={8} h={8} borderRadius="full" bg={color} />
                    </MenuItem>
                  )
                )}
              </Box>
            </MenuList>
          </Menu>
        </Box>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<QuranPlayer />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
