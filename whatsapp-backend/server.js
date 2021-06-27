import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import Messages from "./dbMessages.js";
import Rooms from "./dbRooms.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1225845",
  key: "56d23b108dfd4f5ecf4c",
  secret: "00bb236c553dc818d8f6",
  cluster: "ap1",
  useTLS: true,
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
const connection_url =
  "mongodb+srv://tamlq:RsmmQIj5boJQfvsh@cluster0.ff9vg.mongodb.net/whatsappdb?retryWrites=true&w=majority";

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
    if (change.operationType === "inserted") {
      const { name } = change.fullDocument;
      pusher.trigger("rooms", "inserted", { name: name });
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
// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
