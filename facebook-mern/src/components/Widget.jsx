import { IconButton } from "@material-ui/core";
import { MoreVert, NoteAdd } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import "../css/Widget.css";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUID } from "../features/user/userSlice";
import ChatWindow from "./ChatWindow";
import OnlineUser from "./OnlineUser";
import MinimizeChat from "./MinimizeChat";
import {
  isOpenConversation,
  setConversations,
} from "../features/conversation/conversationSlice";
import Pusher from "pusher-js";
import { io } from "socket.io-client";
import { selectUsers, setUsers } from "../features/user/usersSlice";

function Widget({ currentConversation }) {
  const uid = useSelector(selectUserUID);
  const [chatWindows, setChatWindows] = useState([]);
  const [chatMinimizes, setChatMinimizes] = useState([]);
  const users = useSelector(selectUsers);
  const open = useSelector(isOpenConversation);
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const socketIO = useRef();

  const addToChat = (user) => {
    if (chatWindows.length <= 0) {
      let minimizeIndex = chatMinimizes.findIndex(
        (item) => item.uid === user.uid
      );
      if (minimizeIndex > -1) {
        const removeItem = chatMinimizes[minimizeIndex];
        chatMinimizes.splice(minimizeIndex, 1);
        setChatWindows([removeItem, ...chatWindows]);
        setChatMinimizes([...chatMinimizes]);
      } else {
        setChatWindows([user, ...chatWindows]);
      }
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
            setChatWindows([user, ...chatWindows]);
            setChatMinimizes([...chatMinimizes]);
          } else {
            let minimizeUser = chatWindows.pop();
            setChatWindows([user, ...chatWindows]);
            setChatMinimizes([minimizeUser, ...chatMinimizes]);
            const userNameAllChatWindow = document.querySelectorAll(
              ".chat__window>.chat__header .user__name"
            );
            setTimeout(() => {
              const elClicked = Array.from(userNameAllChatWindow).filter(
                (el) => el.innerText === (user.displayName || user.email)
              )[0];
              const input = elClicked
                ?.closest(".chat__window")
                ?.querySelector(".messageSenderBox>form>input");
              input.focus();
            }, 500);
          }
        } else {
          const userNameAllChatWindow = document.querySelectorAll(
            ".chat__window>.chat__header .user__name"
          );
          const elClicked = Array.from(userNameAllChatWindow).filter(
            (el) => el.innerText === (user.displayName || user.email)
          )[0];
          const input = elClicked
            ?.closest(".chat__window")
            ?.querySelector(".messageSenderBox>form>input");
          input.focus();
          console.log(input);
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
  useEffect(() => {
    let messageSenderInput = document.querySelectorAll(
      ".messageSenderBox>form>input[type=text]"
    );
    messageSenderInput[0]?.focus();
  }, [chatWindows]);

  useEffect(() => {
    if (currentConversation) addToChat(currentConversation);
  }, [currentConversation]);
  return (
    <div className="widgets">
      <div className="online__users">
        {users?.map((user, key) => (
          <OnlineUser user={user} key={key} addToChat={addToChat} />
        ))}
      </div>

      <div className="chat__windows">
        {chatWindows?.map((user, key) => (
          <ChatWindow
            key={key}
            user={user}
            minimizeChatWindow={minimizeChatWindow}
            handleCloseChat={handleCloseChat}
          />
        ))}
      </div>
      <div className="minimize__chats">
        {chatMinimizes.length > 0 && (
          <>
            <IconButton className="moreAction">
              <MoreVert />
            </IconButton>
            {chatMinimizes.map((user, key) => (
              <MinimizeChat
                key={key}
                user={user}
                addToChat={addToChat}
                handleCloseChat={handleCloseChat}
              />
            ))}
            <IconButton className="newMessage">
              <NoteAdd />
            </IconButton>
          </>
        )}
      </div>
      {/* <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPersonal-Learning-English-103638948572232&tabs=timeline&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&width=340&height=1500"
        width="340"
        height="800"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        title="Personal Learning English Page"
        allow="encrypted-media"
      ></iframe> */}
    </div>
  );
}

export default Widget;
