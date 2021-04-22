//save plays
let computerPlay;
let playerPlay;

//randomly generated play
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

console.log(getUserPlay());
//compare plays
