import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import Messages from "./dbMessages.js";
import Rooms from "./dbRooms.js";
import "dotenv/config";
//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: process.env.PUSHER_USE_TLS,
});

//middleware
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

//db config
const connection_url = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL;

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const roomCollection = db.collection("rooms");
  const changeStream = msgCollection.watch();
  const roomChangeStream = roomCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });

  roomChangeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("rooms", "inserted", change.fullDocument);
    } else if (change.operationType === "update") {
      let { updatedFields } = change.updateDescription;
      let keys = Object.keys(updatedFields);
      let lastKey = keys[keys.length - 1];
      let newMessage = Array.isArray(updatedFields[lastKey])
        ? updatedFields[lastKey][0]
        : updatedFields[lastKey];
      pusher.trigger("rooms", "roomMessageUpdate", newMessage);
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// ??

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

//MESSAGE ENDPOINT
app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

//ROOM ENDPOINT
app.get("/rooms/sync", (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/rooms/new", (req, res) => {
  const dbRoom = req.body;
  Rooms.create(dbRoom, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.get("/rooms/:roomId", (req, res) => {
  let { roomId } = req.params;
  Rooms.findOne({ _id: roomId }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/rooms/:roomId/messages/new", (req, res) => {
  let { roomId } = req.params;
  let dbMessage = req.body;
  Rooms.findOne({ _id: roomId }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.messages.push(dbMessage);
      data.save();
      res.status(200).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
