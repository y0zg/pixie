import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  static propTypes = {
    onSelectPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
    maxPages: PropTypes.number,
    totalPages: PropTypes.number,
    enabled: PropTypes.bool,
  };

  static propDefaults = {
    currentPage: 1,
    maxPages: 10,
    totalPages: 0,
    enabled: false,
  };

  onSelectPage = currentPage => event => {
    event.preventDefault();
    if (this.props.enabled && currentPage > 0 && currentPage <= this.props.maxPages) {
      this.props.onSelectPage(currentPage);
    }
  };

  pageLinks(currentPage, totalPages, maxPages) {
    const links = [];
    for (let page = 1; page <= totalPages && page <= maxPages; page++) {
      links.push(
        <li key={`link${page}`} className={`page-item${page === currentPage && ' active'}`}>
          <a className="page-link" onClick={this.onSelectPage(page)} href="/">
            {page}
          </a>
        </li>
      );
    }

    return links;
  }

  render() {
    const { totalPages, currentPage, maxPages } = this.props;
    if (totalPages) {
      return (
        <ul className="pagination justify-content-center">
          <li className={`page-item${currentPage === 1 && ' disabled'}`}>
            <span className="page-link" onClick={this.onSelectPage(currentPage - 1)}>
              Previous
            </span>
          </li>
          {this.pageLinks(currentPage, totalPages, maxPages)}
          <li
            className={`page-item${(currentPage === maxPages || currentPage === totalPages) &&
              ' disabled'}`}
          >
            <span className="page-link" onClick={this.onSelectPage(currentPage + 1)}>
              Next
            </span>
          </li>
        </ul>
      );
    }

    return null;
  }
}
