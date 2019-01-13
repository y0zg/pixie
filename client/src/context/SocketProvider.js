import React from 'react';
import openSocket from 'socket.io-client';

const SocketContext = React.createContext();

class SocketProvider extends React.Component {
  state = {
    socket: openSocket(process.env.REACT_APP_SOCKET_IO_URI)
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
