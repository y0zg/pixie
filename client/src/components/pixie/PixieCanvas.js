import React from 'react';
import PropTypes from 'prop-types';
import Pixie from './Pixie';

class PixieCanvas extends React.Component {
  state = {
    ctx: null,
    isMouseDown: false
  };

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    isEditable: PropTypes.bool,
    color: PropTypes.string,
    eyedropper: PropTypes.bool
  };

  static defaultProps = {
    width: 1000,
    height: 1000,
    isEditable: false,
    color: '#000000',
    eyedropper: false
  };

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    this.setState({ ctx });
  }

  onMouseDown = event => {
    if (this.props.isEditable) {
      const mouseCoords = this.getMousePos(event);
      const pixiePosition = this.getPixelPos(mouseCoords.x, mouseCoords.y);
      if (this.props.eyedropper) {
        this.props.updateColor(
          this.props.pixie.pixelColor(pixiePosition.row, pixiePosition.column)
        );
      } else {
        this.drawPixel(pixiePosition.row, pixiePosition.column, this.props.color);
      }
    }
    this.setState({ isMouseDown: true });
  };

  onMouseUp = () => {
    this.setState({ isMouseDown: false });
  };

  onMouseMove = event => {
    if (this.props.isEditable && this.state.isMouseDown) {
      const mouseCoords = this.getMousePos(event);
      const pixiePosition = this.getPixelPos(mouseCoords.x, mouseCoords.y);
      this.drawPixel(pixiePosition.row, pixiePosition.column, this.props.color);
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
    const pixelSize = canvasWidth / this.props.pixie.rows;
    return {
      row: Math.floor(y / pixelSize),
      column: Math.floor(x / pixelSize)
    };
  };

  drawPixel = (row, column, color) => {
    if (this.pixelDiffers(row, column, color)) {
      const oldPixie = this.props.pixie;
      const oldColor = oldPixie.pixelColor(row, column);
      const newPixie = Pixie.merge(oldPixie, [{ row, column, color }]);
      this.props.updateDiff({ row, column, color: oldColor }, { row, column, color });
      this.props.updatePixie(newPixie);
      this.props.updateServer();

    }
  };

  pixelDiffers = (row, column, color) => {
    return color !== this.props.pixie.pixelColor(row, column);
  };

  drawCanvas = pixie => {
    if (this.state.ctx) {
      const ctx = this.state.ctx;
      const canvasWidth = ctx.canvas.width;

      const pixelSize = canvasWidth / pixie.rows;
      pixie.pixels.forEach(pixel => {
        ctx.fillStyle = pixel.color;
        ctx.fillRect(
          pixel.column * pixelSize,
          pixel.row * pixelSize,
          pixelSize + 1,
          pixelSize + 1
        );
      });
    }
  };

  render() {
    this.drawCanvas(this.props.pixie);
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
