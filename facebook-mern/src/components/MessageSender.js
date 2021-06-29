import { Avatar, Input } from "@material-ui/core";
import { InsertEmoticon, PhotoLibrary, Videocam } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../css/MessageSender.css";
import { selectUserName, selectUserPhoto } from "../features/user/userSlice";
import axios from "../axios";

function MessageSender() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const userPhoto = useSelector(selectUserPhoto);
  const userName = useSelector(selectUserName);
  const handleChangeFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let imgName = "";
    if (file) {
      formData.append("file", file);
      let { data } = await axios.post("/upload/image", formData);
      imgName = data.filename;
    }
    let postData = {
      user: userName,
      avatar: userPhoto,
      imgName,
      text: input,
      timestamp: Date.now(),
    };
    let headers = {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
    };
    // "Content-Type": `multipart/form-data;boundary${formData._boundary}`,
    let { data } = await axios.post("/upload/post", postData);
    console.log(data);
    setInput("");
    setFile(null);
  };
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={userPhoto} />
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
            onChange={handleChangeFile}
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
