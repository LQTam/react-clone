import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
  uid: String,
});
const whatsappSchema = mongoose.Schema({
  name: String,
  messages: [messageSchema],
});

export default mongoose.model("rooms", whatsappSchema);
