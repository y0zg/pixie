import React from 'react';

class PixieCanvas extends React.Component {
  state = {
    ctx: null,
    isMouseDown: false
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
    const pixelSize = canvasWidth / this.props.pixie.numRows;
    return {
      row: Math.floor(y / pixelSize),
      column: Math.floor(x / pixelSize)
    };
  }

  drawPixel = (row, column, color) => {
    const pixie = this.props.pixie;
    if (this.pixelDiffers(row, column, color)) {
      let merged = pixie.merge([{ row, column, color }])
      this.drawCanvas(merged);
      return merged;
    } else {
      return pixie;
    }
  }

  pixelDiffers = (row, column, color) => {
    return color !== this.props.pixie.getPixelColor(row, column);
  }

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
  }

  render() {
    this.drawCanvas(this.props.pixie);
    return (
      <canvas
        ref="canvas"
        width="300"
        height="300"
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
