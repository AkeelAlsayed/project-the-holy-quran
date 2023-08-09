import React, { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseApp from "../firebase"; // Import the firebase.js file
import { AuthContext } from "../AuthContext"; // Import the AuthContext
import { Box, VStack, Heading, Input, Button } from "@chakra-ui/react";

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp); // Use the initialized firebaseApp
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        console.log("Login successful!", user);
        setCurrentUser(user); // Set the current user
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        console.log("Logout successful!");
        setCurrentUser(null); // Set the current user to null
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const handleSubmit = currentUser ? handleLogout : handleLogin;

  return (
    <Box maxWidth="400px" mx="auto" mt={5}>
      <Heading as="h1" size="lg" textAlign="center">
        {currentUser ? "Logout" : "Login"}
      </Heading>
      <VStack as="form" onSubmit={handleSubmit} spacing={4} mt={5}>
        <Input
          variant="outline"
          isRequired={!currentUser}
          id="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          variant="outline"
          isRequired={!currentUser}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" colorScheme="blue" width="100%" variant="solid">
          {currentUser ? "Logout" : "Login"}
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
