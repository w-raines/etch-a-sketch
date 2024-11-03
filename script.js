"use strict";

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;

paintBoard(16);

function paintBoard(squaresPerSide = 16) {
    let container = document.createElement('div');
    container.classList.add('container');
    
    for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        container.append(square);
    }

    let containerChildren = container.children;
    for (let child of containerChildren) {
        child.addEventListener("mouseenter", () => {
            child.style.backgroundColor = "black";
        })
    }

    // button to set grid sizing
    let button = document.createElement('button');
    button.innerText = "Change Grid Sizing";
    button.addEventListener("click", () => {
        let sizing;        
        do {
            sizing = prompt('Enter grid size (max 100): ', '');
            if (sizing === null) break; 
            sizing = Number(sizing); // done here cause Number(null) converts to 0.. javascript lmao
        } while(Number.isNaN(sizing) || sizing <= 0 || sizing > 100)
        
        if (sizing !== null) {
            clearBoard();
            paintBoard(Number(sizing));
        }
    })

    // displaying board size
    let boardSize = document.createElement('p');
    boardSize.innerText = `${squaresPerSide} x ${squaresPerSide}` 

    document.querySelector('body').append(button, boardSize, container);
    setSquareSizing(squaresPerSide);
}

function clearBoard() {
    let container = document.querySelector(".container");
    let button = document.querySelector("button");
    let boardSize = document.querySelector("p");
    button.remove();
    container.remove();
    boardSize.remove();
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