import { Avatar } from "@material-ui/core";
import {
  AccountCircle,
  ChatBubbleOutline,
  ExpandMoreOutlined,
  NearMe,
  ThumbUp,
} from "@material-ui/icons";
import React from "react";
import "../css/Post.css";

function Post({ profilePic, message, timestamp, imgName, userName }) {
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{userName}</h3>
          <p>{new Date().toUTCString()}</p>
        </div>
      </div>

      <div className="post__bottom">
        <p className="post__message">{message}</p>
      </div>

      <div className="post__options">
        <div className="post__option">
          <ThumbUp />
          <p>Like</p>
        </div>
        <div className="post__option">
          <ChatBubbleOutline />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <NearMe />
          <p>Share</p>
        </div>
        <div className="post__option">
          <AccountCircle />
          <ExpandMoreOutlined />
        </div>
      </div>
    </div>
  );
}

export default Post;
