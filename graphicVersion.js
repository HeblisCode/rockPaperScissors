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
    computerPlayed: computerPlay,
    userPlayed: userPlay,
    message: null,
    win: null, //boolean, if it's a tie win stays null
  };

  //check if they user and computer play are the same ---> it's a tie!
  if (userPlay === computerPlay) {
    results.message = "It's a tie!";
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

  //assign the result message
  if (results.win) {
    results.message = `You win, ${userPlay} beats ${computerPlay}`;
  } else {
    results.message = `You lose, ${computerPlay} beats ${userPlay}`;
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

  //set all the attributes
  gameOverMessage.innerHTML = `Game Over<br>${winner} won`;
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
  if (results.win === null) return; //return if the game is a tie
  updateScoreView(results);
  if (getScore().computer === 5 || getScore().user === 5) {
    gameOver();
  }
}
