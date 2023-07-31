import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink,
  Routes,
} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import QuranPlayer from "./QuranPlayer/QuranPlayer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: theme.spacing(3), // change the number for more or less space
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Button color="inherit" component={RouterLink} to="/quranplayer">
              Quran Player
            </Button>
            <Typography variant="h6" className={classes.title} />
            <Button color="inherit" component={RouterLink} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quranplayer" element={<QuranPlayer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
