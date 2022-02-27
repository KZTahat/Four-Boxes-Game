"use strict";

// setting enviromental variables
let score = 0;
let lightBoxIndex = getRandomIndex(3, 0);

// Setting Options Defaulte Variables
let sounds = true;

// Importing pages Containers
let pages = [
  document.querySelector(".reciptionContainer"),
  document.querySelector(".gameContainer"),
  document.querySelector('.optionsPage'),
  document.querySelector('.instructionsPage')
]


let sfx = {
  startGame: new Howl({
    src: ["https://iondrimbafilho.me/water-drop.mp3"],
  }),
  push: new Howl({
    src: ["https://assets.codepen.io/21542/howler-push.mp3"],
  }),
};


// Start Game Function
function startGame() {
  let startButton = document.querySelector(".gameStartButton");
  startButton.addEventListener("click", () => {
    if (sounds) sfx.startGame.play();
    displayPage(1);
  });
}

function gamePage() {
  let boxes = document.querySelectorAll(".boxes");
  appendScore();
  boxes[lightBoxIndex].style.backgroundColor = "red";

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", () => {
      if (boxes[i].style.backgroundColor == "red") {
        if (sounds) sfx.push.play();
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
    // boxes[i].addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    //   alert('ok')
    // })
  }

  //   Handling Stop Button Click
  let stopGameButton = document.querySelector(".stopGameButton");
  stopGameButton.addEventListener("click", () => {
    displayPage(0);
  });
}

// Options Page
function optionsPage() {
  let optionsPageButton = document.querySelector('.optionsPageButton');
  optionsPageButton.addEventListener('click', () => {
    displayPage(2);
  })

  let optionsForm = document.querySelector('.optionsForm');
  optionsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    displayPage(0);
    if (e.target.sounds.checked) {
      sounds = false;
    } else {
      sounds = true;
    }
  })
}

function instructionsPage() {
  let instructionsPageButton = document.querySelector('.instructionsPageButton');
  instructionsPageButton.addEventListener('click', () => {
    displayPage(3);
  })

  // handling back Button
  let backButton = document.querySelector('.backButton');
  backButton.addEventListener('click', () => {
    displayPage(0);
  })
}


// Helping Functions
// get random Index to change color of one of the boxes
function getRandomIndex(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function appendScore() {
  let scoreSection = document.querySelector(".scoreSection");
  scoreSection.textContent = `Score: ${score}`;
}

function displayPage(index) {
  for (let i = 0; i < pages.length; i++) {
    if (i == index) {
      pages[i].style.display = 'block';
    } else {
      pages[i].style.display = 'none';
    }
  }
}

// functions triggerations
startGame();
gamePage();
optionsPage();
instructionsPage();