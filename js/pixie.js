//////////////////////////
// Pixie Data Structure //
//////////////////////////

class Pixie {
    constructor(numRows, numColumns) {
        this._numRows = numRows;
        this._numColumns = numColumns;
        this._pixels = [];
        for (let row = 0; row < numRows; row++) {
            this._pixels.push([]);
            for (let column = 0; column < numColumns; column++) {
                this._pixels[row].push((row + column) % 2 == 0 ? 'black' : 'white');
            }
        }
    }

    static copy(source) {
        let copy = new Pixie(source.numRows, source.numColumns);
        copy = copy.merge(source.pixels);
        return copy;
    }

    merge(pixels) {
        let merged = new Pixie(this._numRows, this._numColumns);
        merged._pixels = this._pixels.slice();
        pixels.forEach(pixel => {
            merged._pixels[pixel.row][pixel.column] = pixel.color;
        });
        return merged;
    }

    get pixels() {
        let pixels = [];
        this._pixels.forEach((row, rowIndex) => {
            row.forEach((color, columnIndex) => {
                pixels.push({
                    row: rowIndex, column: columnIndex, color: color
                });
            });
        });
        return pixels;
    }
}




////////////////////
// User Interface //
////////////////////

const numRows = 20;
const numColumns = 20;
const pixelSize = 15;

let pixie = new Pixie(numRows, numColumns);

const canvas = document.getElementById('canvas');
canvas.width = numColumns * pixelSize;
canvas.height = numRows * pixelSize;
const ctx = canvas.getContext('2d');
drawPixie(pixie, ctx);

function drawPixie(pixie, ctx) {
    pixie.pixels.forEach(pixel => {
        ctx.fillStyle = pixel.color;
        ctx.fillRect(
            pixel.column * pixelSize,
            pixel.row * pixelSize,
            pixelSize,
            pixelSize
        );
    });
}




////////////////////
// Event Handling //
////////////////////

let mouseDown = false;

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function getPixelPos(x, y) {
    return {
        row: Math.floor(y / pixelSize),
        col: Math.floor(x / pixelSize)
    };
}

$('#canvas').on('mousedown', function (event) {
    let mousePos = getMousePos(canvas, event);
    let pixelPos = getPixelPos(mousePos.x, mousePos.y);
    pixie = pixie.merge([{
        row: pixelPos.row,
        column: pixelPos.col,
        color: $('#color').val()
    }]);
    drawPixie(pixie, ctx);
    mouseDown = true;
    return false;   // disable cursor selection
});

$(window).on('mouseup', function (event) {
    mouseDown = false;
});

$(window).on('mousedown', function (event) {
    return false;   // disable cursor selection
});

$('#canvas').on('mousemove', function (event) {
    if (mouseDown) {
        let mousePos = getMousePos(canvas, event);
        let pixelPos = getPixelPos(mousePos.x, mousePos.y);
        pixie = pixie.merge([{
            row: pixelPos.row,
            column: pixelPos.col,
            color: $('#color').val()
        }]);
        drawPixie(pixie, ctx);
    }
});
