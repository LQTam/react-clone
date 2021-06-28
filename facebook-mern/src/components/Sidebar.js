import {
  EmojiFlags,
  ExpandMoreOutlined,
  People,
  Storefront,
  SupervisedUserCircle,
  VideoLibrary,
} from "@material-ui/icons";
import React from "react";
import "../css/Sidebar.css";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarRow
        src="https://scontent.fhan5-5.fna.fbcdn.net/v/t1.18169-9/21768228_757317117787304_1170335793410169460_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=0debeb&_nc_ohc=iCt7FHNzBNMAX-BvQbl&_nc_ht=scontent.fhan5-5.fna&oh=c1acb472953a628a2ae9418150cf29e8&oe=60DCD69B"
        title="TamLQ"
      />
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
