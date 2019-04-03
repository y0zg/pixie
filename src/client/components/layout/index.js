import React from 'react';

import NavBar from './NavBar';
import Router from '../router';

export default function Layout() {
  return (
    <div className="container">
      <NavBar />
      <Router />
    </div>
  );
}
