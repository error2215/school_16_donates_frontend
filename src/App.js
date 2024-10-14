import React from "react";
import MainImg from "./components/MainImg";
import Navbar from "./components/Navbar";
import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainImg />
    </div>
  );
}

export default App;
