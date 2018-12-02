import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PixieIndex from './components/pixie/PixieIndex';
import PixieEdit from './components/pixie/PixieEdit';
import './App.css';
import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

class App extends Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_SOCKET_IO_URI) {
      this.socket = openSocket(process.env.REACT_APP_SOCKET_IO_URI);
    } else {
      throw new Error('Please set socket.io server URI in .env');
    }
  }

  componentDidMount() {
    this.socket.on('connect', () => {
      console.log('socket.io id: ', this.socket.id);
      this.socket.emit('hello', 'yo yo yo!');
      this.socket.on('disconnect', reason => console.log(`disconnect: ${reason}`));
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={PixieIndex} />
        <Route path="/:id" component={PixieEdit} />
      </div>
    );
  }
}

export default App;
