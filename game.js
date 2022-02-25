"use strict";

// setting enviromental variables
let score = 0;
let lightBoxIndex = getRandomIndex(3, 0);

// Importing pages Containers
let reciptionContainer = document.querySelector(".reciptionContainer");
let gameContainer = document.querySelector(".gameContainer");

// Start Game Function
function startGame() {
  let startGameSound = new Howl({
    src: ["https://assets.codepen.io/21542/howler-push.mp3"],
  });
  let startButton = document.querySelector(".gameStartButton");
  startButton.addEventListener("click", () => {
    startGameSound.play();
    reciptionContainer.style.display = "none";
    gameContainer.style.display = "block";
  });
}

function gamePage() {
  let boxes = document.querySelectorAll(".boxes");
  appendScore();
  boxes[lightBoxIndex].style.backgroundColor = "red";

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", () => {
      if (boxes[i].style.backgroundColor == "red") {
        boxes[i].style.backgroundColor = "gray";
        lightBoxIndex = getRandomIndex(3, 0);
        boxes[lightBoxIndex].style.backgroundColor = "red";
        score++;
        appendScore();
      } else {
        boxes[lightBoxIndex].style.backgroundColor = "gray";
        lightBoxIndex = getRandomIndex(3, 0);
        boxes[lightBoxIndex].style.backgroundColor = "red";
        score--;
        appendScore();
      }
    });
  }

  //   Handling Stop Button Click
  let stopGameButton = document.querySelector(".stopGameButton");
  stopGameButton.addEventListener("click", () => {
    reciptionContainer.style.display = "block";
    gameContainer.style.display = "none";
  });
}

function getRandomIndex(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function appendScore() {
  let scoreSection = document.querySelector(".scoreSection");
  scoreSection.textContent = `Score: ${score}`;
}

startGame();
gamePage();
