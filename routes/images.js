import { randomInt } from "crypto";
import path from "path";
import fs from "fs";
import express from "express";
import multer from "multer";
import { s3 } from "../config/s3.js";
import { BUCKET_NAME } from "../config/variables.js";
const router = express.Router();

//** SAVE TO S3  */
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + randomInt(100));
  },
});
// const uploadFiles = multer({ storage }).single('file');
const uploadFiles = multer({ storage }).array("file", 10);

router.post("/upload/image", uploadFiles, (req, res) => {
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
router.delete("/images/:key/delete", function (req, res) {
  let { key } = request.params;
  let params = { Bucket: BUCKET_NAME, Key: key };

  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // error
    else console.log(data);
  });
});

export default router;
