function getScore() {
  let score = {
    user: 0,
    computer: 0,
  };
  return score;
}

function updateScore(results) {
  let score = getScore();
  if (results.win === null) return getScore;
  results.win && results.win !== null ? score.user++ : score.computer++;
  getScore = function () {
    return score;
  };
  return getScore;
}

//get a randomly generated play
function getComputerPlay() {
  let gameArray = ["rock", "paper", "scissors"]; //array with rock paper scissor
  let randomNumber = Math.floor(Math.random() * gameArray.length); //extract a random number between 0 and 2
  return gameArray[randomNumber]; //return the array.indexOf(random)
}

//play one round, check the results and returns an object
function playRound(userPlay, computerPlay) {
  let results = {
    userPlayed: userPlay,
    computerPlayed: computerPlay,
    win: null, //boolean, if it's a tie win stays null
  };

  //check if they user and computer play are the same ---> it's a tie!
  if (userPlay === computerPlay) {
    return results;
  }
  //check if the user wins
  switch (userPlay) {
    case "paper":
      if (computerPlay === "rock") {
        results.win = true;
      }
      break;
    case "rock":
      if (computerPlay === "scissors") {
        results.win = true;
      }
      break;
    case "scissors":
      if (computerPlay === "paper") {
        results.win = true;
      }
      break;
  }

  if (!results.win) {
    results.win = false;
  }
  return results;
}

function updateScoreView(results) {
  let winner;
  let winnerScore;
  if (results.win) {
    winner = "user";
    winnerScore = getScore().user;
  } else {
    winner = "computer";
    winnerScore = getScore().computer;
  }
  const winDot = document.querySelector(
    `#${winner} > .winCounter > .win${winnerScore}`
  );
  winDot.classList.add("winTrue");
}

function updateScreenView(results) {
  let playsArray = [results.userPlayed, results.computerPlayed];
  let userScreen = document.querySelector("#user > .screen > .material-icons");
  let computerScreen = document.querySelector(
    "#computer > .screen > .material-icons"
  );
  let screensArray = [userScreen, computerScreen];

  for (let i = 0; i < playsArray.length; i++) {
    switch (playsArray[i]) {
      case "rock":
        screensArray[i].innerText = "sports_soccer";
        break;
      case "paper":
        screensArray[i].innerText = "description";
        break;
      case "scissors":
        screensArray[i].innerText = "content_cut";
        break;
    }
  }
}

function updateScreenColor(results) {
  let winner;
  let loser;
  if (results.win) {
    winner = "user";
    loser = "computer";
  } else {
    winner = "computer";
    loser = "user";
  }

  let winnerScreen = document.querySelector(
    `#${winner} > .screen > .material-icons`
  );
  let loserScreen = document.querySelector(
    `#${loser} > .screen > .material-icons`
  );

  winnerScreen.classList.add("win");
  loserScreen.classList.add("lose");
}

function resetScreenColor() {
  let userScreen = document.querySelector("#user > .screen > .material-icons");
  let computerScreen = document.querySelector(
    "#computer > .screen > .material-icons"
  );

  userScreen.classList.remove("win", "lose");
  computerScreen.classList.remove("win", "lose");
}

function updateView(results) {
  updateScreenView(results);
  resetScreenColor();
  if (results.win === null) return; //return if the game is a tie
  updateScreenColor(results);
  updateScoreView(results);
}

function gameOver() {
  let winner;
  if (getScore().user > getScore().computer) {
    winner = "User";
  } else {
    winner = "Computer";
  }

  //removes everything from the game container
  const gameContainer = document.querySelector("#gameContainer");
  gameContainer.innerHTML = "";

  //creates a game over message and a button to reset the game
  const gameOverMessage = document.createElement("p");
  const playAgainButton = document.createElement("button");
  gameOverMessage.classList.add("gameOver");
  playAgainButton.classList.add("gameOver");

  //set all the attributes
  gameOverMessage.innerHTML = `Game Over<br>${winner} wins!`;
  playAgainButton.id = "playAgainButton";
  playAgainButton.innerText = "Play Again";
  playAgainButton.addEventListener(
    "click",
    window.location.reload.bind(window.location)
  );

  //append them to the container
  gameContainer.appendChild(gameOverMessage);
  gameContainer.appendChild(playAgainButton);
}

//event listener for the buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) =>
  button.addEventListener("click", handleButtonClick)
);
function handleButtonClick(e) {
  const results = playRound(e.target.id, getComputerPlay());
  getScore = updateScore(results);
  updateView(results);
  if (getScore().computer === 5 || getScore().user === 5) {
    gameOver();
  }
}
