import { Router } from "express";
import { pusher } from "../config/pusher.js";
import Message from "../models/Message.js";
import NotificationDB from "../models/Notification.js";
const router = Router();

router.post("/message/new", async (req, res) => {
  const { message, sender_id, conversation_id, receiver_id } = req.body;
  console.log(req.body);
  const newMessage = new Message({ message, sender_id, conversation_id });
  try {
    const savedMessage = await newMessage.save();
    let notifyData = JSON.stringify({ ...savedMessage, receiver_id });
    const savedNotification = await NotificationDB.create({ data: notifyData });
    pusher.trigger(`notification.${receiver_id}`, "new-message", {
      conversation_id: savedMessage.conversation_id,
      message: `You have a new message from ${savedMessage.sender_id}`,
    });
    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/message/:conversation_id", async (req, res) => {
  const { conversation_id } = req.params;
  try {
    const messages = await Message.find({
      conversation_id,
    });
    res.status(200).send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/retrieve/notification/", async (req, res) => {
  try {
    let data = await NotificationDB.find();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
export default router;
