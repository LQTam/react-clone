import mongoose from "mongoose";

const Image = mongoose.Schema(
  {
    destination: { type: String, required: false },
    encoding: { type: String, required: false },
    fieldname: { type: String, required: false },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    originalname: { type: String, required: false },
    path: { type: String, required: false },
    showLink: { type: String, required: true },
    size: { type: Number, required: false },
  },
  { timestamps: true }
);
const postModel = mongoose.Schema(
  {
    user: { type: String, required: true },
    imgName: { type: String },
    text: { type: String, required: false },
    avatar: { type: String },
    timestamp: { type: String, required: true },
    uid: { type: String, required: true },
    images: [Image],
  },
  { timestamps: true }
);
export default mongoose.model("posts", postModel);
