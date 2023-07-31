// src/Login.js
import React, { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseApp from "../firebase"; // Import the firebase.js file
import { AuthContext } from "../AuthContext"; // Import the AuthContext
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
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
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {currentUser ? "Logout" : "Login"}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required={!currentUser}
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required={!currentUser}
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {currentUser ? "Logout" : "Login"}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
