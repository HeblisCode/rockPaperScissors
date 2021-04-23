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

//event listener for the buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) =>
  button.addEventListener("click", handleButtonClick)
);
function handleButtonClick(e) {
  const results = playRound(e.target.id, getComputerPlay());
  console.log(results);
  getScore = updateScore(results);
  console.log(getScore());
}

//play a best of 5 game
function game() {
  let userScore = 0;
  let computerScore = 0;
  let userPlay;
  let computerPlay;
  let results;

  //loop until one of the scores hit 5
  while (userScore < 5 && computerScore < 5) {
    userPlay = getUserPlay(); //get the user play
    computerPlay = getComputerPlay(); //get the computer play
    results = playRound(userPlay, computerPlay); //play one round
    printPlays(userPlay, computerPlay); //print plays
    console.log(results.message); //print the round results
    console.log(""); //new line for better readability

    //increase the winner counter
    switch (results.win) {
      case null: //tie, no need to increase
        break;
      case true:
        userScore++;
      case false:
        computerScore++;
    }
  }

  //print the game results
  if (userScore > computerScore) {
    console.log("You won the game!");
  } else {
    console.log("You lost the game!");
  }
}
