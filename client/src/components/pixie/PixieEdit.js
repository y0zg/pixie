import React from 'react';
import Pixie from './Pixie';
import PixieCanvas from './PixieCanvas';
import PixieService from '../../services/PixieService';

class PixieEdit extends React.Component {
  state = {
    searchQuery: '',
    pixie: new Pixie(25, 25)
  };

  async componentDidMount() {
    try {
      const pixie = await PixieService.getById(42);
      console.log(pixie);
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

  updatePixie = pixie => {
    this.setState({ pixie });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
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
              pixie={this.state.pixie}
              updatePixie={this.updatePixie}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PixieEdit;
