'use strict';

let boxes = document.getElementsByClassName('boxes');
console.log(boxes);

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', () => {
        console.log('inside');
        boxes[i].style.backgroundColor = "gray";
    })
    
}
