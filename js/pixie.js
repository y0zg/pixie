//////////////////////////
// Pixie data structure //
//////////////////////////

class Pixie {
    constructor(numRows, numColumns) {
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.pixels = [];
        for (let row = 0; row < numRows; row++) {
            this.pixels.push([]);
            for (let column = 0; column < numColumns; column++) {
                this.pixels[row].push((row + column) % 2 == 0 ? 'black' : 'white');
            }
        }
    }

    static copy(source) {
        let copy = new Pixie(source.numRows, source.numColumns);
        copy = copy.merge(source.pixelList);
        return copy;
    }

    get pixelList() {
        let pixelList = [];
        this.pixels.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                pixelList.push({
                    row: rowIndex, column: columnIndex, color: column
                });
            });
        });
        return pixelList;
    }

    merge(pixels) {
        let merged = new Pixie(this.numRows, this.numColumns);
        merged.pixels = this.pixels.slice();
        pixels.forEach(pixel => {
            merged.pixels[pixel.row][pixel.column] = pixel.color;
        });
        return merged;
    }
}




////////
// UI //
////////

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
    pixie.pixelList.forEach(pixel => {
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
// Event handling //
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