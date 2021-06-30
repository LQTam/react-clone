import React from "react";
import { useSelector } from "react-redux";
import "../css/StoryReel.css";
import { selectUserPhoto } from "../features/user/userSlice";
import Story from "./Story";

function StoryReel() {
  let userPhoto = useSelector(selectUserPhoto);
  return (
    <div className="storyReel">
      <Story image={userPhoto} title="Create story" />
      <Story
        image="https://revelogue.com/wp-content/uploads/2020/08/Dien-vien-vin-diesel-e1598211223921.jpg"
        profileSrc="https://revelogue.com/wp-content/uploads/2020/08/Dien-vien-vin-diesel-e1598211223921.jpg"
        title="UserName"
      />
      <Story
        image="https://revelogue.com/wp-content/uploads/2020/08/Dien-vien-vin-diesel-e1598211223921.jpg"
        profileSrc="https://revelogue.com/wp-content/uploads/2020/08/Dien-vien-vin-diesel-e1598211223921.jpg"
        title="UserName"
      />
      <Story
        image="https://revelogue.com/wp-content/uploads/2020/08/Dien-vien-vin-diesel-e1598211223921.jpg"
        profileSrc="https://revelogue.com/wp-content/uploads/2020/08/Dien-vien-vin-diesel-e1598211223921.jpg"
        title="UserName"
      />
      <Story
        image="https://revelogue.com/wp-content/uploads/2020/08/Dien-vien-vin-diesel-e1598211223921.jpg"
        profileSrc="https://revelogue.com/wp-content/uploads/2020/08/Dien-vien-vin-diesel-e1598211223921.jpg"
        title="UserName"
      />
    </div>
  );
}

export default StoryReel;
