const socket = io();

let isReady = false;

let gameOver = false;

//Get username and room from DOM

let username = document.querySelector('#username').textContent;
let room = document.querySelector('#room').textContent;
let playersList = document.querySelector('#playersInRoomList');

let form = document.querySelector('#main-trivia-form-container');
let countdownClock = document.getElementById('timer');
let questionNumberArea = document.getElementById('question-number');
let scoreArea = document.getElementById('score');

const triviaForm = document.querySelector('#main-trivia-form-container');

let score = 0;
let questionNumber = 0;

scoreArea.textContent = ` ${score}`;
questionNumberArea.textContent = `${questionNumber} `;
countdownClock.textContent = ` 10s`;

nextQ = false;

let playersList2;

startCount = false;

const getClockFunc = () => {
  if (startCount) {
    socket.emit('getClock', room);

    scoreArea.textContent = ` ${score}`;
    questionNumberArea.textContent = `${questionNumber} `;
  }
};

setInterval(getClockFunc, 1000);

socket.on('endOfGame', () => {
  console.log('The game has ended!');
  countdownClock.textContent = ` Game Over!`;
  startCount = false;
  nextQ = false;
  gameOver = true;
  socket.emit('reportScore', { username, score });
});

socket.on('endReport', ({ opponent, oppScore }) => {
  form.remove();
  console.log(`${opponent} scored ${score}`);
  let reportContiner = document.createElement('div');
  let currUserReport = document.createElement('div');
  let oppUserReport = document.createElement('div');
  let comparisonMsg = document.createElement('h3');
  let reportContinerTitle = document.createElement('h2');
  let homeButton = document.createElement('button');
  homeButton.textContent = 'Play Again';
  homeButton.classList.add('homeButton');
  reportContinerTitle.textContent = 'Score Report';
  if (score > oppScore) {
    comparisonMsg.textContent = `You Won, Congrats!`;
    comparisonMsg.style.color = 'rgb(27, 156, 17)';
  } else if (oppScore > score) {
    comparisonMsg.textContent = `You Lost, Sorry!`;
    comparisonMsg.style.color = 'red';
  } else if (score === oppScore) {
    comparisonMsg.textContent = `It was a TIE!`;
    comparisonMsg.style.color = 'rgb(27, 156, 17)';
  }
  currUserReport.textContent = `${username} scored: ${score} points`;
  oppUserReport.textContent = `${opponent} scored: ${oppScore} points`;
  reportContiner.append(
    reportContinerTitle,
    comparisonMsg,
    currUserReport,
    oppUserReport,
    homeButton
  );
  reportContiner.classList.add('report-container');
  document.querySelector('.main-2').append(reportContiner);
  homeButton.addEventListener('click', () => {
    window.location.assign('http://localhost:3000/');
  });
});

socket.on('userDisconnect', () => {
  if (gameOver === false) {
    form.remove();
    let oppLeftMessage = document.createElement('div');
    oppLeftMessage.innerHTML = `<h1>Your opponent disconnected so you will be routed back to the homepage!</h1>`;
    document.querySelector('.main-2').append(oppLeftMessage);
    setTimeout(() => {
      window.location.assign('http://localhost:3000/');
    }, 7000);
  }
});

socket.on('time', (timer) => {
  countdownClock.textContent = ` ${timer}s`;
  if (timer === 0) {
    if (nextQ) {
      if (playersList2[0].username === username) {
        socket.emit('readyForNextQuestion', room);
      }
    }
  }
});

console.log(username, room);

socket.emit('joinGame', { username, room });

socket.on('usersInRoom', ({ room, roomUsers }) => {
  displayRoom(room);
  displayPlayers(roomUsers);
  if (roomUsers.length === 2) {
    nextQ = true;
    playersList = roomUsers;
    playersList2 = roomUsers;
    document.getElementById('wait-message').remove();
    if (roomUsers[0].username === username) {
      socket.emit('readyForTrivia', { room, roomUsers });
      console.log('The name: ' + roomUsers[0].username);
    }
    startCount = true;
  } else if (roomUsers.length < 2) {
    startCount = false;
  }
});

socket.on('triviaQuestion', (triviaQuestion) => {
  displayGame(triviaQuestion);
});

socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);
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
    if (user.username !== username) {
      let player = document.createElement('span');
      player.textContent = user.username;
      document.getElementById('players').append(player);
    }
  });
};

const displayGame = (triviaQuestion) => {
  questionNumber++;
  console.log('Here is the question: ');
  console.log(triviaQuestion);
  q = triviaQuestion;
  form.innerHTML = `

    <fieldset id="fieldset">
      <legend id="legend">Read Question & Submit Answer</legend>
      <div>
        <p id="question-container">
          <span id="question-label"> Question: </span>
          <span id="question"> ${q.question} </span>
        </p>
      <div id="radio-container">
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
      </div>
    </fieldset>

    <input type="submit" value="Submit Answer" id="submit"/>
  </div>`;

  document.getElementById('option1').disabled = false;
  document.getElementById('option2').disabled = false;
  document.getElementById('option3').disabled = false;
  document.getElementById('option4').disabled = false;
  document.getElementById('submit').disabled = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    selectedAnswer = form.elements.options.value;
    correctAnswer = q.answer;
    console.log(username + ' has answered: ' + selectedAnswer);
    console.log('The correct answer is: ' + correctAnswer);

    if (selectedAnswer === correctAnswer) {
      score++;
    }

    document.getElementById('option1').disabled = true;
    document.getElementById('option2').disabled = true;
    document.getElementById('option3').disabled = true;
    document.getElementById('option4').disabled = true;
    document.getElementById('submit').disabled = true;
    form.reset();
  });
};
