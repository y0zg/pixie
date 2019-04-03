import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import Pixie from '.';
import PixieCanvas from './PixieCanvas';
import PixieService from '../../services/PixieService';

export default class PixieCreate extends Component {
  state = {
    size: this.props.size,
    pixie: new Pixie(this.props.size, this.props.size),
  };

  static propTypes = {
    size: PropTypes.number,
  };

  static defaultProps = {
    size: 25,
  };

  onSubmitForm = async event => {
    event.preventDefault();
    try {
      const createResponse = await PixieService.create(this.state.pixie);
      this.props.history.push(`/edit/${createResponse.data.pixie._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  onSizeChange = value => {
    this.setState({
      size: value,
      pixie: new Pixie(value, value),
    });
  };

  updatePixie(pixie) {
    this.setState({ pixie });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <form onSubmit={this.onSubmitForm}>
              <div className="form-group">
                <InputRange
                  maxValue={50}
                  minValue={5}
                  value={this.state.size}
                  onChange={this.onSizeChange}
                />
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
          <div className="col-md-8 col-ld-9">
            <PixieCanvas pixie={this.state.pixie} updatePixie={this.updatePixie} />
          </div>
        </div>
      </div>
    );
  }
}
