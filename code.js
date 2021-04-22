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

//compare plays
function playRound(userPlay, computerPlay) {
  let win = false;
  printPlays(userPlay, computerPlay);

  //check if they user and computer play are the same ---> it's a tie!
  if (userPlay === computerPlay) {
    return "It's a tie!";
  }
  //check if the user wins
  switch (userPlay) {
    case "paper":
      if (computerPlay === "rock") {
        win = true;
      }
      break;
    case "rock":
      if (computerPlay === "scissors") {
        win = true;
      }
      break;
    case "scissors":
      if (computerPlay === "paper") {
        win = true;
      }
      break;
  }

  //return the results
  if (win) {
    return "You win!";
  } else {
    return "You lose!";
  }
}

console.log(playRound(getUserPlay(), getComputerPlay()));
