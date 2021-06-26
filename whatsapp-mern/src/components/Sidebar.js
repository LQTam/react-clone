import React from "react";
import "../css/Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import { SearchOutlined } from "@material-ui/icons";
import { IconButton, Avatar } from "@material-ui/core";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://scontent.fhan5-5.fna.fbcdn.net/v/t1.18169-9/21768228_757317117787304_1170335793410169460_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=0debeb&_nc_ohc=iCt7FHNzBNMAX-BvQbl&_nc_ht=scontent.fhan5-5.fna&oh=c1acb472953a628a2ae9418150cf29e8&oe=60DCD69B" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
