import Post from "../models/Post.js";
import { s3 } from "../config/s3.js";
import express from express;
const router = express.Router();
router.post("/upload/post", (req, res) => {
  const dbPost = req.body;
  Post.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.get("/retrieve/posts", (req, res) => {
  Post.find((err, data) => {
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
router.delete("/posts/:postId/delete", function (req, res) {
  let { postId } = req.params;
  let { images } = req.body;
  Post.deleteOne({ _id: postId }, function (err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      for (let i = 0; i < images.length; i++) {
        let params = { Bucket: BUCKET_NAME, Key: images[i].showLink };

        s3.deleteObject(params, function (err, data) {
          if (err) console.log(err, err.stack);
          // error
          else console.log(data);
        });
      }
      res.status(200).send(data);
    }
  });
});
export default router;
