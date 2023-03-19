const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3005;
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

  socket.on('disconnect', (message) => {
    const user = leaveUser(socket.id);
    console.log(`usersArray - ${JSON.stringify(user)}`);
    
    console.log(`Player - ${socket.id} has left the room`);

    console.log("-----checking users in room-----")

    let usersInRoom = getUsersInRoom(JSON.parse(JSON.stringify(user)).room).length
    console.log(' ')
    console.log(JSON.parse(JSON.stringify(user))[0].room, JSON.parse(JSON.stringify(user)))
    console.log(' ')
    if( usersInRoom < 2){
      console.log("-----stop the game-----")
      io.to(JSON.parse(JSON.stringify(user))[0].id).emit('redirectToHome');
    }
  })
});

server.listen(PORT, () => {
  console.log(`Server Running On Port: ${PORT}`);
});
