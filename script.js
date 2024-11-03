"use strict";

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;
let mode = "Black";
let size = 16;


paintStaticContent();
paintBoard(size);

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
            if (mode === "Opacity") {
                if (child.dataset.opacityLevels === undefined) {
                    child.dataset.opacityLevels = .1;
                } else if (Number(child.dataset.opacityLevels) < 1) {
                    child.dataset.opacityLevels = Number(child.dataset.opacityLevels) + .10;
                } 
                child.style.backgroundColor = `rgba(0, 0, 0, ${child.dataset.opacityLevels})`;
            } else {
                if (child.dataset.filled == undefined) {
                    if (mode == "Black") {
                        child.style.backgroundColor = "black";       
                    } else {
                        child.style.backgroundColor = randomColor();
                    }
                    child.dataset.filled = true;
                }
            }
        })
    }

    let boardSize = document.createElement('p');
    boardSize.innerText = `${squaresPerSide} x ${squaresPerSide}` 

    document.querySelector('body').append(boardSize, container);
    setSquareSizing(squaresPerSide);
}

function paintStaticContent() {
    let modesContainer = document.createElement('div');
    modesContainer.classList.add("modes-container")
    let radioValues = ["Black", "Colorful", "Opacity"];
    
    radioValues.forEach(item => {
        let input = document.createElement('input');
        input.type = "radio";
        input.id = item;
        input.name = "modes"
        if (item == "Black") input.checked = true;
        
        let label = document.createElement('label');
        label.for = item;
        label.innerHTML = item;
        modesContainer.append(input, label)
    })

    modesContainer.addEventListener("click", (e) => {
        console.log(e.target.id);
        if (e.target && e.target.matches("input[type=radio]")) {
            mode = e.target.id;
            clearBoard();
            paintBoard(size)
        }
    })

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
            size = sizing;
            clearBoard();
            paintBoard(Number(sizing));
        }
    })

    document.querySelector('body').append(button, modesContainer);
}

function clearBoard() {
    let container = document.querySelector(".container");
    let boardSize = document.querySelector("p");
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