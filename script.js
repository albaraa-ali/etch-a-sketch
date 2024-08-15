const defaultSize = 16;
let currentMode = 'color';
let currentColor = 'black';

const sizeBtn = document.querySelector(".size");
const rainbowBtn = document.querySelector(".rainbow");
const colorBtn = document.querySelector(".color");
const eraseBtn = document.querySelector(".erase");
const grid = document.querySelector(".grid");

sizeBtn.addEventListener("click", changeSize);
rainbowBtn.addEventListener("click", () => activateButton('rainbow'));
colorBtn.addEventListener("click", () => activateButton('color'));
eraseBtn.addEventListener("click", () => activateButton('erase'));

function changeSize() {
    let newSize;
    do {
        newSize = parseInt(prompt("Please enter a number between 1 and 100"));
    } while (isNaN(newSize) || newSize < 1 || newSize > 100);

    setupGrid(newSize);
}

//erase the grid to prepare for setup
function clearGrid() {
    grid.innerHTML = '';
}

function setupGrid(size) {
    clearGrid();
    for (let i = 0; i < size; i++) {
        const column = document.createElement("div");
        column.className = "column";
        grid.appendChild(column);
        for (let j = 0; j < size; j++) {
            const square = document.createElement("div");
            square.className = "square";
            column.appendChild(square);

            square.addEventListener('mouseover', function () {
                if (mouseDown) {
                    changeColor(square);
                }
            });

            square.addEventListener('click', function () {
                changeColor(square);
            });
        }
    }
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function activateButton(newMode) {
    currentMode = newMode;
    if (newMode === 'color') {
        currentColor = 'black'; // Reset to default color or any chosen color
    }
}

function changeColor(square) {
    if (currentMode === 'rainbow') {
        square.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    } else if (currentMode === 'erase') {
        square.style.backgroundColor = 'white'; // Assuming the background color of the grid is white
    } else {
        square.style.backgroundColor = currentColor;
    }
}

window.onload = () => {
    setupGrid(defaultSize);
}
