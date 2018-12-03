import React from 'react';
import PropTypes from 'prop-types';
import Pixie from './Pixie';
import PixieCanvas from './PixieCanvas';
import PixieService from '../../services/PixieService';

class PixieCreate extends React.Component {
  state = {
    size: this.props.size,
    pixie: new Pixie(this.props.size, this.props.size)
  };

  static propTypes = {
    size: PropTypes.number
  };

  static defaultProps = {
    size: 25
  };

  onFormSubmit = async event => {
    event.preventDefault();
    const createResponse = await PixieService.create(this.state.pixie);
    console.log(createResponse);
  };

  onSizeChange = event => {
    const value = event.target.value;
    this.setState({
      size: value,
      pixie: new Pixie(value, value)
    });
  };

  updatePixie = pixie => this.setState({ pixie });

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <form onSubmit={this.onFormSubmit}>
              <div className="form-group">
                <label>Size</label>
                <input
                  type="range"
                  name="rows"
                  className="form-control"
                  min="10"
                  max="50"
                  value={this.state.numRows}
                  onChange={this.onSizeChange}
                />
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
          <div className="col-md-8 col-ld-9">
            <PixieCanvas
              pixie={this.state.pixie}
              updatePixie={this.updatePixie}
              isEditable={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PixieCreate;
