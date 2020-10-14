let userScore = 0;
let cpuScore = 0;
let winningScore;
const gameChoice = document.querySelectorAll(".game-btn");
let timeout;
let dialogue = document.querySelector("#dialogue");
const userChoice = document.querySelectorAll(".user-choice");


function resetGame() {
  userScore = cpuScore = 0;
  document.querySelector(".user-score").textContent = `${userScore}`;
  document.querySelector(".cpu-score").textContent = `${cpuScore}`;
}

function chooseGame(e) {
  resetGame();
  clearTimeout(timeout);

  dialogue.textContent = `So you think you can defeat me ${e.target.dataset.rounds} times? I will enjoy the... "challenge". Click a choice below to begin the game.`;

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

/* Below redundant while using :active in CSS?

function pressButton(event) {
  event.target.classList.add("btn-press");
}

function unpressButton(event) {
  if (event.propertyName !== 'transform') return;
  event.target.classList.remove('btn-press');
} */

function playRound(event) {
  let cpuSelection = selectComputer();
  let userSelection = event.target.id;
  
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
    dialogue.textContent = `WARNING: UNAUTHORIZED ACCESS TO MAINFRAME!`;

    timeout = setTimeout(() => {dialogue.textContent = "Of course humans have to resort to cheating. Congratulations on your hollow victory. Click a game setting above for a rematch, maybe without cheating this time...";
    }, 3000);
  } else if (cpuScore === winningScore) {
      dialogue.textContent = `Naturally it was easy to defeat you. Maybe you'll do better next time, not that I would count on it. Though if you really want to find out, then click a game setting above for a rematch.`;
  }
}

/* Below redundant while using :active in CSS?

userChoice.forEach((userChoice) => {
  userChoice.addEventListener("mousedown", (event) => {
    if (userScore < winningScore && cpuScore < winningScore) {
      pressButton(event);
    }
  })
});

userChoice.forEach((userChoice) => {
  userChoice.addEventListener("transitionend", (event) => {
    unpressButton(event);
  })
}); */

userChoice.forEach((userChoice) => {
  userChoice.addEventListener("click", (event) => {
    if (userScore < winningScore && cpuScore < winningScore) {
      playRound(event);
    }
  })
});