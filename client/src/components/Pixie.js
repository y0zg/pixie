import React from 'react';
import PixieContainer from './PixieContainer';
import PixieCanvas from './PixieCanvas';

class Pixie extends React.Component {
  state = {
    searchQuery: '',
    isMouseDown: false,
    pixie: new PixieContainer(10, 10),
    pixelSize: 25
  };

  mouseEvent = event => {
    // console.log(`eventType: ${eventType}`, event.nativeEvent);
    // console.log(event.type);
    switch (event.type) {
      case 'mousedown':
        this.setState({ isMouseDown: true });
        console.log(`x: ${event.clientX}, y: ${event.clientY}`);
        break;
      case 'mouseup':
        this.setState({ isMouseDown: false });
        break;
      case 'mousemove':
        if (this.state.isMouseDown) {
          console.log(`x: ${event.clientX}, y: ${event.clientY}`);
          // console.log('mousemove', event.nativeEvent);
        }
        break;
      default:
        break;
    }
  }

  submitForm = event => {
    event.preventDefault();
    this.state.searchQuery && console.log('submit form:', this.state.searchQuery);
    // this.setState({ searchQuery: '' });
  }

  searchQueryUpdate = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  }

  resizePixel = (newSize = null) => {
    if (newSize) {
      this.setState({ pixelSize: newSize });
    }
  };

  render() {
    // console.log(this.state.pixie.pixels);
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Pixie</h1>
            <form onSubmit={this.submitForm}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="searchQuery"
                  placeholder="search..."
                  value={this.state.searchQuery}
                  onChange={this.searchQueryUpdate}
                />
              </div>
            </form>
          </div>
          <div className="col-md-8 col-lg-9">
            <PixieCanvas
              pixie={this.state.pixie}
              numRows={20}
              numColumns={20}
              pixelSize={this.state.pixelSize}
              setPixelSize={this.resizePixel}
            />
            {/* <canvas
              id="canvas"
              width="300"
              height="300"
              onMouseDown={this.mouseEvent}
              onMouseUp={this.mouseEvent}
              onMouseMove={this.mouseEvent}
            >
              Sorry, your browser doesn't support the &lt;canvas&gt; element.
            </canvas> */}
          </div>

        </div>
      </div>
    );
  }
}

export default Pixie;
