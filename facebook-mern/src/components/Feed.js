import React, { useEffect, useState } from "react";
import "../css/Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";
import axios from "../axios";
import Pusher from "pusher-js";
import { selectUserName, selectUserPhoto } from "../features/user/userSlice";
import { useSelector } from "react-redux";
const pusher = new Pusher("cef11e57182d122d1edb", {
  cluster: "ap1",
});

function Feed() {
  const [profilePic, setProfilePic] = useState("");
  const [postsData, setPostsData] = useState([]);
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const syncFeed = () => {
    axios.get("/retrieve/posts").then(({ data }) => setPostsData(data));
  };

  useEffect(() => {
    const channel = pusher.subscribe("posts");
    channel.bind("inserted", function (data) {
      syncFeed();
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    syncFeed();
  }, []);
  console.log(postsData);
  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      {postsData?.map((post, key) => (
        <Post
          key={key}
          profilePic={post.avatar}
          message={post.text}
          timestamp={post.timestamp}
          imgName={post.imgName}
          userName={post.user}
        />
      ))}
    </div>
  );
}

export default Feed;
