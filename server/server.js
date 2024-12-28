const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8787;

io.on("connect", (socket) => {
  console.log("A user connected");

  socket.on("join_room", ({ roomName, username }) => {
    socket.join(roomName);
    socket.username = username;
    console.log(`User ${socket.id} (${username}) joined  ${roomName}`);
  });

  socket.on("send_message", ({ roomName, username, message }) => {
    io.to(roomName).emit("receive_message", { username, message });
  });

  socket.on("disconnect", ({ username }) => {
    console.log(`User disconnected: ${socket.id}, Username: ${socket.username}`);
  });

  socket.on("typing", (data) => {
    socket.to(data.roomName).emit("user_typing", { username: data.username });
  });

  socket.on("stop_typing", (data) => {
    socket.to(data.roomName).emit("user_stop_typing", { username: data.username });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
