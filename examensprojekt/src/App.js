import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Quotes from "./components/Quotes";
import Quote from "./components/Quote";
import LoginPage from "./components/LoginPage";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <div className="containerWrapper">
        <h1 className="motto">Motiden</h1>
        <Routes>
          <Route path="/" element={<Quotes />} />
          <Route path="/quote" />
          <Route path="/quote/:id" element={<Quote />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
