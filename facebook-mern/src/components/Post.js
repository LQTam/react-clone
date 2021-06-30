import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  AccountCircle,
  BookmarkBorder,
  ChatBubbleOutline,
  ExpandMoreOutlined,
  MoreHoriz,
  NearMe,
  NotificationsNone,
  ThumbUp,
  Code,
  Backspace,
  DeleteOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import "../css/Post.css";
import axios from "../axios";
import { useSelector } from "react-redux";
import { selectUserUID } from "../features/user/userSlice";

function Post({ _id, profilePic, message, timestamp, imgName, userName, uid }) {
  const [showAction, setShowAction] = useState(false);
  const userUID = useSelector(selectUserUID);
  const removeItem = async () => {
    let postId = _id;
    await axios.delete(`/posts/${postId}/delete`);
    if (imgName) {
      await axios.delete(`/images/${imgName}/delete`);
    }
    setShowAction(false);
  };
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>
            <Link to="/">{userName}</Link>
          </h3>
          <p>
            <Link to="/">{new Date(parseInt(timestamp)).toUTCString()}</Link>
          </p>
        </div>

        <div className="post__topAction">
          <MoreHoriz
            className="action__dropdown"
            onClick={() => setShowAction(!showAction)}
          />
          <div className={`action__dropdownMenu ${showAction ? `show` : ``}`}>
            <ul>
              <li>
                <BookmarkBorder />
                <span>Save Post</span>
              </li>
              <hr />
              <li>
                <NotificationsNone />
                <span>Turn on notifications for this post</span>
              </li>
              <hr />
              <li>
                <Code />
                <span>Emmbed</span>
              </li>
              <li>
                <Backspace />
                <span>Hide post</span>
              </li>
              <hr />
              {uid === userUID && (
                <li onClick={removeItem}>
                  <DeleteOutlined />
                  <span>
                    Move to Recycle bin
                    <br />
                    <span className="note">
                      Items in your Recycle bin are deleted after 30 days.
                    </span>
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="post__bottom">
        <p className="post__message">{message}</p>
      </div>

      {imgName && (
        <div className="post__image">
          <img
            src={`${process.env.REACT_APP_ENDPOINT}/retrieve/images/single?name=${imgName}`}
            alt={imgName}
          />
        </div>
      )}
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
