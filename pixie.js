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