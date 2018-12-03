import React from 'react';
import NavBar from './NavBar';
import Router from './Router';

const Layout = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <NavBar />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default Layout;
