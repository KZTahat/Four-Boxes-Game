'use strict';
// setting enviromental variables

function startGame() {
    let startButton = document.getElementById('gameStartButton');
    startButton.addEventListener('click', () => {
        let reciptionContainer = document.getElementById('reciptionContainer');
        reciptionContainer.style.display = 'none';
    })
}

startGame();

let score = 0;
let lightBoxIndex = getRandomIndex(3, 0);

let boxes = document.getElementsByClassName('boxes');
let scoreSection = document.getElementById('scoreSection');
appendScore();



boxes[lightBoxIndex].style.backgroundColor = 'red';

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', () => {
        if (boxes[i].style.backgroundColor == 'red') {
            boxes[i].style.backgroundColor = "gray";
            lightBoxIndex = getRandomIndex(3, 0);
            boxes[lightBoxIndex].style.backgroundColor = 'red';
            score++;
            appendScore();
        } else {
            boxes[lightBoxIndex].style.backgroundColor = "gray";
            lightBoxIndex = getRandomIndex(3, 0);
            boxes[lightBoxIndex].style.backgroundColor = 'red';
            score--;
            appendScore();
        }
    })
}

function getRandomIndex(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function appendScore() {
    scoreSection.textContent = `Score: ${score}`;
}