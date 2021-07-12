import React from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";

function Home({ currentConversation }) {
  return (
    <>
      {/* SIDE BAR */}
      <Sidebar />
      {/* FEED */}
      <Feed />
      {/* WIDGETS */}
      <Widget currentConversation={currentConversation} />
    </>
  );
}

export default Home;
