import mongoose from "mongoose";

const postModel = mongoose.Schema({
  user: String,
  imgName: String,
  text: String,
  avatar: String,
  timestamp: String,
  uid: String,
});

export default mongoose.model("posts", postModel);
