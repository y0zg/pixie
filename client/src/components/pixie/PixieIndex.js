import React from 'react';

class PixieIndex extends React.Component {
  onClickEdit = id => event => {
    this.props.history.push(`/${id}`);
  };

  render() {
    return (
      <button className="btn btn-primary" onClick={this.onClickEdit(42)}>pixie 42</button>
    );
  }
}

export default PixieIndex;
