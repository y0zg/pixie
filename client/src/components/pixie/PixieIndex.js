import React from 'react';

class PixieIndex extends React.Component {
  onClickEdit = id => event => {
    this.props.history.push(`/${id}`);
  };

  onClickeCreate = event => {
    this.props.history.push('/create');
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col">
              <button className="btn btn-primary" onClick={this.onClickeCreate}>Create</button>
            </div>
          </div>
        </div>

        {/* <button className="btn btn-primary" onClick={this.onClickEdit(42)}>pixie 42</button>
        <button className="btn btn-primary" onClick={this.onClickeCreate}>Create</button> */}

      </>
    );
  }
}

export default PixieIndex;
