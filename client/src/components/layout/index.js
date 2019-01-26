import React from 'react';
import NavBar from './NavBar';
import Router from './Router';

const Layout = () => {
  return (
    <div className="container">
      <NavBar />
      <Router />
    </div>
  );
};

export default Layout;
