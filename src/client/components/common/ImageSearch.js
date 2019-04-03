import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import Pixie from '../pixie';
import PixieCanvas from '../pixie/PixieCanvas';
import PixieService from '../../services/PixieService';
import Pagination from './Pagination';

export default class ImageSearch extends Component {
  state = {
    query: '',
    previousQuery: '',
    searchResults: [],
    totalPages: 0,
    currentPage: 1,
    maxPages: 10,
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
    pixie: PropTypes.instanceOf(Pixie),
    toggle: PropTypes.func.isRequired,
  };

  static propDefaults = {
    pixie: null,
  };

  onChangeTextInput = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  onSubmitForm = event => {
    event.preventDefault();
    if (this.state.query && this.state.query !== this.state.previousQuery) {
      this.setState({ currentPage: 1, totalPages: 0, searchResults: [] }, () => this.search());
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
      currentPage: 1,
    });
  };

  async search() {
    try {
      const results = await PixieService.search(
        this.state.query,
        this.props.pixie.rows,
        this.state.currentPage,
        3
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

  onSelectPage = currentPage => {
    this.setState({ currentPage, searchResults: [] }, () => this.search());
  };

  render() {
    const { isOpen, toggle, onSelect } = this.props;
    const { query, totalPages, currentPage, searchResults, maxPages } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        onOpened={this.onOpened}
        onClosed={this.onClosed}
        className="modal-lg text-dark modal-dialog-centered"
      >
        <ModalHeader toggle={toggle}>Search for images on Unsplash.com</ModalHeader>
        <ModalBody>
          <form onSubmit={this.onSubmitForm}>
            <div className="row">
              <div className="col-8 col-lg-8 offset-lg-2">
                <input
                  type="text"
                  name="query"
                  className="form-control"
                  placeholder="search..."
                  value={query}
                  onChange={this.onChangeTextInput}
                  ref={searchImageInput => (this.searchImageInput = searchImageInput)}
                />
              </div>
              {/* <div className="col-3 col-md-2"> */}
              <div className="col">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div className="row mt-3">
            {this.state.searchResults.map((pixels, index) => {
              const pixie = Pixie.merge(this.props.pixie, pixels);
              return (
                <div className="col" key={index} onClick={onSelect(pixie)}>
                  <PixieCanvas pixie={pixie} style={{ cursor: 'pointer' }} />
                </div>
              );
            })}
          </div>
        </ModalBody>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onSelectPage={this.onSelectPage}
          maxPages={maxPages}
          enabled={searchResults.length > 0}
        />
      </Modal>
    );
  }
}
