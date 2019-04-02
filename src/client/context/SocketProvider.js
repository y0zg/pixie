import React, { Component } from 'react';
import openSocket from 'socket.io-client';

const SocketContext = React.createContext();

class SocketProvider extends Component {
  state = {
    socket:
      process.env.NODE_ENV === 'production' ? openSocket() : openSocket('http://localhost:8080'),
  };

  componentWillUnmount = () => {
    this.state.socket.close();
  };

  render = () => {
    return (
      <SocketContext.Provider value={this.state.socket}>
        {this.props.children}
      </SocketContext.Provider>
    );
  };
}

const withSocket = Component => {
  return props => {
    return (
      <SocketContext.Consumer>
        {socket => <Component {...props} socket={socket} />}
      </SocketContext.Consumer>
    );
  };
};

export { withSocket };
export default SocketProvider;
