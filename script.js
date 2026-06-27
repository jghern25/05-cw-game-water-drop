// Variables to control game state
let gameRunning = false;
let dropMaker;
let timerInterval;
let score = 0;
let time = 30;

const winMessages = [
  "Amazing! You caught enough water to win!",
  "Fantastic work! You saved the day!",
  "Excellent! Your catching skills are outstanding!"
];

const loseMessages = [
  "Time's up! Try again and catch more drops!",
  "Nice effort! You can do better next round.",
  "Almost there! Give it another try!"
];

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const messageDisplay = document.getElementById("message");
const gameContainer = document.getElementById("game-container");

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  if (gameRunning) return;

  clearInterval(dropMaker);
  clearInterval(timerInterval);
  removeDrops();
  clearMessage();

  score = 0;
  time = 30;
  updateScore();
  updateTime();
  gameRunning = true;

  dropMaker = setInterval(createDrop, 1000);
  timerInterval = setInterval(countDown, 1000);
}

function createDrop() {
  const drop = document.createElement("div");
  drop.className = "water-drop";

  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  const gameWidth = gameContainer.offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";
  drop.style.animationDuration = "4s";

  drop.addEventListener("click", () => {
    if (!gameRunning) return;

    score += 1;
    updateScore();
    drop.remove();
  });

  gameContainer.appendChild(drop);

  drop.addEventListener("animationend", () => {
    if (drop.isConnected) {
      drop.remove();
    }
  });
}

function countDown() {
  time -= 1;
  updateTime();

  if (time <= 0) {
    endGame();
  }
}

function endGame() {
  if (!gameRunning) return;

  gameRunning = false;
  clearInterval(dropMaker);
  clearInterval(timerInterval);
  removeDrops();

  const randomMessage = score >= 20
    ? winMessages[Math.floor(Math.random() * winMessages.length)]
    : loseMessages[Math.floor(Math.random() * loseMessages.length)];

  showMessage(randomMessage);
}

function updateScore() {
  scoreDisplay.textContent = score;
}

function updateTime() {
  timeDisplay.textContent = time;
}

function removeDrops() {
  gameContainer.querySelectorAll(".water-drop").forEach((drop) => drop.remove());
}

function showMessage(message) {
  messageDisplay.textContent = message;
}

function clearMessage() {
  messageDisplay.textContent = "";
}
