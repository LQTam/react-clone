import React from "react";
import "../css/Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import { SearchOutlined } from "@material-ui/icons";
import { IconButton, Avatar } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
import axios from "../axios";
import { useStateValue } from "../StateProvider";

function Sidebar({ rooms }) {
  const [{ user }, dispatch] = useStateValue();
  const createChat = async () => {
    let roomName = prompt("Please enter name for chat room.");

    while (roomName === "") {
      roomName = prompt("Please enter name for chat room.");
    }
    await axios.post("/rooms/new", { name: roomName });
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={createChat}>
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
        {rooms?.map((roomData, key) => (
          <SidebarChat key={key} {...roomData} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
