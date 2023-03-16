const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const socketio = require('socket.io');
const io = socketio(server);

let timer = 10;
const countdownTimer = () => {
  timer--;
  if (timer === -1) {
    timer = 10;
  }
};

setInterval(countdownTimer, 1000);

let questionNumber;

const allQuestionsData = require('../questions/questions.json');

const allTriviaQuestions = allQuestionsData;

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

    io.to(user.room).emit('usersInRoom', {
      room: user.room,
      roomUsers: getUsersInRoom(user.room),
    });
  });

  socket.on('readyForTrivia', ({ room, roomUsers }) => {
    questionNumber = 0;
    timer = 10;
    io.to(room).emit(
      'triviaQuestion',
      allTriviaQuestions.questions[questionNumber]
    );
  });
  socket.on('readyForNextQuestion', (room) => {
    questionNumber++;
    timer = 10;
    if (questionNumber < 6) {
      io.to(room).emit(
        'triviaQuestion',
        allTriviaQuestions.questions[questionNumber]
      );
    } else {
      io.to(room).emit('endOfGame');
    }
  });
  socket.on('getClock', (room) => {
    io.to(room).emit('time', timer);
  });

  socket.on('selectedAnswer', ({ selectedAnswer, username }) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit(
      'message',
      `${username} has selected: ${selectedAnswer}`
    );
  });
  socket.on('reportScore', ({ username: opponent, score: oppScore }) => {
    const user = getCurrentUser(socket.id);
    socket.broadcast.to(user.room).emit('endReport', { opponent, oppScore });
  });
  socket.on('disconnect', () => {
    const user = leaveUser(socket.id);
    if (user) {
      io.to(user.room).emit('usersInRoom', {
        room: user.room,
        roomUsers: getUsersInRoom(user.room),
      });

      io.to(user.room).emit('userDisconnect');
    }
  });
});

app.get('/', (req, res) => {
  res.render('index');
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
