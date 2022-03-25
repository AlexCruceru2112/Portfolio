import React from "react";

import Home from "./components/Home";
import Details from "./components/Details";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:name" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
