// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
// import Recorder from "./Recorder/Recorder";
import QuranPlayer from "./QuranPlayer/QuranPlayer";
// import AuthProvider from "./AuthContext";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* <li>
              <Link to="/recorder">Recorder</Link>
            </li> */}
            <li>
              <Link to="/quranplayer">Quran Player</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/recorder" element={<Recorder />} /> */}
          <Route path="/quranplayer" element={<QuranPlayer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
