const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const socketio = require('socket.io');
const io = socketio(server);

const {
  joinUser,
  getCurrentUser,
  leaveUser,
  getUsersInRoom,
} = require('./users');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static('client'));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

let currentUser = {
  name: 'Default Name',
  room: 'Default Room',
};

io.on('connection', (socket) => {
  socket.on('joinGame', ({ username, room }) => {
    const user = joinUser(socket.id, username, room);
    socket.join(user.room);
    socket.emit('message', 'Welcome to Trivia App!');
    socket.broadcast
      .to(user.room)
      .emit('message', `${user.username} has joined the game!`);

    io.to(user.room).emit('usersInRoom', {
      room: user.room,
      roomUsers: getUsersInRoom(user.room),
    });
  });
  socket.on('selectedAnswer', ({ selectedAnswer, username }) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit(
      'message',
      `${username} has selected: ${selectedAnswer}`
    );
  });
  socket.on('disconnect', () => {
    const user = leaveUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', `${user.username} has left the game!`);

      io.to(user.room).emit('usersInRoom', {
        room: user.room,
        roomUsers: getUsersInRoom(user.room),
      });
    }
  });
});

app.get('/', (req, res) => {
  res.render('index', { exampleText: 'Joshua Wachana was here.' });
});

app.post('/initialInfo', (req, res) => {
  currentUser.name = req.body.name;
  currentUser.room = req.body.room;
  res.redirect('trivia');
});

app.get('/trivia', (req, res) => {
  res.render('trivia', currentUser);
});

server.listen(PORT, () => {
  console.log(`Server Running On Port: ${PORT}`);
});
