import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Quotes from "./components/Quotes";
import Quote from "./components/Quote";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <div className="containerWrapper">
        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path="/quote" element={<Quote name="kalle" />} />
          <Route path="/quote/:id" element={<Quote />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
