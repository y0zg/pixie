import React from 'react';
import PropTypes from 'prop-types';
import Pixie from './Pixie';
import PixieCanvas from './PixieCanvas';
import PixieService from '../../services/PixieService';
import { ChromePicker } from 'react-color';
import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

class PixieEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // size: this.props.size,
      // searchQuery: '',
      color: '#000000',
      pixie: null,
      eyedropper: false,
      socket: openSocket(process.env.REACT_APP_SOCKET_IO_URI)
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
      console.log('socket.io id: ', this.state.socket.id);
      this.state.socket.emit('hello', 'yo yo yo!');
      this.state.socket.on('disconnect', reason => console.log(`disconnect: ${reason}`));
      this.state.socket.on('updatePixie', updatedPixie => {
        if (updatedPixie.id === this.state.pixie._id) {
          this.setState({ pixie: Pixie.merge(this.state.pixie, updatedPixie.pixels) });
        }
      });
    });

    try {
      const getByIdResponse = await PixieService.getById(this.props.match.params.id);
      // console.log(getByIdResponse);
      // console.log(getByIdResponse.data.pixie.pixels());
      // this.setState({  });
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

  // onSubmitForm = event => {
  //   event.preventDefault();
  //   this.state.searchQuery && console.log('submit form:', this.state.searchQuery);
  //   this.setState({ searchQuery: '' });
  // }

  // searchQueryUpdate = event => {
  //   const key = event.target.name;
  //   const value = event.target.value;
  //   this.setState({ [key]: value });
  // }

  updatePixie = pixie => {
    this.setState({ pixie });
  };

  updateServer = async () => {
    const updateResponse = await PixieService.update(this.state.pixie);
    console.log('update response:', updateResponse);
    this.state.socket.emit('updatePixie', { id: this.state.pixie._id, pixels: this.state.pixie.pixels });
  };

  updateColor = color => {
    this.setState({ color, eyedropper: false });
  };

  // onSizeChange = event => {
  //   const value = event.target.value;
  //   this.setState({
  //     size: value
  //   });
  // };

  handleChangeComplete = color => {
    this.setState({ color: color.hex });
  };

  onClickEyedropper = () => {
    this.setState({ eyedropper: !this.state.eyedropper });
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
              className={`btn mt-2 btn-${this.state.eyedropper ? 'primary' : 'light'}`}
              onClick={this.onClickEyedropper}
            >
              Eyedropper
            </button>
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
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PixieEdit;
