import { Avatar, IconButton } from "@material-ui/core";
import {
  Add,
  Apps,
  Call,
  Gif,
  Image,
  Info,
  InsertEmoticon,
  MoreHoriz,
  MoreVert,
  NoteAdd,
  OpenWith,
  Share,
  ThumbUp,
  VideoCall,
  Videocam,
} from "@material-ui/icons";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import MessengerComponent from "../components/Messenger";
import "../css/MessengerPage.css";
import { useSelector } from "react-redux";
import { selectUserUID } from "../features/user/userSlice";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Conversation from "../components/Conversation";
import axios from "../axios";
import Pusher from "pusher-js";

import { selectUsers } from "../features/user/usersSlice";
function Messenger() {
  const uid = useSelector(selectUserUID);
  const users = useSelector(selectUsers);
  const [currentConversation, setCurrentConversation] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [conversationMessages, setConversationMessages] = React.useState();
  const scrollRef = React.useRef();

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
        let { data } = await axios.post("/message/new", messageObject);
      } else {
        const conversationResponse = await axios.post(
          "/conversation/new",
          conversationObject
        );
        messageObject.conversation_id = conversationResponse.data._id;
        setCurrentConversation(conversationResponse.data);
        await axios.post("/message/new", messageObject);
      }
    }
    setMessage("");
  };

  React.useEffect(() => {
    let channel_name = `private-messages.${currentConversation?._id}`;
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      authEndpoint: `${process.env.REACT_APP_SERVER_ENDPOINT}/${process.env.REACT_APP_PUSHER_AUTH_ENDPOINT}`,
    });
    pusher.connection.bind("connected", async () => {
      let channel = pusher.subscribe(channel_name);
      channel.bind("pusher:subscription_succeeded", () => {
        channel.bind("inserted", (data) => {
          setConversationMessages((prevState) => [...prevState, data]);
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

  function getCurrentConversation(c, u) {
    setCurrentConversation(c);
    setUser(u);
  }

  React.useEffect(() => {
    async function getMessages() {
      const { data } = await axios.get(`/message/${currentConversation._id}`);
      setConversationMessages(data);
    }
    if (currentConversation) {
      getMessages();
    }
  }, [user]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);
  return (
    <div className="messengerPage">
      <div className="leftSidebar">
        <MessengerComponent setCurrentConversation={getCurrentConversation} />
      </div>
      {currentConversation ? (
        <div className={`conversationContent ${show ? "show" : ""}`}>
          <div className="conversation">
            <div className="chat__header">
              <div className="chat__info">
                <div className="user__avatar">
                  <Avatar src={user?.photoURL} />
                </div>
                <h4 className="user__name">
                  {user?.displayName || user?.email}
                </h4>
              </div>
              <div className="chat__options">
                <div className="chat__option">
                  <IconButton>
                    <Call />
                  </IconButton>
                </div>
                <div className="chat__option">
                  <IconButton>
                    <Videocam />
                  </IconButton>
                </div>
                <div className="chat__option">
                  <IconButton onClick={() => setShow((show) => !show)}>
                    <Info />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="chat__messages">
              {conversationMessages?.map((c, key) => (
                <div
                  className={`message__box ${
                    c.sender_id === uid ? "sender" : ""
                  }`}
                  key={key}
                  ref={scrollRef}
                >
                  <Avatar
                    src={
                      user.photoURL ??
                      "https://i.pinimg.com/originals/ad/e5/e4/ade5e4933411e182bc6f9a92418bdfde.jpg"
                    }
                    className="user__avatar"
                  />
                  <div className="message">
                    <p>{c.message}</p>
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
          <div className={`conversationInformation ${show ? "show" : ""}`}>
            <div className="center">
              <Avatar src={user?.photoURL} />
              <h4>{user?.displayName || user?.email}</h4>
            </div>
            <div className="custom__chat">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={"heading"}>Custom Chat</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="privacy__support">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={"heading"}>
                    Privacy & Support
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="conversationContent choose__conversation">
          Please select a conversation to start chatting.
        </h2>
      )}
    </div>
  );
}

export default Messenger;
