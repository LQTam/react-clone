import { Avatar } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

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
import React, { useRef, useState } from "react";
import "../css/Post.css";
import axios from "../axios";
import { useSelector } from "react-redux";
import { selectUserUID } from "../features/user/userSlice";

function Post({
  _id,
  profilePic,
  message,
  timestamp,
  imgName,
  userName,
  uid,
  images,
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const userUID = useSelector(selectUserUID);
  const removeItem = async () => {
    let postId = _id;
    await axios.delete(`/posts/${postId}/delete`, { data: { images } });
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>
            <Link to="/">{userName}</Link>
          </h3>
          <p>
            <Link to="/">{new Date(parseInt(timestamp)).toLocaleString()}</Link>
          </p>
        </div>

        <div className="post__topAction">
          <MoreHoriz
            className="action__dropdown"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          />
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            className="action__dropdownMenu"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        <BookmarkBorder />
                        <span>Save Post</span>
                      </MenuItem>
                      <hr />
                      <MenuItem onClick={handleClose}>
                        <NotificationsNone />
                        <span>Turn on notifications for this post</span>
                      </MenuItem>
                      <hr />
                      <MenuItem onClick={handleClose}>
                        <Code />
                        <span>Emmbed</span>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Backspace />
                        <span>Hide post</span>
                      </MenuItem>
                      {uid === userUID && [
                        <hr key={1} />,
                        <MenuItem key={2} onClick={removeItem}>
                          <DeleteOutlined />
                          <span>
                            Move to Recycle bin
                            <br />
                            <span className="note">
                              Items in your Recycle bin are deleted after 30
                              days.
                            </span>
                          </span>
                        </MenuItem>,
                      ]}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>

      <div className="post__bottom">
        <p className="post__message">{message}</p>
      </div>

      <div
        className={`post__image ${
          images?.length === 1
            ? "one-image"
            : images?.length === 2
            ? "two-image"
            : images?.length === 3
            ? "three-image"
            : images?.length >= 4
            ? "image-more"
            : ""
        }`}
      >
        {images?.map((image, key) =>
          key + 1 <= 4 ? (
            <div key={key} className={`post__imageItem item${key + 1}`}>
              {image.mimetype.includes("image") ? (
                <img
                  src={`${process.env.REACT_APP_AWS_BASE_URL}/${image.showLink}`}
                  alt={image.originalname}
                />
              ) : (
                <video controls>
                  <source
                    src={`${process.env.REACT_APP_AWS_BASE_URL}/${image.showLink}`}
                    type={image.mimetype}
                  ></source>
                </video>
              )}
            </div>
          ) : (
            []
          )
        )}
        {images?.length > 4 && (
          <div className={`post__imageItem item4`}>
            {images[3].mimetype.includes("image") ? (
              <img
                src={`${process.env.REACT_APP_AWS_BASE_URL}/${images[3].showLink}`}
                alt={images[3].originalname}
              />
            ) : (
              <video controls>
                <source
                  src={`${process.env.REACT_APP_AWS_BASE_URL}/${images[3].showLink}`}
                  type={images[3].mimetype}
                ></source>
              </video>
            )}
            <span className="numberImageMore">+{images?.length - 3}</span>
          </div>
        )}
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
