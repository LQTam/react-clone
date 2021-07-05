import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { pusher } from "./config/pusher.js";
import helmet from "helmet";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import imageRoutes from "./routes/images.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// db config
const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL;
const conn = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

conn.once("open", () => {
  console.log("DB Connected");
  const changeStream = conn.db.collection("posts").watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      let { _id } = change.documentKey;
      let { user, text, avatar, timestamp, uid, images } = change.fullDocument;
      pusher.trigger("posts", "inserted", {
        user,
        _id,
        text,
        avatar,
        timestamp,
        uid,
        images,
      });
    } else if (change.operationType === "delete") {
      let { _id } = change.documentKey;
      pusher.trigger("posts", "deleted", { _id });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//api routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.use("/", imageRoutes);
app.use("/", postRoutes);
app.use("/", userRoutes);

// listen
app.listen(port, () => console.log(`Server connected on localhost:${port}`));
