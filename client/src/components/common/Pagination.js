import React from 'react';

const Pagination = props => {
  return (
    <ul className="pagination justify-content-center">
      <li className="page-item disabled"><span className="page-link">Previous</span></li>
      <li className="page-item"><a className="page-link" href="/">1</a></li>
      <li className="page-item active"><a className="page-link" href="/">2</a></li>
      <li className="page-item"><a className="page-link" href="/">3</a></li>
      <li className="page-item"><span className="page-link">Next</span></li>
    </ul>
  );
};

export default Pagination;
