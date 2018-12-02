class Pixie {
  constructor(numRows, numColumns) {
    this._numRows = numRows;
    this._numColumns = numColumns;
    this._pixels = [];
    for (let row = 0; row < numRows; row++) {
      this._pixels.push([]);
      for (let column = 0; column < numColumns; column++) {
        this._pixels[row].push((row + column) % 2 === 0 ? '#000000' : '#ffffff');
      }
    }
  }

  static copy(source) {
    let copy = new Pixie(source._numRows, source._numColumns);
    copy = copy.merge(source.pixels);
    return copy;
  }

  static merge(pixie, pixels) {
    const merged = new Pixie(pixie._numRows, pixie._numColumns);
    merged._pixels = pixie._pixels.slice();
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

  get numRows() {
    return this._numRows;
  }

  get numColumns() {
    return this._numColumns;
  }

  pixelColor(row, column) {
    return this._pixels[row][column];
  }
}

export default Pixie;
