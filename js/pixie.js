class Pixie {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.pixels = [];
        for (let row = 0; row < height; row++) {
            for (let column = 0; column < width; column++) {
                let pixel = { row: row, column: column, red: 0, green: 0, blue: 0 };
                if ((row + column) % 2 == 0) {
                    pixel.red = 0;
                    pixel.green = 0;
                    pixel.blue = 0;
                }
                this.pixels.push(pixel);
            }
        }
    }
}

const width = 10;
const height = 10;
const pixie = new Pixie(width, height);
console.log(pixie);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

const rows = 20;
const columns = 20;
const cellSize = 15;

let mouseDown = false;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        drawCell({ row: row, col: col }, (row + col) % 2 == 0 ? 'black' : 'white');
    }
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function getCellPos(x, y) {
    return {
        row: Math.floor(y / cellSize),
        col: Math.floor(x / cellSize)
    };
}

function drawCell(cellPos, color) {
    ctx.fillStyle = color;
    ctx.fillRect(cellPos.col * cellSize, cellPos.row * cellSize, cellSize, cellSize);
}

$('#canvas').on('mousedown', function (event) {
    let mousePos = getMousePos(canvas, event);
    let cellPos = getCellPos(mousePos.x, mousePos.y);
    console.log(`row: ${cellPos.row}, col: ${cellPos.col}`);
    drawCell(cellPos, $('#color').val());
    mouseDown = true;
    return false;
});

$('#canvas').on('mousemove', function (event) {
    if (mouseDown) {
        let mousePos = getMousePos(canvas, event);
        let cellPos = getCellPos(mousePos.x, mousePos.y);
        drawCell(cellPos, $('#color').val());
        console.log(`row: ${cellPos.row}, col: ${cellPos.col}`);
    }
});

$(window).on('mouseup', function (event) {
    mouseDown = false;
});