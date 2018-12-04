import React from 'react';
import NavBar from './NavBar';
import Router from './Router';

const Layout = () => {
  return (
    <div className="container">
      <div className="row">
        <NavBar />
      </div>
      <div className="row">
        <Router />
      </div>
    </div>
  );
};

export default Layout;
