import React from 'react';
import PixieCanvas from './PixieCanvas';
import PixieService from '../../services/PixieService';

class PixieEdit extends React.Component {
  state = {
    searchQuery: ''
  };

  async componentDidMount() {
    try {
      const pixies = await PixieService.getById(42);
      console.log(pixies);
    } catch (error) {
      console.error(error);
    }
  }

  submitForm = event => {
    event.preventDefault();
    this.state.searchQuery && console.log('submit form:', this.state.searchQuery);
    this.setState({ searchQuery: '' });
  }

  searchQueryUpdate = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Pixie</h1>
            <form onSubmit={this.submitForm}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="searchQuery"
                  placeholder="search..."
                  value={this.state.searchQuery}
                  onChange={this.searchQueryUpdate}
                />
              </div>
            </form>
          </div>
          <div className="col-md-8 col-lg-9">
            <PixieCanvas
              width="1000"
              height="1000"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PixieEdit;
