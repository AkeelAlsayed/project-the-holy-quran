import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const auth = getAuth(firebase); // Pass the firebase instance when getting the auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        console.log("Sign up successful!", user);

        // Add code here to create a Firestore document for the user
        const firestore = getFirestore(firebase); // Pass the firebase instance when getting firestore
        const docRef = doc(firestore, "users", user.uid);
        return setDoc(docRef, {
          // Add any user data you want to store in Firestore here
          email: user.email,
          createdAt: new Date().toISOString(), // Use Firestore's server timestamp for better accuracy across devices
        });
      })
      .then(() => {
        console.log("User document created in Firestore");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg">
          Sign Up
        </Heading>
        <Box as="form" onSubmit={handleSignUp}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button mt={4} width="full" colorScheme="teal" type="submit">
            Sign Up
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default SignUp;
