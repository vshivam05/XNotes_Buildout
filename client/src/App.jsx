import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./components/Notes";
function App() {
  return (
    <>
      <div>
        <Router>
        <Navbar />
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Register />}></Route>
            <Route path="/notes" element={<Notes/>}></Route>
          </Routes>
        </Router>
        {/* <Login></Login> */}
      </div>
    </>
  );
}

export default App;
