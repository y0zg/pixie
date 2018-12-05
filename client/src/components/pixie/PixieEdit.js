import React from 'react';
import PropTypes from 'prop-types';
import Pixie from './Pixie';
import PixieCanvas from './PixieCanvas';
import PixieService from '../../services/PixieService';
import Dropzone from 'react-dropzone';
import { ChromePicker } from 'react-color';
import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

class PixieEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#000000',
      pixie: null,
      eyedropper: false,
      socket: openSocket(process.env.REACT_APP_SOCKET_IO_URI),
      diff: [],
      undoStack: []
    };
  }

  static propTypes = {
    size: PropTypes.number
  };

  static defaultProps = {
    size: 25
  };

  async componentDidMount() {
    this.state.socket.on('connect', () => {
      this.state.socket.emit('hello', 'yo yo yo!');
      this.state.socket.on('disconnect', reason => console.log(`disconnect: ${reason}`));
      this.state.socket.on('updatePixie', updatedPixie => {
        if (updatedPixie.id === this.state.pixie._id) {
          this.setState({ pixie: Pixie.merge(this.state.pixie, updatedPixie.diff) });
        }
      });
    });

    try {
      const getByIdResponse = await PixieService.getById(this.props.match.params.id);
      const pixie = Pixie.copy(getByIdResponse.data.pixie);
      pixie._id = getByIdResponse.data.pixie._id;
      this.setState({ pixie });
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  updatePixie = pixie => {
    this.setState({ pixie });
  };

  updateServer = async () => {
    try {
      await PixieService.update(this.state.pixie);
      this.state.socket.emit('updatePixie', { id: this.state.pixie._id, diff: this.state.diff });
      this.setState({ diff: [] });
    } catch (error) {
      console.error(error);
    }
  };

  updateColor = color => {
    this.setState({ color, eyedropper: false });
  };

  updateDiff = (oldPixel, newPixel) => {
    this.setState({
      diff: [...this.state.diff, newPixel],
      undoStack: [...this.state.undoStack, oldPixel]
    });
  };

  onClickUndo = () => {
    const newUndoStack = this.state.undoStack.slice();
    const newPixel = newUndoStack.pop();
    this.setState({
      undoStack: newUndoStack,
      diff: [...this.state.diff, newPixel],
      pixie: Pixie.merge(this.state.pixie, [newPixel])
    }, () => this.updateServer());
  };

  handleChangeComplete = color => {
    this.setState({ color: color.hex });
  };

  onClickEyedropper = () => {
    this.setState({ eyedropper: !this.state.eyedropper });
  };

  onDrop = async (acceptedFiles, rejectedFiles) => {
    const uploadResponse = await PixieService.upload(acceptedFiles[0], this.state.pixie.rows);
    const newPixie = Pixie.merge(this.state.pixie, uploadResponse.data.pixels);
    this.setState({ pixie: newPixie, diff: newPixie.pixels },
      () => this.updateServer());
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <ChromePicker
              color={this.state.color}
              onChangeComplete={this.handleChangeComplete}
              disableAlpha={true}
            />
            <button
              className={`btn btn-block mt-2 btn-${this.state.eyedropper ? 'primary' : 'light'}`}
              onClick={this.onClickEyedropper}
            >
              eyedropper
            </button>
            <button
              className={`btn btn-block my-2 btn-light`}
              onClick={this.onClickUndo}
              disabled={this.state.undoStack.length === 0}
            >
              undo
            </button>
            <Dropzone onDrop={(files) => this.onDrop(files)}>
              <div>Drag an image here</div>
            </Dropzone>
          </div>
          <div className="col-md-8 col-lg-9">
            {this.state.pixie &&
              <PixieCanvas
                pixie={this.state.pixie}
                updatePixie={this.updatePixie}
                color={this.state.color}
                isEditable={true}
                updateServer={this.updateServer}
                eyedropper={this.state.eyedropper}
                updateColor={this.updateColor}
                updateDiff={this.updateDiff}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PixieEdit;
