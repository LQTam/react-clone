import { Avatar, IconButton } from "@material-ui/core";
import {
  Add,
  Apps,
  ArrowDropDown,
  Call,
  Close,
  Gif,
  Image,
  InsertEmoticon,
  Minimize,
  MoreVert,
  Share,
  ThumbUp,
  Videocam,
} from "@material-ui/icons";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import {
  selectConversation,
  selectConversations,
} from "../features/conversation/conversationSlice";
import { selectUserUID } from "../features/user/userSlice";
import Pusher from "pusher-js";

function ChatWindow({ user, minimizeChatWindow, handleCloseChat }) {
  const [message, setMessage] = useState("");
  const uid = useSelector(selectUserUID);
  const dispatch = useDispatch();
  const [currentConversation, setCurrentConversation] = useState({});
  const [conversationMessages, setConversationMessages] = useState([]);
  const scrollRef = useRef();
  const [socketPusher, setSocketPusher] = useState(null);
  const conversations = useSelector(selectConversations);
  const getConversationAfterCreateNewConversation = async () => {
    let { data } = await axios.get(`/conversations/${uid}`);
    let currentConversationFilter = data?.filter((item) =>
      item.members.includes(user.uid)
    );
    if (currentConversationFilter.length > 0) {
      let messageData = await axios.get(
        `/message/${currentConversationFilter[0]._id}`
      );
      setConversationMessages(messageData?.data);
      setCurrentConversation(currentConversationFilter[0]);
    }
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (message !== "") {
      let conversation_id = currentConversation?._id || null;
      let messageObject = {
        message,
        sender_id: uid,
        conversation_id,
        receiver_id: user.uid,
      };
      const conversationObject = {
        sender_id: uid,
        receiver_id: user.uid,
      };
      if (conversation_id) {
        await axios.post("/message/new", messageObject);
      } else {
        const conversationResponse = await axios.post(
          "/conversation/new",
          conversationObject
        );
        messageObject.conversation_id = conversationResponse.data._id;
        setCurrentConversation(conversationResponse.data);
        await axios.post("/message/new", messageObject);
        getConversationAfterCreateNewConversation();
      }
    }
    setMessage("");
  };
  const getConversation = async (user) => {
    let index = conversations?.findIndex((item) =>
      item.members.includes(user.uid)
    );
    if (index > -1) {
      console.log(user.uid);
      console.log(conversations);
      let messageData = await axios.get(`/message/${conversations[index]._id}`);
      setConversationMessages(messageData?.data);
      setCurrentConversation(conversations[index]);
    } else {
      setConversationMessages([]);
      setCurrentConversation(null);
    }
  };
  useEffect(() => {
    getConversation(user);
  }, [user]);

  useEffect(() => {
    let channel_name = `private-messages.${currentConversation?._id}`;
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      authEndpoint: `${process.env.REACT_APP_SERVER_ENDPOINT}/${process.env.REACT_APP_PUSHER_AUTH_ENDPOINT}`,
    });
    pusher.connection.bind("connected", async () => {
      let channel = pusher.subscribe(channel_name);
      channel.bind("pusher:subscription_succeeded", () => {
        channel.bind("inserted", (data) => {
          // if (data.sender_id !== uid) {
          setConversationMessages((prevState) => [...prevState, data]);
          // }
        });
      });
      channel.bind("pusher:subscription_error", () => {
        console.log("subscription_error");
      });
    });
    return () => {
      pusher.unsubscribe(channel_name);
      pusher.unbind("inserted");
    };
  }, [currentConversation]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);
  return (
    <div className="chat__window">
      <div className="chat__header">
        <div className="chat__info">
          <div className="user__avatar">
            <Avatar src={user.photoURL} />
          </div>
          <h4 className="user__name">{user.displayName || user.email}</h4>
          <ArrowDropDown />
        </div>
        <div className="chat__options">
          <div className="chat__option">
            <IconButton>
              <Videocam />
            </IconButton>
          </div>
          <div className="chat__option">
            <IconButton>
              <Call />
            </IconButton>
          </div>
          <div
            className="chat__option"
            onClick={() => minimizeChatWindow(user)}
          >
            <IconButton>
              <Minimize />
            </IconButton>
          </div>
          <div className="chat__option" onClick={() => handleCloseChat(user)}>
            <IconButton>
              <Close />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="chat__messages">
        {conversationMessages?.map((c, key) => (
          <div
            ref={scrollRef}
            className={`message__box ${c.sender_id === uid ? "sender" : ""}`}
            key={key}
          >
            <Avatar src={user.photoURL} className="user__avatar" />
            <div className="message">
              <p>{c.message}</p>
            </div>
            <div className="message__options">
              <div className="message__option">
                <IconButton>
                  <InsertEmoticon fontSize="small" />
                </IconButton>
              </div>
              <div className="message__option">
                <IconButton>
                  <Share fontSize="small" />
                </IconButton>
              </div>
              <div className="message__option">
                <IconButton>
                  <MoreVert fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat__footer">
        <div className="footer__options">
          <div className="footer__option">
            <IconButton
              style={{
                color: "white",
                backgroundColor: "#2e81f4",
                padding: "0",
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </div>
          <div className="footer__option">
            <IconButton>
              <Image />
            </IconButton>
          </div>
          <div className="footer__option">
            <IconButton>
              <Apps />
            </IconButton>
          </div>
          <div className="footer__option">
            <IconButton
              style={{
                color: "white",
                backgroundColor: "#2e81f4",
                padding: "0",
              }}
            >
              <Gif fontSize="small" />
            </IconButton>
          </div>
        </div>

        <div className="messageSenderBox">
          <form onSubmit={(e) => handleSubmitForm(e)}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Aa"
            />
            <InsertEmoticon className="chooseEmojiMessage" />
            <button type="submit">Send</button>
          </form>
          <IconButton>
            <ThumbUp />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
