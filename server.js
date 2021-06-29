import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import bodyParser from "body-parser";
import path from "path";
import Pusher from "pusher";
import mongoPosts from "./postModel.js";

Grid.mongo = mongoose.mongo;

// app config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1226653",
  key: "cef11e57182d122d1edb",
  secret: "ad7dabbda5ccf94fc4b9",
  cluster: "ap1",
  useTLS: true,
});

//middleware
app.use(bodyParser.json());
app.use(cors());

// db config
const mongoURI = process.env.MONGO_URL;
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

let gfs;
// let gridFSBucket
conn.once("open", () => {
  console.log("DB Connected");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
  // gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db,{bucketName:'images'})

  // const changeStream = mongoose.connection.collection('posts').watch();
  const changeStream = conn.db.collection("posts").watch();
  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      let { user, imgName, text, avatar, timestamp } = change.fullDocument;
      pusher.trigger("posts", "inserted", {
        user,
        imgName,
        text,
        avatar,
        timestamp,
      });
    } else if (change.operationType === "delete") {
      let { _id } = change.documentKey;
      pusher.trigger("posts", "deleted", { _id });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `image-${Date.now()}${path.extname(file.originalname)}`;
      const fileInfo = {
        filename,
        bucketName: "images",
      };

      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

//api routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/upload/image", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.status(201).send(req.file);
});

app.post("/upload/post", (req, res) => {
  const dbPost = req.body;
  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(data);
      res.status(201).send(data);
    }
  });
});

app.get("/retrieve/posts", (req, res) => {
  mongoPosts.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(200).send(data);
    }
  });
});

app.delete("/posts/:postId/delete", function (req, res) {
  let { postId } = req.params;
  mongoPosts.deleteOne({ _id: postId }, function (err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/retrieve/images/single", (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!file || file.length === 0)
        res.status(404).json({ err: "file not found." });
      else {
        const readStream = gfs.createReadStream(file.filename);
        // const readStream = gridFSBucket.openDownloadStream(file.filename);
        readStream.pipe(res);
      }
    }
  });
});

app.delete("/images/:imgName/delete", function (req, res) {
  let { imgName } = req.params;
  gfs.files.deleteOne({ filename: imgName }, function (err, data) {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`Server connected on localhost:${port}`));
