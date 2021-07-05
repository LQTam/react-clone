import React, { useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
  setSignOut,
} from "../features/user/userSlice";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { HOME, LOGIN } from "../routes";

function Header() {
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        history.push(HOME);
      } else {
        history.push(LOGIN);
      }
    });
  }, [dispatch, history]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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
        <IconButton>
          <Forum />
        </IconButton>
        <IconButton>
          <NotificationsActive />
        </IconButton>
        <IconButton
          aria-controls="simple-menu"
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
