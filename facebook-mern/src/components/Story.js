import React from "react";
import "../css/Story.css";
import { Avatar } from "@material-ui/core";
import { Add } from "@material-ui/icons";

function Story({ image, profileSrc, title }) {
  return (
    <div className="story">
      <div
        className="storyBGImage"
        style={{
          backgroundImage: `url(${image})`,
          bottom: `${!profileSrc && "53px"}`,
          borderRadius: `${!profileSrc && "10px 10px 0 0"}`,
        }}
      ></div>
      {profileSrc && <Avatar src={profileSrc} className="story__avatar" />}
      {!profileSrc && <Add className="createStoryPlus" />}
      <h4 className={!profileSrc && "createStoryText"}>{title}</h4>
    </div>
  );
}

export default Story;
