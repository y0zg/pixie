import React from 'react';

class PixieIndex extends React.Component {
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
            <button className="btn btn-primary" onClick={this.onClickCreate}>Create</button>
            <button className="btn btn-primary" onClick={this.onClickEdit(42)}>Edit 42</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PixieIndex;
