"use strict";

// Setting Options Defaulte Variables
let sounds = true;
let music = true;
let colorOne = 'red';
let colorTwo = 'yellow';

// setting enviromental variables
let score = 0;
let { lightBoxIndex, color } = getRandomIndexColor(3, 0);


// Importing pages Containers
let pages = [
  document.querySelector(".reciptionContainer"),
  document.querySelector(".gameContainer"),
  document.querySelector('.optionsPage'),
  document.querySelector('.instructionsPage')
]

let sfx = {
  background: new Howl({
    src: ['sfxs/background.mp3'],
  }),
  startGame: new Howl({
    src: ["sfxs/start-game.wav"],
  }),
  buttonClick: new Howl({
    src: ["sfxs/Button-click.wav"],
  }),
  redClick: new Howl({
    src: ["sfxs/red-box-click.wav"],
  }),
  yellowClick: new Howl({
    src: ["sfxs/yellow-box-click.wav"],
  }),
  backButton: new Howl({
    src: ["sfxs/back-button.wav"],
  }),
  gameOver: new Howl({
    src: ["sfxs/game-over.wav"],
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
  boxes[lightBoxIndex].style.backgroundColor = `${colorOne}`;
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', () => {
      if (boxes[i].style.backgroundColor == `${colorOne}`) {
        if (sounds) sfx.redClick.play();
        boxes[i].style.backgroundColor = "gray";
        lightBoxIndex = getRandomIndexColor(3, 0).lightBoxIndex;
        boxes[lightBoxIndex].style.backgroundColor = getRandomIndexColor().color;
        score++;
        appendScore();
      } else {
        if (sounds) sfx.gameOver.play();
        alert(`Game Over Your Score is ${score}`);
        score = 0;
        displayPage(0);
      }
    });
    boxes[i].addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (boxes[i].style.backgroundColor == `${colorTwo}`) {
        if (sounds) sfx.yellowClick.play();
        boxes[i].style.backgroundColor = "gray";
        lightBoxIndex = getRandomIndexColor(3, 0).lightBoxIndex;
        boxes[lightBoxIndex].style.backgroundColor = getRandomIndexColor().color;
        score++;
        appendScore();
      } else {
        if (sounds) sfx.gameOver.play();
        alert(`Game Over Your Score is ${score}`);
        score = 0;
        displayPage(0);
        appendScore();
      }
    });
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
    if (sounds) sfx.buttonClick.play();
    displayPage(2);
  })

  let optionsForm = document.querySelector('.optionsForm');
  optionsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    displayPage(0);
    sounds = e.target.sounds.checked;
    music = e.target.music.value;
    colorOne = `${e.target.color1.value}`;
    colorTwo = `${e.target.color2.value}`;
    console.log(colorOne);
    if (sounds) sfx.backButton.play();
  })
}

function instructionsPage() {
  let instructionsPageButton = document.querySelector('.instructionsPageButton');
  instructionsPageButton.addEventListener('click', () => {
    if (sounds) sfx.buttonClick.play();
    displayPage(3);
  })

  // handling back Button
  let backButton = document.querySelector('.backButton');
  backButton.addEventListener('click', () => {
    if (sounds) sfx.backButton.play();
    displayPage(0);
  })
}


// Helping Functions
// get random Index to change color of one of the boxes
function getRandomIndexColor(max, min) {
  return {
    lightBoxIndex: Math.floor(Math.random() * (max - min + 1) + min),
    color: Math.round(Math.random()) ? `${colorOne}` : `${colorTwo}`
  };
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

// start background music
// sfx.background.once('load', function(){
//   if(music) sfx.background.play();
// });