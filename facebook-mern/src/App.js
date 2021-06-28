import React from "react";
import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        {/* HEADER */}

        {/* SIDEBAR */}
        <Sidebar />
        {/* FEED */}
        <Feed />
        {/* WIDGETS */}
      </div>
    </div>
  );
}

export default App;
