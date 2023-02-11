const socket = io();

let isReady = false;

//Get username and room from DOM

let username = document.querySelector('#username').textContent;
let room = document.querySelector('#room').textContent;
let playersList = document.querySelector('#playersInRoomList');

console.log(username, room);

socket.emit('joinGame', { username, room });

socket.on('usersInRoom', ({ room, roomUsers }) => {
  displayRoom(room);
  displayPlayers(roomUsers);
  if (roomUsers.length === 2) {
    isReady = true;
    console.log('both sides are ready to play');
  }
});

const triviaForm = document.querySelector('#main-trivia-form-container');

socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);
});

triviaForm.addEventListener('submit', (e) => {
  const selectedAnswer = triviaForm.elements.options.value;
  console.log(selectedAnswer, username);
  socket.emit('selectedAnswer', { selectedAnswer, username });
  e.preventDefault();
  return false;
});

const outputMessage = (message) => {
  const messageListItem = document.createElement('li');
  messageListItem.innerHTML = `${message}`;
  document.querySelector('#message-list').append(messageListItem);
};

const displayRoom = (roomName) => {
  room = roomName;
};

const displayPlayers = (roomUsers) => {
  document.getElementById('players').innerHTML = '';
  roomUsers.forEach((user) => {
    let player = document.createElement('li');
    player.textContent = user.username;
    document.getElementById('players').append(player);
  });
};
