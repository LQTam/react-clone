import React, { useEffect, useRef, useState } from "react";
import Menu from "@material-ui/core/Menu";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Messenger from "./Messenger";
import { Avatar, IconButton } from "@material-ui/core";
import {
  Add,
  ExitToApp,
  ExpandMore,
  Flag,
  Forum,
  Home,
  NotificationsActive,
  Search,
  SubscriptionsOutlined,
  SupervisedUserCircle,
} from "@material-ui/icons";
import "../css/Header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserPhoto,
  selectUserUID,
  setSignOut,
  setUserLogin,
} from "../features/user/userSlice";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { HOME, LOGIN } from "../routes";
import Pusher from "pusher-js";
import axios from "../axios";
import { setUsers } from "../features/user/usersSlice";
import {
  selectConversations,
  setConversations,
} from "../features/conversation/conversationSlice";
import { useClickOutside } from "./useClickOutside";

function Header({ setCurrentConversation }) {
  const uid = useSelector(selectUserUID);
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  // const [conversations, setConversations] = useState([]);
  // const [conversations, setConversations] = useState([]);
  const conversations = useSelector(selectConversations);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const fetchConversations = async () => {
    let { data } = await axios.get(`/conversations/${uid}`);
    dispatch(setConversations(data));
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  useEffect(() => {
    fetchConversations();
  }, [uid]);
  React.useEffect(() => {
    const fetchUsers = async () => {
      let { data } = await axios.get("/users");
      const otherUsers = data.users.filter((user) => user.uid !== uid);
      let usersFilter = otherUsers.map(
        ({ displayName, email, photoURL, uid }) => ({
          displayName,
          email,
          photoURL,
          uid,
        })
      );
      dispatch(setUsers(usersFilter));
    };
    fetchUsers();
  }, [uid]);
  useEffect(() => {
    const fetchNotifications = async () => {
      let { data } = await axios.get("/retrieve/notification");
      setNotifications(data);
    };
    fetchNotifications();
  }, []);
  useEffect(() => {
    let channel_name = `notification.${uid}`;
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      authEndpoint: `${process.env.REACT_APP_SERVER_ENDPOINT}/${process.env.REACT_APP_PUSHER_AUTH_ENDPOINT}`,
    });
    let channel = pusher.subscribe(channel_name);
    let conversationChannel = pusher.subscribe("conversations");
    // channel.bind("pusher:subscription_succeeded", () => {
    channel.bind("new-message", (data) => {
      console.log("new-message", data);
      setNotifications((prevState) => [...prevState, data]);
    });
    conversationChannel.bind("inserted", (data) => {
      setConversations((prevState) => [...prevState, data]);
    });
    // });
    // channel.bind("pusher:subscription_error", () => {
    //   console.log("subscription_error");
    // });
    pusher.connection.bind("connected", async () => {});
    return () => {
      pusher.unsubscribe(channel_name);
      pusher.unbind("new-message");
    };
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        history.push(HOME);
      } else {
        history.push(LOGIN);
      }
    });
  }, [uid, dispatch, history]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let messengerDomNode = useClickOutside(() => {
    setOpen(false);
  });

  const signOut = () => {
    var answer = window.confirm("Are you sure you want to logout?");
    if (answer) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOut());
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__leftLogo">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png"
              alt="facebook logo"
              width="45"
            />
          </Link>
        </div>
        <div className="header__input">
          <Search />
          <input placeholder="Search Facebook" type="text" />
        </div>
      </div>
      <div className="header__center">
        <div className="header__option header__option-active">
          <Home fontSize="large" />
        </div>
        <div className="header__option">
          <Flag fontSize="large" />
        </div>
        <div className="header__option">
          <SubscriptionsOutlined fontSize="large" />
        </div>
        <div className="header__option">
          <SupervisedUserCircle fontSize="large" />
        </div>
      </div>

      <div className="header__right">
        <div className="header__rightInfo">
          <Avatar src={userPhoto} />
          <h4>{userEmail}</h4>
        </div>
        <IconButton>
          <Add />
        </IconButton>
        {/* <IconButton
          className="messenger"
          ref={anchorRef}
          aria-controls={open ? "messenger-list-grow" : undefined}
          aria-haspopup="true"
          onClick={(e) => handleMessengerClick(e)}
        >
      */}
        <IconButton
          className="messenger"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <Forum />
          <div className="badge">
            {conversations.length > 0 && conversations.length}
          </div>

          <div ref={messengerDomNode} className={open ? "open" : "hidden"}>
            <Messenger setCurrentConversation={setCurrentConversation} />
          </div>
          {/* <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            className="messenger__menu"
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
                  <MenuList id="messenger-list-grow">
                    <Messenger
                      setCurrentConversation={setCurrentConversation}
                    />
                  </MenuList>
                </Paper>
              </Grow>
            )}
          </Popper> */}
        </IconButton>

        <IconButton className="notification">
          <NotificationsActive />
          <div className="badge">
            {notifications.length > 0 && notifications.length}
          </div>
        </IconButton>
        <IconButton
          aria-controls="header__option-expandMore"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <ExpandMore />
        </IconButton>
        <Menu
          className="header__rightLogout"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={signOut}>
            <ExitToApp />
            <span>Logout</span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
