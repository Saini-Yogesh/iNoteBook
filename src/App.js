import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
// import Alert from "./components/Alert";
// import { useState } from "react";
import "./App.css";

function App() {
  // const [Alert, setAlert] = useState({ type: "succes", msg: "done" });
  // let showAlert = (massage, type) => {
  //   setAlert({
  //     msg: massage,
  //     type: type,
  //   });
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 1500);
  // };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert alert={Alert} /> */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/iNoteBook" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
