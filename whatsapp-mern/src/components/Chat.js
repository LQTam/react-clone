import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  SearchOutlined,
} from "@material-ui/icons";
import MoreVert from "@material-ui/icons/MoreVert";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../css/Chat.css";
import axios from "../axios";
import { useStateValue } from "../StateProvider";
import Pusher from "pusher-js";

function Chat() {
  const [{ user }, dispatch] = useStateValue();
  const [message, setMessage] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  useEffect(() => {
    if (roomId) {
      axios.get(`/rooms/${roomId}`).then(({ data }) => {
        setRoomName(data.name);
        setRoomMessages(data.messages);
      });
    }
  }, [roomId]);

  useEffect(() => {
    var pusher = new Pusher("56d23b108dfd4f5ecf4c", {
      cluster: "ap1",
    });

    var roomChannel = pusher.subscribe("rooms");
    roomChannel.bind("roomMessageUpdate", function (newMessage) {
      console.log(newMessage);
      setRoomMessages([...roomMessages, newMessage]);
    });

    return () => {
      roomChannel.unbind_all();
      roomChannel.unsubscribe();
    };
  }, [roomMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post(`/rooms/${roomId}/messages/new`, {
      name: user.displayName,
      message: message,
      timestamp: new Date().toLocaleString(),
      received: false,
      uid: user.uid,
    });

    setMessage("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen {roomMessages[roomMessages.length - 1]?.timestamp}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <AttachFile />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {roomMessages?.map((message, key) => (
          <p
            key={key}
            className={`chat__message ${
              message.uid === user.uid && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
