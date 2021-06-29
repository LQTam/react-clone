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
import { selectUserName, selectUserPhoto } from "../features/user/userSlice";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  return (
    <div className="sidebar">
      <SidebarRow src={userPhoto} title={userName} />
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
