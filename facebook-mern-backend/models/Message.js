import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversation_id: { type: String },
    sender_id: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("messages", MessageSchema);
