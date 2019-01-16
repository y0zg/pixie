import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  static propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    maxPages: PropTypes.number.isRequired,
  };

  static propDefaults = {
    totalPages: 0,
  };

  setCurrentPage = currentPage => event => {
    event.preventDefault();
    if (currentPage > 0 && currentPage <= this.props.maxPages) {
      this.props.setCurrentPage(currentPage);
    }
  };

  render = () => {
    const { totalPages, currentPage, maxPages } = this.props;

    const pageLinks = () => {
      const links = [];
      for (let page = 1; page <= totalPages && page <= maxPages; page++) {
        links.push((
          <li
            key={`link${page}`}
            className={`page-item${page === currentPage ? ' active' : ''}`}
          >
            <a
              className="page-link"
              onClick={this.setCurrentPage(page)}
              href="/"
            >
              {page}
            </a>
          </li>
        ));
      }

      return links;
    }

    if (totalPages) {
      return (
        <ul className="pagination justify-content-center">
          <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
            <span className="page-link" onClick={this.setCurrentPage(currentPage - 1)}>Previous</span>
          </li>
          {pageLinks()}
          <li className={`page-item${currentPage === this.props.maxPages ? ' disabled' : ''}`}>
            <span className="page-link" onClick={this.setCurrentPage(currentPage + 1)}>Next</span>
          </li>
        </ul>
      );
    }

    return null;
  }
}

export default Pagination;
