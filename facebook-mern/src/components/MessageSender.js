import { Avatar } from "@material-ui/core";
import { InsertEmoticon, PhotoLibrary, Videocam } from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../css/MessageSender.css";
import {
  selectUserEmail,
  selectUserPhoto,
  selectUserUID,
} from "../features/user/userSlice";
import axios from "../axios";
import ImagePreview from "./ImagePreview";

function MessageSender() {
  const inputFileRef = useRef(null);
  const inputMessageRef = useRef(null);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const userPhoto = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail);
  const uid = useSelector(selectUserUID);
  const removeFile = (file) => {
    console.log(file);
    let fileChange = Array.from(files).filter(
      (item) => item.name !== file.name
    );
    setFiles(fileChange);
  };
  const handleChangeFile = (e) => {
    let files = e.target.files;
    setFiles(files);
    inputMessageRef.current.focus();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input !== "" || input !== null) {
      let formData = new FormData();
      let images = [];
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("file", files[i]);
        }
        formData.append("uid", uid);
        let { data } = await axios.post("/upload/image", formData);
        console.log(data);
        images = data.data;
      }
      let postData = {
        user: userEmail,
        avatar: userPhoto,
        text: input,
        timestamp: Date.now(),
        uid,
        images,
      };
      await axios.post("/upload/post", postData);
      setInput("");
      setFiles([]);
      inputFileRef.current.value = "";
    } else console.log("empty");
  };
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={userPhoto} />
        <form>
          <input
            type="text"
            ref={inputMessageRef}
            placeholder="What's on your mind?"
            className="messageSender__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/gif,video/mp4,video/webm,video/ogg"
            ref={inputFileRef}
            multiple={true}
            onClick={(e) => (e.target.value = "")}
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
        <div
          className="messageSender__option"
          onClick={() => inputFileRef.current.click()}
        >
          <PhotoLibrary style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender__option">
          <InsertEmoticon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
      {files && <ImagePreview onDelete={removeFile} images={files} />}
    </div>
  );
}

export default MessageSender;
