import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import axios from "../axios";
import timeago from "../timeago";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../features/user/usersSlice";
import { selectUserUID } from "../features/user/userSlice";
import { useHistory } from "react-router-dom";
import Pusher from "pusher-js";

function Conversation({ conversation, setCurrentConversation }) {
  const uid = useSelector(selectUserUID);
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [user, setUser] = React.useState(null);
  const [messages, setMessages] = useState([]);
  const [messageCreated, setMessageCreated] = useState(null);
  const history = useHistory();
  const geConMessages = async () => {
    let messageData = await axios.get(`/message/${conversation._id}`);
    const friendId = conversation.members.find((m) => m !== uid);
    setUser(users.filter((u) => u.uid === friendId)[0]);
    setMessages(messageData?.data);
  };
  useEffect(() => {
    geConMessages();
  }, [conversation]);
  function handleGetConversation(c) {
    let { pathname } = history.location;
    const messengerPath = pathname.split("/");
    if (messengerPath[messengerPath.length - 1] === "messenger") {
      setCurrentConversation(c, user);
    } else {
      setCurrentConversation(c, user);
    }
  }
  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      authEndpoint: `${process.env.REACT_APP_SERVER_ENDPOINT}/${process.env.REACT_APP_PUSHER_AUTH_ENDPOINT}`,
    });
    let messageChannel = pusher.subscribe("message");
    messageChannel.bind("new-message", (data) => {
      setMessageCreated(data);
      let index = messages.findIndex(
        (m) => m.conversation_id === data.conversation_id
      );
      if (index > -1) {
        setMessages((messages) => [...messages, data]);
      }
    });

    return () => {
      messageChannel.unsubscribe();
      messageChannel.unbind_all();
    };
  }, [messageCreated]);
  return (
    <div
      className="conversation"
      onClick={() => handleGetConversation(conversation)}
    >
      <Avatar src={user?.photoURL ?? ""} className="user__avatar" />
      <div className="user__info">
        <h3>{user?.displayName || user?.email}</h3>
        <p>
          {messages[messages.length - 1]?.message} -{" "}
          {timeago.format(
            messages[messages.length - 1]?.createdAt,
            "messenger_lastMessage"
          )}
        </p>
      </div>
      <div className="moreAction">
        <MoreHoriz />
      </div>
    </div>
  );
}

export default Conversation;
