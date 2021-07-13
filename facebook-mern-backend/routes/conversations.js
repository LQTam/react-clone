import { Router } from "express";
import { pusher } from "../config/pusher.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const router = Router();

router.post("/conversation/new", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.sender_id, req.body.receiver_id],
  });
  try {
    const savedConversation = await newConversation.save();
    console.log(savedConversation);
    pusher.trigger("conversation", "inserted", savedConversation);
    res.status(200).send(savedConversation);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/conversations/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const conversation = await Conversation.find({
      members: { $in: [uid] },
    });
    res.status(200).send(conversation);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/conversation/:conversation_id", async (req, res) => {
  try {
    const { conversation_id } = req.params;
    const { receiver_id } = req.body;
    const conversation = await Conversation.findOne({
      _id: conversation_id,
    });
    pusher.trigger("conversation", "open", {
      ...conversation._doc,
      receiver_id,
    });
    const messages = await Message.find({ conversation_id: conversation._id });
    res.status(200).send({
      ...conversation._doc,
      messages,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
