import React from 'react';

class PixieCanvas extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    this.drawCanvas(this.props.pixie, ctx);
  }

  drawCanvas = (pixie, ctx) => {
    console.log(ctx.canvas.clientWidth);
    pixie.pixels.forEach(pixel => {
      ctx.fillStyle = pixel.color;
      ctx.fillRect(
        pixel.column * this.props.pixelSize,
        pixel.row * this.props.pixelSize,
        this.props.pixelSize,
        this.props.pixelSize
      );
    });
  }

  render() {
    console.log(this.props.pixie.pixels);
    return (
      <canvas
        ref="canvas"
        width="300"
        height="300"
      // onMouseDown={this.mouseEvent}
      // onMouseUp={this.mouseEvent}
      // onMouseMove={this.mouseEvent}
      >
        Sorry, your browser doesn't support the &lt;canvas&gt; element.
      </canvas>
    );
  }
}

export default PixieCanvas;
