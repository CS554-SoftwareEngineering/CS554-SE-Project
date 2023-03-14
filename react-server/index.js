const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3005;
//const socketio = require('socket.io');
//const io = socketio(server);
//const path = require('path');
const cors = require("cors");

app.use(cors());

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
console.log('Server started!');
io.on('connection', (socket)=>{
  console.log('New client connected:', socket.id);
  /*
  socket.on('initialMessage', (data) => {
    console.log(`Received message from client ${socket.id}: ${data}`);
    socket.emit('serverInitialReply', `Echo from server: ${data}`);
    socket.emit('playerID', socket.id);
  });*/

  socket.on('joinGame', ({ player, roomName }) => {
    const user = joinUser(socket.id, player, roomName);
    socket.join(user.room);
    //socket.emit('message', 'Welcome to Trivia App!');
    console.log(`New Player - ${player} has connected to the room  ${roomName}`);
    socket.broadcast
      .to(user.room)
      .emit('secondPlayerJoinedMessage', user.player);

    io.to(user.room).emit('usersInRoom', {
      room: user.room,
      roomUsers: getUsersInRoom(user.room),
    });
  });

  socket.on('secondPlayerLoaded', (secondPlayerName)=>{
    console.log(`Name of second player: ${secondPlayerName}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server Running On Port: ${PORT}`);
});



