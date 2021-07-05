import admin from "firebase-admin";
import express from express;
import serviceAccount from "../facebook-mern-3c59a-firebase-adminsdk-s49tf-19587a0de4.json";

const router = express.Router();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const records = 1000;
const listAllUsers = (nextPageToken) => {
  return admin.auth().listUsers(records, nextPageToken);
};
router.get("/users", async (req, res) => {
  try {
    const { users } = await listAllUsers();
    res.send({ users });
  } catch (err) {
    console.log("Error listUsers: ", err);
    res.status(500).send(err);
  }
});
export default router;
