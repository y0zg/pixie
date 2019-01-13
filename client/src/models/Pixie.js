class Pixie {
  constructor(numRows, numColumns) {
    this.rows = numRows;
    this.columns = numColumns;
    this.colors = [];
    for (let row = 0; row < numRows; row++) {
      this.colors.push([]);
      for (let column = 0; column < numColumns; column++) {
        this.colors[row].push((row + column) % 2 === 0 ? '#343a40' : '#000000');
      }
    }
  }

  static copy = source => {
    const copy = new Pixie(source.rows, source.columns);
    if (source._id) {
      copy._id = source._id;
    }

    copy.colors = source.colors.map(row => {
      return row.map(color => {
        return color;
      });
    });

    return copy;
  };

  static merge = (pixie, pixels) => {
    const merged = Pixie.copy(pixie);
    pixels.forEach(pixel => {
      merged.colors[pixel.row][pixel.column] = pixel.color;
    });

    return merged;
  };

  get pixels() {
    let pixels = [];
    this.colors.forEach((row, rowIndex) => {
      row.forEach((color, columnIndex) => {
        pixels.push({
          row: rowIndex, column: columnIndex, color: color
        });
      });
    });

    return pixels;
  }

  pixelColor = (row, column) => {
    return this.colors[row][column];
  };
}

export default Pixie;
