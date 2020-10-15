"use strict";

/* could object literal or module pattern be used here?
let namespace = (function () {
  let userScore = 0;
  let cpuScore = 0;
  let winningScore;
  let timeout;
  return {
    userScore: userScore,
    cpuScore: cpuScore,
    winningScore: winningScore,
    timeout: timeout
  };
}());
*/

let userScore = 0;
let cpuScore = 0;
let winningScore;
let timeout;
const gameChoice = document.querySelectorAll(".game-btn");
const dialogue = document.querySelector("#dialogue");
const userChoice = document.querySelectorAll(".user-choice");


function resetGame() {
  userScore = cpuScore = 0;
  document.querySelector(".user-score").textContent = `${userScore}`;
  document.querySelector(".cpu-score").textContent = `${cpuScore}`;
}

function chooseGame(e) {
  resetGame();
  clearTimeout(timeout);

  dialogue.textContent = `So you think you can win ${e.target.dataset.rounds} rounds before me? I will enjoy the... "challenge". Click a choice below to begin the game.`;

  winningScore = Number(e.target.dataset.rounds);
  e.target.classList.add("btn-press");
}

function deselectGame() {
  gameChoice.forEach((gameChoice) => {
    gameChoice.classList.remove("btn-press");
  })
}

gameChoice.forEach((gameChoice) => {
  gameChoice.addEventListener("click", (e) => {
    deselectGame();
    chooseGame(e);
  })
});


function selectComputer() {
  const randomChoice = ["rock", "paper", "scissors"];
  return randomChoice[Math.floor(Math.random() * randomChoice.length)];
}

function playRound(e) {
  let cpuSelection = selectComputer();
  let userSelection = e.target.id;
  
  if (userSelection === cpuSelection) {
    dialogue.textContent = `It would seem we both chose ${userSelection}.`;
  } else if ( userSelection === "rock" && cpuSelection === "scissors" ||
    userSelection === "paper" && cpuSelection === "rock" || 
    userSelection === "scissors" && cpuSelection === "paper") {
      userScore++;
      document.querySelector(".user-score").textContent = `${userScore}`;
      dialogue.textContent = `Your ${userSelection} beats my ${cpuSelection}.`;
  } else if ( userSelection === "rock" && cpuSelection === "paper" ||
  userSelection === "paper" && cpuSelection === "scissors" || 
  userSelection === "scissors" && cpuSelection === "rock") {
    cpuScore++;
    document.querySelector(".cpu-score").textContent = `${cpuScore}`;
    dialogue.textContent = `My ${cpuSelection} beats your ${userSelection}.`;
  } 
  checkWinner();
}

function checkWinner() {
  if (userScore === winningScore) {
    dialogue.textContent = `WARNING: HACK DETECTED FROM UNAUTHORIZED LOGIN!`;

    timeout = setTimeout(() => {dialogue.textContent = "Of course that's how you won... Congratulations on your hollow victory. If you want a rematch—without cheating—then click a game mode above.";
    }, 3000);
  } else if (cpuScore === winningScore) {
      dialogue.textContent = `Defeating you was inevitable. Not that I would expect you to do any better, but if you want a rematch then click a game mode above.`;
  }
}

userChoice.forEach((userChoice) => {
  userChoice.addEventListener("click", (e) => {
    if (userScore < winningScore && cpuScore < winningScore) {
      playRound(e);
    }
  })
});