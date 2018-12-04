import React from 'react';
import PropTypes from 'prop-types';
import Pixie from './Pixie';
import PixieCanvas from './PixieCanvas';
import PixieService from '../../services/PixieService';
import { ChromePicker } from 'react-color';

class PixieEdit extends React.Component {
  state = {
    // size: this.props.size,
    // searchQuery: '',
    color: '#000000',
    pixie: new Pixie(this.props.size, this.props.size)
  };

  static propTypes = {
    size: PropTypes.number
  };

  static defaultProps = {
    size: 25
  };

  async componentDidMount() {
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
    console.log(pixie);
    this.setState(
      { pixie },
      async () => {
        const updateResponse = await PixieService.update(pixie);
        console.log('update response:', updateResponse);
      }
    );
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <ChromePicker
              color={this.state.color}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
          <div className="col-md-8 col-lg-9">
            <PixieCanvas
              pixie={this.state.pixie}
              updatePixie={this.updatePixie}
              color={this.state.color}
              isEditable={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PixieEdit;
