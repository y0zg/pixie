import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

class App extends Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_SOCKET_IO_URI) {
      this.state = { socket: openSocket(process.env.REACT_APP_SOCKET_IO_URI) };
    } else {
      throw new Error('Please set socket.io server URI in .env');
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
