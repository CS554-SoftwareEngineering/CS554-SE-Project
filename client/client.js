const socket = io();

let isReady = false;

//Get username and room from DOM

let username = document.querySelector('#username').textContent;
let room = document.querySelector('#room').textContent;
let playersList = document.querySelector('#playersInRoomList');

let form = document.querySelector('#main-trivia-form-container');


console.log(username, room);

socket.emit('joinGame', { username, room });

socket.on('usersInRoom', ({ room, roomUsers }) => {
  displayRoom(room);
  displayPlayers(roomUsers);
  if (roomUsers.length === 2) {
    isReady = true;
    document.getElementById('wait-message').textContent =
      'Both sides are ready for battle!';
    socket.emit('readyForTrivia', { room, roomUsers });
  }
});

socket.on('triviaQuestions', (allTriviaQuestions) => {
  displayGame(allTriviaQuestions);
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

const displayGame = (allTriviaQuestions) => {
  console.log('Here are the questions: ');
  console.log(allTriviaQuestions);
  q = allTriviaQuestions.questions[0];
  console.log(q);
  form.innerHTML = `<div>
    <p>
      Question:
      <span id="question">
        ${q.question}
      </span>
    </p>

    <fieldset>
      <legend>Enter Your Answer</legend>
      <div>
        <input type="radio" id="option1" value="${q.options[0]}" name="options" />
        <label for="option1">${q.options[0]}</label>
      </div>
      <div>
        <input type="radio" id="option2" value="${q.options[1]}" name="options" />
        <label for="option2">${q.options[1]}</label>
      </div>
      <div>
        <input type="radio" id="option3" value="${q.options[2]}" name="options" />
        <label for="option3">${q.options[2]}</label>
      </div>
      <div>
        <input type="radio" id="option4" value="${q.options[3]}" name="options" />
        <label for="option4">${q.options[3]}</label>
      </div>
    </fieldset>

    <input type="submit" value="Submit Answer" />
  </div>`;
};
