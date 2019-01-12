import React from 'react';
import PixieService from '../../services/PixieService';
import PixieCanvas from './PixieCanvas';
import Pixie from '../../models/Pixie';
import { withSocket } from '../../context/SocketProvider';

// TODO:
// - pagination
class PixieIndex extends React.Component {
  state = { pixies: [] };

  async componentDidMount() {
    const getAllResponse = await PixieService.getAll();
    this.setState({ pixies: getAllResponse.data.pixies.reverse() });
    this.props.socket.on('updatePixie', this.updatePixie);
  }

  componentWillUnmount() {
    this.props.socket.off('updatePixie');
  }

  onSelectPixie = id => () => {
    this.props.history.push(`/${id}`);
  };

  onClickEdit = id => () => {
    this.props.history.push(`/${id}`);
  };

  onClickCreate = () => {
    this.props.history.push('/create');
  };

  onClickEdit = id => () => {
    this.props.history.push(`/${id}`);
  };

  onClickDelete = id => async () => {
    await PixieService.delete(id);
    this.setState({ pixies: this.state.pixies.filter(pixie => pixie._id !== id) });
  };

  updatePixie = updatedPixie => {
    this.setState({
      pixies: this.state.pixies.map(pixie => {
        return pixie._id === updatedPixie.id
          ? Pixie.merge(pixie, updatedPixie.diff)
          : pixie;
      })
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.pixies.map(pixie => (
            <div key={pixie._id} className="col-md-4 col-lg-3">
              <div className="card mb-3">
                <div className="card-header">
                  <div className="float-right">
                    <button type="button" className="close" onClick={this.onClickDelete(pixie._id)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
                <div className="card-body" onClick={this.onClickEdit(pixie._id)}>
                  <PixieCanvas pixie={Pixie.copy(pixie)} />
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={this.onClickEdit(pixie._id)}
                  >
                    Edit
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div >
    );
  }
}

export default withSocket(PixieIndex);
