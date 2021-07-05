// import express from "express";
// import mongoose from "mongoose";
// // import cors from "cors";
// import bodyParser from "body-parser";
// import "dotenv/config";
// import postRoute from "./routes/posts.js";
// import imageRoute from "./routes/images.js";
// import userRoute from "./routes/users.js";
// import { pusher } from "./config/pusher.js";
// import helmet from "helmet";

// import morgan from "morgan";

// // app config
// const app = express();
// const port = process.env.PORT || 9000;

// //middleware
// app.use(bodyParser.json());
// // app.use(cors());
// app.use(helmet());
// app.use(morgan("common"));

// // db config
// const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URI_LOCAL;
// const conn = mongoose.createConnection(mongoURI, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoose.connect(mongoURI, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// conn.once("open", () => {
//   console.log("DB Connected");
//   const changeStream = conn.db.collection("posts").watch();
//   changeStream.on("change", (change) => {
//     if (change.operationType === "insert") {
//       let { _id } = change.documentKey;
//       let { user, text, avatar, timestamp, uid, images } = change.fullDocument;
//       pusher.trigger("posts", "inserted", {
//         user,
//         _id,
//         text,
//         avatar,
//         timestamp,
//         uid,
//         images,
//       });
//     } else if (change.operationType === "delete") {
//       let { _id } = change.documentKey;
//       pusher.trigger("posts", "deleted", { _id });
//     } else {
//       console.log("Error triggering Pusher");
//     }
//   });
// });

// //api routes
// app.get("/", (req, res) => res.status(200).send("Hello World!"));
// app.use("/", postRoute);
// app.use("/", imageRoute);
// app.use("/", userRoute);
// // listen
// app.listen(port, () => console.log(`Server connected on localhost:${port} `));

import express from "express";
import fs from "fs";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import path from "path";
import { pusher } from "./config/pusher.js";
import helmet from "helmet";
import { BUCKET_NAME } from "./config/variables.js";
import { s3 } from "./config/s3.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import { randomInt } from "crypto";
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

//** SAVE TO S3  */
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + randomInt(100));
  },
});
// const uploadFiles = multer({ storage }).single('file');
const uploadFiles = multer({ storage }).array("file", 10);

//api routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/upload/image", uploadFiles, (req, res) => {
  try {
    const { files } = req;
    const { uid } = req.body;
    let dataResponse = [];
    files.map(async (file) => {
      const fileContent = fs.readFileSync(file.path);
      let mimeType = file.mimetype;
      let filename = `${file.filename}${path.extname(file.originalname)}`;
      const params = {
        Bucket: `${BUCKET_NAME}/posts/${mimeType}/${uid}`,
        Key: filename, // File name you want to save as in S3
        Body: fileContent,
        ACL: "public-read",
      };
      let { key } = await s3.upload(params).promise();
      file.showLink = key;
      dataResponse.push(file);
      await fs.unlinkSync(file.path);
      if (dataResponse.length === files.length) {
        res.json({
          message: "File Uploaded SuceesFully",
          data: dataResponse,
        });
      }
    });
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
});

app.use("/", postRoutes);
app.use("/", userRoutes);

// listen
app.listen(port, () => console.log(`Server connected on localhost:${port}`));
