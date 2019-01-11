import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ImageSearch extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  };

  state = { query: '' };

  onChangeTextInput = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  onSubmitForm = event => {
    event.preventDefault();
    console.log('Submit: ', this.state.query);
  };

  onOpened = () => {
    console.log('onOpened');
    this.searchImageInput.focus();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        onOpened={this.onOpened}
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
                value={this.query}
                onChange={this.onChangeTextInput}
                ref={searchImageInput => this.searchImageInput = searchImageInput}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </ModalBody>
        <ModalFooter>
          hey look a footer!
        </ModalFooter>
      </Modal>
    );
  }
};

export default ImageSearch;
