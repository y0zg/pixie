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

////////////
// Canvas //
////////////

let NUM_ROWS = 20;
let NUM_COLUMNS = 20;
let PIXEL_SIZE = 25;

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
// User Interface //
////////////////////

let history = [];
let mouseDown = false;
const Modes = Object.freeze({ draw: 0, eyedropper: 1 });
let mode = Modes.draw;

$('#canvas').on('mousedown', function (event) {
    let mousePos = getMousePos(canvas, event);
    let pixelPos = getPixelPos(mousePos.x, mousePos.y);
    switch (mode) {
        case Modes.draw:
            history.push(Pixie.copy(pixie));
            pixie = drawPixel(pixelPos.row, pixelPos.column, $('#color').val(), pixie, ctx);
            mouseDown = true;
            break;
        case Modes.eyedropper:
            $('#color').val(pixie.getPixelColor(pixelPos.row, pixelPos.column));
            setMode(Modes.draw);
            break;
    }
});

$('#canvas').on('mousemove', function (event) {
    if (mouseDown) {
        let mousePos = getMousePos(canvas, event);
        let pixelPos = getPixelPos(mousePos.x, mousePos.y);
        pixie = drawPixel(pixelPos.row, pixelPos.column, $('#color').val(), pixie, ctx);
    }
    let mousePos = getMousePos(canvas, event);
});

$(window).on('mouseup', function () {
    mouseDown = false;
});

$('#draw').on('click', function () {
    setMode(Modes.draw);
});

$('#eyedropper').on('click', function () {
    setMode(Modes.eyedropper);
});

$('#undo').on('click', function () {
    if (history.length) {
        pixie = history.pop();
        drawCanvas(pixie, ctx);
    }
});

$('#reset').on('click', function () {
    if (window.confirm('Are you sure?')) {
        history = [];
        pixie = new Pixie(NUM_ROWS, NUM_COLUMNS);
        drawCanvas(pixie, ctx);
    }
});

$('#resize').on('click', function () {
    if ($('#resize').hasClass('disabled')) {
        $('#resize').removeClass('disabled');
        $('#scaleForm').hide();
    } else {
        $('#resize').addClass('disabled');
        $('#scaleForm').show();
    }
});

$('#scale').on('input', function (event) {
    PIXEL_SIZE = $('#scale').val();
    canvas.width = NUM_COLUMNS * PIXEL_SIZE;
    canvas.height = NUM_ROWS * PIXEL_SIZE;
    drawCanvas(pixie, ctx);
});

function setMode(newMode) {
    switch (newMode) {
        case Modes.draw:
            mode = Modes.draw;
            $('#draw').addClass('btn-primary');
            $('#eyedropper').removeClass('btn-primary');
            break;
        case Modes.eyedropper:
            mode = Modes.eyedropper;
            $('#eyedropper').addClass('btn-primary');
            $('#draw').removeClass('btn-primary');
            break;
    }
}

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
