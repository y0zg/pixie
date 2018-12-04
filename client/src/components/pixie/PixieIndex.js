import React from 'react';
import PixieService from '../../services/PixieService';

class PixieIndex extends React.Component {
  state = { pixies: [] };

  async componentDidMount() {
    const getAllResponse = await PixieService.getAll();
    this.setState({ pixies: getAllResponse.data.pixies });
  }

  onSelectPixie = id => event => {
    this.props.history.push(`/${id}`);
  };

  onClickEdit = id => event => {
    this.props.history.push(`/${id}`);
  };

  onClickCreate = () => {
    this.props.history.push('/create');
  };

  onClickEdit = id => () => {
    this.props.history.push(`/edit/${id}`);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <button className="btn btn-light" onClick={this.onClickCreate}>Create</button>
            <ul>
              {this.state.pixies.map(pixie => (
                <li><button
                  className="btn btn-light"
                  onClick={this.onSelectPixie(pixie._id)}
                >{pixie._id}
                </button></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PixieIndex;
