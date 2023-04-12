//selecting the elements
const score0 = document.querySelector("#score-0");
const score1 = document.getElementById("score-1");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");
const diceEl = document.querySelector(".dice");
const buttonRoll = document.querySelector(".button-1");
const buttonHold = document.querySelector(".button-2");
const buttonNew = document.querySelector(".button-3");

score0.textContent = 0;
score1.textContent = 0;
let scores, playing, currentScore, activePlayer;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playerScore = 0;
  playing = true;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  diceEl.classList.add("hidden");
  player0.classList.add("player-active");
  player1.classList.remove("player-active");
  player0.classList.remove("winner");
  player1.classList.remove("winner");
};
init();

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};

buttonRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current-${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle("player-active");
      player1.classList.toggle("player-active");
    }
  }
});

buttonHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
      document.getElementById(`score-${activePlayer}`).textContent = "You Won ";
      currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener("click", init);
