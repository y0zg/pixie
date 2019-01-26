import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <img
          src={logo}
          width="30"
          height="30"
          className="rounded-circle d-inline-block align-top mr-1"
          alt=""
        />
        Pixie
      </Link>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/create">
              Create
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
