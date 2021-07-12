import { Avatar, IconButton } from "@material-ui/core";
import { MoreHoriz, NoteAdd, OpenWith, VideoCall } from "@material-ui/icons";
import React from "react";
import "../css/Messenger.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import Conversation from "./Conversation";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserUID } from "../features/user/userSlice";
import { setConversations } from "../features/conversation/conversationSlice";

function Messenger({ setCurrentConversation }) {
  const uid = useSelector(selectUserUID);
  const [userConversations, setUserConversations] = React.useState([]);
  const dispatch = useDispatch();

  const fetchConversations = async () => {
    let { data } = await axios.get(`/conversations/${uid}`);
    setUserConversations(data);
    dispatch(setConversations(data));
  };

  React.useEffect(() => {
    fetchConversations();
  }, [uid]);
  return (
    <div className="messengerContainer">
      <div className="messenger__header">
        <div className="headerTop">
          <h2>Messenger</h2>
          <div className="headerRight">
            <IconButton>
              <MoreHoriz />
            </IconButton>
            <IconButton>
              <OpenWith />
            </IconButton>
            <IconButton>
              <VideoCall />
            </IconButton>
            <IconButton>
              <NoteAdd />
            </IconButton>
          </div>
        </div>
        <div className="messenger__search">
          <SearchIcon />
          <input type="text" placeholder="Search Messenger" />
        </div>
      </div>

      <div className="conversationList">
        {userConversations.length > 0 ? (
          userConversations?.map((c, key) => (
            <Conversation
              setCurrentConversation={setCurrentConversation}
              key={key}
              conversation={c}
            />
          ))
        ) : (
          <h3 className="no-conversation">
            You doesnt start any conversation yet.
          </h3>
        )}
      </div>

      <Link to="/messenger" className="messenger__bottom">
        See all in Messenger
      </Link>
    </div>
  );
}

export default Messenger;
