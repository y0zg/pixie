import React from 'react';
import Pixie from './Pixie';

class PixieCanvas extends React.Component {
  state = {
    ctx: null,
    isMouseDown: false,
    pixie: new Pixie(25, 25)
  };

  componentDidMount() {
    const canvas = this.refs.canvas;
    this.setState({ ctx: canvas.getContext("2d") });
  }

  onMouseDown = event => {
    const mouseCoords = this.getMousePos(event);
    const pixiePosition = this.getPixelPos(mouseCoords.x, mouseCoords.y);
    this.drawPixel(pixiePosition.row, pixiePosition.column, '#ff0000');
    this.setState({ isMouseDown: true });
  };

  onMouseUp = () => {
    this.setState({ isMouseDown: false });
  };

  onMouseMove = event => {
    if (this.state.isMouseDown) {
      const mouseCoords = this.getMousePos(event);
      const pixiePosition = this.getPixelPos(mouseCoords.x, mouseCoords.y);
      this.drawPixel(pixiePosition.row, pixiePosition.column, '#ff0000');
    }
  };

  getMousePos = event => {
    const canvas = this.refs.canvas;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  getPixelPos = (x, y) => {
    const ctx = this.state.ctx;
    const canvasWidth = ctx.canvas.clientWidth;
    const pixelSize = canvasWidth / this.state.pixie.numRows;
    return {
      row: Math.floor(y / pixelSize),
      column: Math.floor(x / pixelSize)
    };
  };

  drawPixel = (row, column, color) => {
    const oldPixie = this.state.pixie;
    if (this.pixelDiffers(row, column, color)) {
      let newPixie = Pixie.merge(oldPixie, [{ row, column, color }]);
      this.setState({ pixie: newPixie });
    }
  };

  pixelDiffers = (row, column, color) => {
    return color !== this.state.pixie.pixelColor(row, column);
  };

  drawCanvas = pixie => {
    if (this.state.ctx) {
      const ctx = this.state.ctx;
      const canvasWidth = ctx.canvas.width;

      const pixelSize = canvasWidth / pixie.numRows;
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
  };

  render() {
    this.drawCanvas(this.state.pixie);
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
      >
        Sorry, your browser doesn't support the &lt;canvas&gt; element.
      </canvas >
    );
  }
}

export default PixieCanvas;
