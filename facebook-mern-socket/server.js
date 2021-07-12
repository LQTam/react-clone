import { Server } from "socket.io";

const io = new Server(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

const addUser = (uid, socketId) => {
  !users.some((user) => user.uid === uid) && users.push({ uid, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((item) => item.socketId !== socketId);
};
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUser", (uid) => {
    addUser(uid, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("someone out.");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
