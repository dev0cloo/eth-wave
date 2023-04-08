import { useState, useEffect } from "react";
import abi from "./utils/MessagePortal.json";
import "./App.css";
// import function to register Swiper custom elements
import { Navbar, Footer, Welcome, Loader, Transactions } from "./components";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        <Transactions />
      </div>
    </div>
  );
};

export default App;
