import React, { Component } from 'react';
import SweetAlert from '../common/SweetAlert';

import Pixie from '.';
import PixieService from '../../services/PixieService';
import PixieCanvas from './PixieCanvas';
import { withSocket } from '../../context/SocketProvider';

export default withSocket(
  class PixieGallery extends Component {
    state = { pixies: [] };

    async componentDidMount() {
      const getAllResponse = await PixieService.getAll();
      this.setState({ pixies: getAllResponse.data.pixies.reverse() });
      this.props.socket.on('createPixie', this.addPixieToGallery);
      this.props.socket.on('updatePixie', this.updatePixie);
      this.props.socket.on('deletePixie', this.removePixieFromGallery);
    }

    componentWillUnmount() {
      this.props.socket.off('createPixie');
      this.props.socket.off('updatePixie');
      this.props.socket.off('deletePixie');
    }

    addPixieToGallery = pixie => {
      this.setState({ pixies: [pixie, ...this.state.pixies] });
    };

    removePixieFromGallery = id => {
      this.setState({ pixies: this.state.pixies.filter(pixie => pixie._id !== id) });
    };

    onSelectPixie = id => () => {
      this.props.history.push(`/${id}`);
    };

    onClickCreate = () => {
      this.props.history.push('/create');
    };

    onClickEdit = id => () => {
      this.props.history.push(`/edit/${id}`);
    };

    onClickDelete = id => async () => {
      const deleteConfirmation = await SweetAlert.fire({
        title: 'Are you sure?',
        text: 'You will not be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-danger mr-2',
        cancelButtonClass: 'btn btn-secondary',
        confirmButtonText: 'Yes, delete it!',
      });

      if (deleteConfirmation.value) {
        this.deletePixie(id);
      }
    };

    async deletePixie(id) {
      try {
        await PixieService.delete(id);
        this.removePixieFromGallery(id);
        SweetAlert.fire('Deleted!', 'Your pixie has been deleted.', 'success');
      } catch (error) {
        SweetAlert.fire(error.name, error.message, 'error');
        console.error(`${error.name}: ${error.message}`);
      }
    }

    updatePixie = updatedPixie => {
      this.setState({
        pixies: this.state.pixies.map(pixie =>
          pixie._id === updatedPixie.id ? Pixie.merge(pixie, updatedPixie.diff) : pixie
        ),
      });
    };

    render() {
      return (
        <div className="container">
          <div className="row">
            {this.state.pixies.map(pixie => (
              <div key={pixie._id} className="col-12 col-md-4 col-lg-3">
                <div className="card mb-3">
                  <div className="card-header">
                    <div className="float-right">
                      <button
                        type="button"
                        className="close"
                        onClick={this.onClickDelete(pixie._id)}
                      >
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
        </div>
      );
    }
  }
);
