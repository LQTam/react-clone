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
  NoteAdd,
  Share,
  ThumbUp,
  Videocam,
} from "@material-ui/icons";
import { createRef, useEffect, useState } from "react";
import "../css/Widget.css";
import axios from "../axios";
import { useSelector } from "react-redux";
import { selectUserUID } from "../features/user/userSlice";
function Widget() {
  const uid = useSelector(selectUserUID);
  const [chatWindows, setChatWindows] = useState([]);
  const [chatMinimizes, setChatMinimizes] = useState([]);
  const [elRefs, setElRefs] = useState([]);
  const handleSendMessage = (e, user, key) => {
    e.preventDefault();
    const inputEl = elRefs[key]?.current;
    inputEl.value = "";
  };
  const addToChat = (user, key) => {
    if (chatWindows.length <= 0) {
      let minimizeIndex = chatMinimizes.findIndex(
        (item) => item.uid === user.uid
      );
      if (minimizeIndex > -1) {
        const removeItem = chatMinimizes[minimizeIndex];
        chatMinimizes.splice(minimizeIndex, 1);
        setChatWindows([removeItem, ...chatWindows]);
        setChatMinimizes([...chatMinimizes]);
      } else setChatWindows([user, ...chatWindows]);
    } else {
      if (
        !chatWindows.some((item) => item.uid === user.uid) &&
        !chatMinimizes.some((item) => item.uid === user.uid)
      ) {
        if (chatWindows.length >= 3) {
          let minimizeUser = chatWindows.pop();
          setChatMinimizes([minimizeUser, ...chatMinimizes]);
          setChatWindows([user, ...chatWindows]);
        } else {
          setChatWindows([user, ...chatWindows]);
        }
      } else {
        let chatWindowIndex = chatWindows.findIndex((item) => item.uid === uid);
        let minimizeIndex = chatMinimizes.findIndex(
          (item) => item.uid === user.uid
        );
        if (minimizeIndex > -1 && chatWindowIndex < 0) {
          chatMinimizes.splice(minimizeIndex, 1);
          if (chatWindows.length <= 2) {
            console.log("run here");
            setChatWindows([user, ...chatWindows]);
            setChatMinimizes([...chatMinimizes]);
          } else {
            let minimizeUser = chatWindows.pop();
            setChatWindows([user, ...chatWindows]);
            setChatMinimizes([minimizeUser, ...chatMinimizes]);
          }
        } else {
          elRefs[key].current.focus();
        }
      }
    }
  };
  const minimizeChatWindow = (user) => {
    let index = chatWindows.findIndex((item) => item.uid === user.uid);
    chatWindows[index].isMinimize = true;
    setChatWindows([...chatWindows]);
  };
  const handleCloseChat = (user) => {
    let chatIndex = chatWindows.findIndex((item) => item.uid === user.uid);
    let minimizeIndex = chatMinimizes.findIndex(
      (item) => item.uid === user.uid
    );
    if (chatIndex > -1) {
      chatWindows.splice(chatIndex, 1);
      setChatWindows([...chatWindows]);
    } else if (minimizeIndex > -1) {
      chatMinimizes.splice(minimizeIndex, 1);
      setChatMinimizes([...chatMinimizes]);
    }
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      let { data } = await axios.get("/users");
      const users = data.users.filter((user) => user.uid !== uid);
      setUsers(users);
    };
    return fetchUsers();
  }, [uid]);
  useEffect(() => {
    let messageSenderInput = document.querySelectorAll(
      ".messageSenderBox>form>input[type=text]"
    );
    messageSenderInput[0]?.focus();
  }, [chatWindows]);
  useEffect(() => {
    setElRefs((elRefs) =>
      Array(chatWindows.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [chatWindows]);
  return (
    <div className="widgets">
      <div className="online__users">
        {users?.map((user, key) => (
          <div key={key} className="user" onClick={() => addToChat(user, key)}>
            <div className="user__avatar">
              <Avatar src={user.photoURL} />
            </div>
            <h4 className="user__name">{user.displayName || user.email}</h4>
          </div>
        ))}
      </div>
      <div className="chat__windows">
        {chatWindows?.map((user, key) => (
          <div key={key} className="chat__window">
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
                <div
                  className="chat__option"
                  onClick={() => handleCloseChat(user)}
                >
                  <IconButton>
                    <Close />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="chat__messages">
              <div className="message__box">
                <Avatar src={user.photoURL} className="user__avatar" />
                <div className="message">
                  <p>Oki toi dang setup gioi han devices</p>
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
              <div className="message__box sender">
                <Avatar src={user.photoURL} className="user__avatar" />
                <div className="message">
                  <p>Oke t cho test</p>
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
                <form onSubmit={(e) => handleSendMessage(e, user, key)}>
                  <input type="text" placeholder="Aa" ref={elRefs[key]} />
                  <InsertEmoticon className="chooseEmojiMessage" />
                  <button type="submit">Send</button>
                </form>
                <IconButton>
                  <ThumbUp />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="minimize__chats">
        <IconButton className="moreAction">
          <MoreVert />
        </IconButton>
        {chatMinimizes?.map((user, key) => (
          <div key={key} className="minimiz__chat">
            <Avatar
              src={user.photoURL}
              fontSize="large"
              onClick={() => addToChat(user, key)}
            />
            <div className="close" onClick={() => handleCloseChat(user)}>
              X
            </div>
            <div className="user__info">
              <h4>{user.displayName || user.email}</h4>
              <p>Last message</p>
            </div>
          </div>
        ))}
        <IconButton className="newMessage">
          <NoteAdd />
        </IconButton>
      </div>
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPersonal-Learning-English-103638948572232&tabs=timeline&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&width=340&height=1500"
        width="340"
        height="800"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        title="Personal Learning English Page"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default Widget;
