import React from 'react';
import PropTypes from 'prop-types';
import PixieService from '../../services/PixieService';
import Pixie from '../../models/Pixie';
import PixieCanvas from '../pixie/PixieCanvas';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Pagination from './Pagination';

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
    previousQuery: '',
    searchResults: [],
    totalPages: 0,
    currentPage: 1,
    maxPages: 10,
  };

  onChangeTextInput = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  onSubmitForm = event => {
    event.preventDefault();
    if (this.state.query && this.state.query !== this.state.previousQuery) {
      if (this.currentPage !== 1) {
        this.setState({ currentPage: 1 }, () => this.search());
      } else {
        this.search();
      }
    }
  };

  onOpened = () => {
    this.searchImageInput.focus();
  };

  onClosed = () => {
    this.setState({
      query: '',
      previousQuery: '',
      searchResults: [],
      totalPages: 0,
      currentPage: 1
    });
  };

  search = async () => {
    try {
      const results = await PixieService.search(
        this.state.query,
        this.props.pixie.rows,
        this.state.currentPage,
        3,
      );
      this.setState({
        totalPages: results.totalPages,
        searchResults: results.pixels,
        previousQuery: this.state.query,
      });
    } catch (error) {
      console.error(error);
    }
  }

  setCurrentPage = currentPage => {
    this.setState(
      {
        currentPage,
        searchResults: [],
      },
      () => this.search()
    );
  };

  render = () => {
    const { isOpen, toggle, onSelect } = this.props;
    const { query, totalPages, currentPage } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        onOpened={this.onOpened}
        onClosed={this.onClosed}
        className="modal-lg text-dark"
      >
        <ModalHeader toggle={toggle}>Import</ModalHeader>
        <ModalBody>
          <form onSubmit={this.onSubmitForm}>
            <div className="form-group">
              <input
                type="text"
                name="query"
                className="form-control"
                placeholder="search..."
                value={query}
                onChange={this.onChangeTextInput}
                ref={searchImageInput => this.searchImageInput = searchImageInput}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <div className="row mt-3" style={{ height: '241px' }}>
            {this.state.searchResults.map((pixels, index) => {
              const pixie = Pixie.merge(this.props.pixie, pixels);
              return (
                <div
                  className="col"
                  key={index}
                  onClick={onSelect(pixie)}
                >
                  <PixieCanvas pixie={pixie} style={{ cursor: 'pointer' }} />
                </div>
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={this.setCurrentPage}
            maxPages={this.state.maxPages}
          />
        </ModalFooter>
      </Modal>
    );
  };
}

export default ImageSearch;
