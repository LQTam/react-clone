import React, { useCallback, useEffect, useState } from "react";
import "../css/Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";
import axios from "../axios";
import Pusher from "pusher-js";
import {
  deletePostByGivenId,
  selectPostsData,
  setPostsData,
} from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
const pusher = new Pusher("cef11e57182d122d1edb", {
  cluster: "ap1",
});

function Feed() {
  const postsData = useSelector(selectPostsData);
  const dispatch = useDispatch();
  // const [postsData, setPostsData] = useState([]);
  const syncFeed = useCallback(() => {
    axios
      .get("/retrieve/posts")
      .then(({ data }) => dispatch(setPostsData(data)));
  }, [dispatch]);

  useEffect(() => {
    const channel = pusher.subscribe("posts");
    channel.bind("inserted", function (data) {
      syncFeed();
    });
    channel.bind("deleted", function (data) {
      let { _id } = data;
      dispatch(deletePostByGivenId({ _id }));
      // syncFeed();
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [syncFeed]);

  useEffect(() => {
    syncFeed();
  }, [syncFeed]);
  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      {postsData?.map((post, key) => (
        <Post
          _id={post._id}
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
