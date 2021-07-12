import { Avatar } from "@material-ui/core";
import React from "react";

function MinimizeChat({ user, handleCloseChat, addToChat }) {
  return (
    <div className="minimize__chat">
      <Avatar
        src={user.photoURL}
        fontSize="large"
        onClick={() => addToChat(user)}
      />
      <div className="close" onClick={() => handleCloseChat(user)}>
        X
      </div>
      <div className="user__info">
        <h4>{user.displayName || user.email}</h4>
        <p>Last message</p>
      </div>
    </div>
  );
}

export default MinimizeChat;
