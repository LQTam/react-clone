import { Avatar, Input } from "@material-ui/core";
import { InsertEmoticon, PhotoLibrary, Videocam } from "@material-ui/icons";
import React, { useState } from "react";
import "../css/MessageSender.css";

function MessageSender() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const handleChangeFile = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src="https://scontent.fhan5-5.fna.fbcdn.net/v/t1.18169-9/21768228_757317117787304_1170335793410169460_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=0debeb&_nc_ohc=iCt7FHNzBNMAX-BvQbl&_nc_ht=scontent.fhan5-5.fna&oh=c1acb472953a628a2ae9418150cf29e8&oe=60DCD69B" />
        <form>
          <input
            type="text"
            placeholder="What's on your mind?"
            className="messageSender__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Input
            type="file"
            onClick={handleChangeFile}
            className="messageSender__fileSelector"
          />
          <button type="submit" onClick={handleSubmit}>
            Hidden Submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <Videocam style={{ color: "tomato" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender__option">
          <PhotoLibrary style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender__option">
          <InsertEmoticon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
