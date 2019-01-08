import React from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import Pagination from './Pagination';

class UnsplashDemo extends React.Component {
  state = { unsplashValue: '', results: [] };
  unsplash = new Unsplash({ applicationId: process.env.REACT_APP_UNSPLASH_ID });

  onSubmitUnsplash = async event => {
    event.preventDefault();
    const response = await toJson(await this.unsplash.search.photos(
      this.state.unsplashValue, 1, 30)
    );
    console.log(response);
    this.setState({ results: response.results });
  };

  onChangeUnsplash = event => {
    this.setState({ unsplashValue: event.target.value });
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
            value={this.unsplashValue}
            onChange={this.onChangeUnsplash}
          />
        </form>
        <div className="row mb-3 text-center align-items-center">
          {this.state.results.map(result => (
            <div key={result.id} className="col-4">
              <img
                src={result.urls.small}
                className="img-fluid mt-3"
                style={{ maxHeight: '360px' }}
                alt={result.description}
              />
            </div>
          ))}
        </div>
        <Pagination />
      </div>
    );
  }
}

export default UnsplashDemo;
