import React from 'react';
import openSocket from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

const SocketContext = React.createContext();

export default class SocketProvider extends React.Component {
  state = {
    socket: openSocket(process.env.REACT_APP_SOCKET_IO_URI)
  };

  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    return (
      <SocketContext.Provider value={this.state.socket}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export const withSocket = Component => {
  return function contextComponent(props) {
    return (
      <SocketContext.Consumer>
        {socket => <Component {...props} socket={socket} />}
      </SocketContext.Consumer>
    );
  };
};
