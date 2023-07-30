// src/Login.js
import React, { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseApp from "../firebase"; // Import the firebase.js file
import { AuthContext } from "../AuthContext"; // Import the AuthContext

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
  // console.log(currentUser.uid);
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
    <div>
      <h2>{currentUser ? "Logout" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={!currentUser}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!currentUser}
          />
        </div>
        <button type="submit">{currentUser ? "Logout" : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
