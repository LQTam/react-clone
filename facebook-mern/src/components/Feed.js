import React from "react";
import "../css/Feed.css";
import StoryReel from "./StoryReel";
// import MessageSender from "./MessageSender";
// import Post from "./Post";

function Feed() {
  //   const postData = [];
  return (
    <div className="feed">
      <StoryReel />
      {/* <MessageSender />
      {postData?.map((post) => (
        <Post
          profilePic={post.profilePic}
          message={post.message}
          timestamp={post.timestamp}
          imgName={post.imgName}
          userName={post.user}
        />
      ))} */}
    </div>
  );
}

export default Feed;
