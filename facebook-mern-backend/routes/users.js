import admin from "firebase-admin";
import { Router } from "express";
import serviceAccount from "../fb-mern-08-10-firebase-adminsdk-sy1dt-9307a43514.json";

const router = Router();
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
