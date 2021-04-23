//get a randomly generated play
function getComputerPlay() {
  let gameArray = ["rock", "paper", "scissors"]; //array with rock paper scissor
  let randomNumber = Math.floor(Math.random() * gameArray.length); //extract a random number between 0 and 2
  return gameArray[randomNumber]; //return the array.indexOf(random)
}

//get user play
function getUserPlay() {
  gameArray = ["rock", "paper", "scissors"];
  let userPlay = prompt("What's your play? Rock paper or scissors?"); //prompt the user for the play
  userPlay = userPlay.toLowerCase(); //lowercase the string
  //check for null or wrong inputs
  if (userPlay === null || gameArray.indexOf(userPlay) < 0) {
    alert("Wrong or empty input");
    return;
  }
  return userPlay; //return the play
}

//print plays
function printPlays(userPlay, computerPlay) {
  console.log(`Your play is ${userPlay}`);
  console.log(`The computer play is ${computerPlay}`);
}

//play one round, check the results and returns an object
function playRound(userPlay, computerPlay) {
  let results = {
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
  }

  return results;
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

game();
