import React from 'react';
import PropTypes from 'prop-types';
import PixieService from '../../services/PixieService';
import Pixie from '../../models/Pixie';
import PixieCanvas from '../pixie/PixieCanvas';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

// TODO:
// - pagination
class ImageSearch extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    pixie: PropTypes.instanceOf(Pixie),
    onSelect: PropTypes.func.isRequired,
  };

  static propDefaults = {
    pixie: null,
  };

  state = {
    query: '',
    searchResults: [],
  };

  onChangeTextInput = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  onSubmitForm = async event => {
    event.preventDefault();
    if (this.state.query) {
      try {
        const results = await PixieService.search(
          this.state.query,
          this.props.pixie.rows,
          1,
          3,
        );
        this.setState({ searchResults: results.pixels });
      } catch (error) {
        console.error(error);
      }
    }
  };

  onOpened = () => {
    this.searchImageInput.focus();
  };

  onClosed = () => {
    this.setState({
      query: '',
      searchResults: [],
    });
  };

  render = () => {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        onOpened={this.onOpened}
        onClosed={this.onClosed}
        className="modal-lg text-dark"
      >
        <ModalHeader toggle={this.props.toggle}>Image Search</ModalHeader>
        <ModalBody>
          <form onSubmit={this.onSubmitForm}>
            <div className="form-group">
              <input
                type="text"
                name="query"
                className="form-control"
                placeholder="search..."
                value={this.state.query}
                onChange={this.onChangeTextInput}
                ref={searchImageInput => this.searchImageInput = searchImageInput}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <div className="row mt-3">
            {this.state.searchResults.map((pixels, index) => {
              const pixie = Pixie.merge(this.props.pixie, pixels);
              return (
                <div className="col" key={index} onClick={this.props.onSelect(pixie)}>
                  <PixieCanvas pixie={pixie} />
                </div>
              );
            })}
          </div>
        </ModalBody>
      </Modal>
    );
  };
}

export default ImageSearch;
