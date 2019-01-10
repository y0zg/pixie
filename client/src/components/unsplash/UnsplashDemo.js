import React from 'react';
import Pagination from './Pagination';
import PixieService from '../../services/PixieService';

class UnsplashDemo extends React.Component {
  state = { query: '', results: [], selectedImg: null };

  onSubmitUnsplash = async event => {
    event.preventDefault();
    const response = await PixieService.search(this.state.query, 1, 30);
    this.setState({ results: response.results, selectedImg: null });
  };

  onChangeUnsplash = event => {
    this.setState({ query: event.target.value });
  };

  onClickImage = selectedImg => event => {
    event.preventDefault();
    this.setState({ selectedImg });
  };

  render() {
    return (
      <div className="container">
        <h1>Unsplash Demo</h1>
        <form onSubmit={this.onSubmitUnsplash}>
          <input
            type="text"
            className="form-control"
            placeholder="search photos"
            value={this.query}
            onChange={this.onChangeUnsplash}
          />
        </form>
        {this.state.selectedImg && (
          <img
            className="img-fluid mt-3"
            src={this.state.selectedImg.urls.full}
            alt={this.state.selectedImg.description}
            onClick={() => this.setState({ selectedImg: null })}
          />
        )}
        <div className="row mb-3 text-center align-items-center">
          {this.state.results.map(result => (
            <div key={result.id} className="col-4">
              <a href="/unsplash" onClick={this.onClickImage(result)}>
                <img
                  src={result.urls.small}
                  className="img-fluid mt-3"
                  style={{ maxHeight: '360px' }}
                  alt={result.description}
                />
              </a>
            </div>
          ))}
        </div>
        <Pagination />
      </div>
    );
  }
}

export default UnsplashDemo;
