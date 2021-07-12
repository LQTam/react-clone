import { Avatar } from "@material-ui/core";

function OnlineUser({ user, addToChat }) {
  return (
    <div className="user" onClick={() => addToChat(user)}>
      <div className="user__avatar">
        <Avatar src={user.photoURL} />
      </div>
      <h4 className="user__name">{user.displayName || user.email}</h4>
    </div>
  );
}

export default OnlineUser;
