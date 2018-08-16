///////////
// Pixie //
///////////

class Pixie {
    constructor(numRows, numColumns) {
        this._numRows = numRows;
        this._numColumns = numColumns;
        this._pixels = [];
        for (let row = 0; row < numRows; row++) {
            this._pixels.push([]);
            for (let column = 0; column < numColumns; column++) {
                this._pixels[row].push((row + column) % 2 == 0 ? '#000000' : '#ffffff');
            }
        }
    }

    static copy(source) {
        let copy = new Pixie(source._numRows, source._numColumns);
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

    getPixelColor(row, column) {
        return this._pixels[row][column];
    }
}




////////////////////
// User Interface //
////////////////////

const NUM_ROWS = 20;
const NUM_COLUMNS = 20;
const PIXEL_SIZE = 15;

const canvas = document.getElementById('canvas');
canvas.width = NUM_COLUMNS * PIXEL_SIZE;
canvas.height = NUM_ROWS * PIXEL_SIZE;
const ctx = canvas.getContext('2d');

let pixie = new Pixie(NUM_ROWS, NUM_COLUMNS);
drawCanvas(pixie, ctx);

function drawCanvas(pixie, ctx) {
    pixie.pixels.forEach(pixel => {
        ctx.fillStyle = pixel.color;
        ctx.fillRect(
            pixel.column * PIXEL_SIZE,
            pixel.row * PIXEL_SIZE,
            PIXEL_SIZE,
            PIXEL_SIZE
        );
    });
}

function drawPixel(row, column, color, pixie, ctx) {
    if (pixelDiffers(row, column, color, pixie)) {
        let merged = pixie.merge([{ row, column, color }])
        drawCanvas(merged, ctx);
        return merged;
    } else {
        return pixie;
    }
}

function pixelDiffers(row, column, color, pixie) {
    return color != pixie.getPixelColor(row, column);
}




////////////////////
// Event Handling //
////////////////////

const history = [];
let drawing = false;

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function getPixelPos(x, y) {
    return {
        row: Math.floor(y / PIXEL_SIZE),
        column: Math.floor(x / PIXEL_SIZE)
    };
}

$(window).on('mousedown', function () {
    return false;   // disable cursor selection
});

$('#canvas').on('mousedown', function (event) {
    history.push(Pixie.copy(pixie));
    let mousePos = getMousePos(canvas, event);
    let pixelPos = getPixelPos(mousePos.x, mousePos.y);
    pixie = drawPixel(pixelPos.row, pixelPos.column, $('#color').val(), pixie, ctx);
    drawing = true;
    return false;   // disable cursor selection
});

$('#canvas').on('mousemove', function (event) {
    if (drawing) {
        let mousePos = getMousePos(canvas, event);
        let pixelPos = getPixelPos(mousePos.x, mousePos.y);
        pixie = drawPixel(pixelPos.row, pixelPos.column, $('#color').val(), pixie, ctx);
    }
});

$(window).on('mouseup', function () {
    drawing = false;
});

$('#undo').on('click', function () {
    if (history.length) {
        pixie = history.pop();
        drawCanvas(pixie, ctx);
    }
});
