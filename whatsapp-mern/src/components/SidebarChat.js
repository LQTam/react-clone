import React from "react";
import "../css/SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "../axios";
import { useState } from "react";

function SidebarChat({ _id, name, messages }) {
  const [roomMessages, setRoomMessages] = useState([]);
  useEffect(() => {
    if (_id) {
      axios.get(`/rooms/${_id}`).then(({ data }) => {
        setRoomMessages(data.messages);
      });
    }
  }, [_id]);
  return (
    <Link to={`/rooms/${_id}`}>
      <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{roomMessages[roomMessages.length - 1]?.message}</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
