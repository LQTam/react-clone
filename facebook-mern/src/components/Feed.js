import React from "react";
import "../css/Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";

function Feed() {
  const postData = [];
  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      <Post
        profilePic="https://scontent.fhan5-5.fna.fbcdn.net/v/t1.18169-9/21768228_757317117787304_1170335793410169460_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=0debeb&_nc_ohc=iCt7FHNzBNMAX-BvQbl&_nc_ht=scontent.fhan5-5.fna&oh=c1acb472953a628a2ae9418150cf29e8&oe=60DCD69B"
        message="Yoo this is a message"
        timestime="time"
        imgName="imgName"
        userName="TamLQ"
      />
      <Post
        profilePic="https://scontent.fhan5-5.fna.fbcdn.net/v/t1.18169-9/21768228_757317117787304_1170335793410169460_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=0debeb&_nc_ohc=iCt7FHNzBNMAX-BvQbl&_nc_ht=scontent.fhan5-5.fna&oh=c1acb472953a628a2ae9418150cf29e8&oe=60DCD69B"
        message="Yoo this is a message"
        timestime="time"
        imgName="imgName"
        userName="TamLQ"
      />
      {postData?.map((post) => (
        <Post
          profilePic={post.profilePic}
          message={post.message}
          timestamp={post.timestamp}
          imgName={post.imgName}
          userName={post.user}
        />
      ))}
    </div>
  );
}

export default Feed;
