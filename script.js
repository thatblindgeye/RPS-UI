// Global variable declarations
let playerScore = 0;
let computerScore = 0;
let scoreCompare = 0;
let gameCancel = false;

// Random generator for Computer's selection
function computerPlay() {
  const computerRandom = ["rock", "paper", "scissors"];
  return computerRandom[Math.floor(Math.random() * computerRandom.length)];
}

/* Compare Player's selection to Computer's selection; a scoreCompare
of null prevents round# from increasing on invalid inputs */
function playRound(playerSelection, computerSelection) {
  // Outcome for canceling game prompt
  if (playerSelection == null) {
    gameCancel = true;
    return "Too scared to finish the game, huh?";
  }

  // Outcomes for Player making valid selection
  else if (playerSelection != null) {
    if (playerSelection.toLowerCase() == computerSelection) {
      scoreCompare = playerScore + computerScore;
      return "A draw?! That seems pretty sus...";
    }

    // Outcomes for Player selecting Rock
    else if (playerSelection.toLowerCase() == "rock") {
      if (computerSelection == "paper") {
        ++computerScore;
        scoreCompare = playerScore + computerScore;
        return "My Paper covers your Rock! You lose this round, rocks-for-brains!";
      } else if (computerSelection == "scissors") {
        ++playerScore;
        scoreCompare = playerScore + computerScore;
        return (
          "Your Rock broke my Scissors! You win this round," +
          " but you owe me for damages..."
        );
      }
    }
    // Outcomes for Player selecting Paper
    else if (playerSelection.toLowerCase() == "paper") {
      if (computerSelection == "scissors") {
        ++computerScore;
        scoreCompare = playerScore + computerScore;
        return (
          "My Scissors cuts your Paper! You lose this round," +
          " and I hope those papers were important!"
        );
      } else if (computerSelection == "rock") {
        ++playerScore;
        scoreCompare = playerScore + computerScore;
        return (
          "Your Paper covers my pet Rock! You win this round," +
          " now let Rocky go!"
        );
      }
    }
    // Outcomes for Player selecting Scissors
    else if (playerSelection.toLowerCase() == "scissors") {
      if (computerSelection == "rock") {
        ++computerScore;
        scoreCompare = playerScore + computerScore;
        return (
          "My Rock breaks your puny Scissors! You lose this round," +
          " good luck clipping coupons now!"
        );
      } else if (computerSelection == "paper") {
        ++playerScore;
        scoreCompare = playerScore + computerScore;
        return (
          "Your Scissors can cut my Paper?! You win this round," +
          " but at least I have confetti now..."
        );
      }
    }
    // Outcome for Player making invalid selection
    else {
      scoreCompare = null;
      return "Only valid options are allowed! Since I'm generous, you can try again.";
    }
  }
}

/* Reset variables to default values after 
a game is completed or cancelled */
function resetGame() {
  playerScore = computerScore = scoreCompare = 0;
  gameCancel = false;
}

// Show the results of a game after a player reaches 5 points
function showResults() {
  if (playerScore > computerScore) {
    console.log(
      `______ GAME OVER ______\n` +
        `Congratulations! You cheated to win the game!\n\n`
    );
  } else if (computerScore > playerScore) {
    console.log(
      `______ GAME OVER ______\n` +
        `Ha! You lost the game! Better luck next time!\n\n`
    );
  } else if (playerScore == computerScore) {
    console.log(
      `______ GAME OVER ______\n` + `We TIED?! That shouldn't be possible!\n\n`
    );
  }
}

// Prompt to replay the game after finishing a game
function replayGame() {
  console.log("Want to play again?");
  if (confirm("Play again?") == true) {
    console.log(`Okay, let me just reset everything *BEEPBOOPBEEP*\n\n`);
    resetGame();
    return game();
  } else {
    console.log(
      "Then I'll be waiting for you to find some courage for a rematch!"
    );
    resetGame();
  }
}

// Play a 5 round game of Rock, Paper, Scissors
function game() {
  console.log(
    `=====================\n` +
      `ROCK, PAPER, SCISSORS\n\n` +
      ` Get the most points\n` +
      `     in 5 rounds\n` +
      `=====================\n\n`
  );
  let round = 1;
  while (round <= 5) {
    if (scoreCompare !== null) {
      console.log(`______ ROUND ${round} ______`);
      round++;
    }
    console.log(
      playRound(prompt("Choose Rock, Paper, or Scissors:"), computerPlay())
    );

    /* Return the scores after each round where Player
    enters a valid input */
    if (scoreCompare !== null && gameCancel == false) {
      console.log(
        `Human's Score:    ${playerScore}\n` +
          `Computer's Score: ${computerScore}\n\n`
      );
    }

    /* End the game early if Cancel is pressed on playerSelection,
    resetting global variables to their defaults. */
    if (gameCancel == true) {
      resetGame();
      break;
    }

    // Show final results and prompt to replay the game
    if (round > 5) {
      showResults();
      replayGame();
    }
  }
}
