"use strict";

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;

paintBoard();

function paintBoard(squaresPerSide = 16) {
    let container = document.createElement('div');
    container.classList.add('container');

    for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        container.append(square);
    }

    document.querySelector('body').appendChild(container);
    setSquareSizing(squaresPerSide);
}

function setSquareSizing(squaresPerSide) {
    const width = MAX_WIDTH / squaresPerSide;
    const height = MAX_HEIGHT / squaresPerSide;

    const squares = Array.from(document.querySelectorAll('.square'));
    squares.map(square => {
        square.style.width = `${width}px`;
        square.style.height = `${height}px`;
    })
    
}