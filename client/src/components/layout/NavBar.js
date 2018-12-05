import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <img
          src={logo}
          width="30"
          height="30"
          className="rounded-circle d-inline-block align-top mr-1"
          alt=""
        />
        pixie
      </Link>
    </nav>
  );
};

export default NavBar;
