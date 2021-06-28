import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  Add,
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

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png"
          alt="facebook logo"
        />
      </div>
      <div className="header__input">
        <Search />
        <input placeholder="Search Facebook" type="text" />
      </div>
      <div className="header__center">
        <div className="header__option header__option-active">
          <Home fontsize="large" />
        </div>
        <div className="header__option">
          <Flag fontsize="large" />
        </div>
        <div className="header__option">
          <SubscriptionsOutlined fontsize="large" />
        </div>
        <div className="header__option">
          <SupervisedUserCircle fontsize="large" />
        </div>
      </div>

      <div className="header__right">
        <div className="header__rightInfo">
          <Avatar />
          <h4>TamLQ</h4>
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
        <IconButton>
          <ExpandMore />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
