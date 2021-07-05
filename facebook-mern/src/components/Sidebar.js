import { Avatar } from "@material-ui/core";
import {
  EmojiFlags,
  ExpandMoreOutlined,
  People,
  Storefront,
  SupervisedUserCircle,
  VideoLibrary,
} from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import "../css/Sidebar.css";
import { selectUserEmail, selectUserPhoto } from "../features/user/userSlice";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);
  return (
    <div className="sidebar">
      <div className="sidebar__row">
        {userPhoto ? <Avatar src={userPhoto} /> : <Avatar />}
        <p>{userEmail}</p>
      </div>
      <SidebarRow Icon={People} title="Friends" />
      <SidebarRow Icon={Storefront} title="Marketplace" />
      <SidebarRow Icon={SupervisedUserCircle} title="Groups" />
      <SidebarRow Icon={EmojiFlags} title="Pages" />
      <SidebarRow Icon={VideoLibrary} title="Watch" />
      <SidebarRow Icon={ExpandMoreOutlined} title="See more" />
    </div>
  );
}

export default Sidebar;
