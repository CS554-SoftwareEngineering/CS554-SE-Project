const express = require('express');
const http = require('http');
const app = express();
const PORT = 4000;

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
});

const {
  joinUser,
  getCurrentUser,
  leaveUser,
  getUsersInRoom,
} = require('./users');

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

app.use(cors());



socketIO.on('connect', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);


  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});


http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});