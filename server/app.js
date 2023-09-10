const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 2018;

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

server.listen(PORT, () => {
  io.on("connection", (socket) => {
    console.log("READYYYY");
    console.log(socket.id);
    // Karşılama mesajı gönderelim
    socket.emit("WELCOME_MESSAGE", `Merhaba ${socket.id} numarali user...`);

    socket.on("NEW_BOOKMARK_EVENT", (bookmark) => {
      console.log("new bookmark", bookmark);
      // io.emit("NEW_BOOKMARK_ADDED", bookmark);
      // Gönderen haric herkese bookmark bilgisini gönder.
      socket.broadcast.emit("NEW_BOOKMARK_ADDED", bookmark);
    });
  });
});
