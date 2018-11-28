import React, { Component } from 'react';
import socket from 'socket.io-client';
import './App.css';

class App extends Component {
  state = {data: '- - -'}
  constructor(props) {
  super(props);
  let id = Number(window.location.hash.split('').splice(1).join(''))
  //console.log(window.location.host)
  this.socket = socket(window.location.host);
  this.socket.on('connection', console.log('connected'))
  this.socket.on('data', (data) => {this.setState({data: data[id]}); console.log(data)})
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.data}</h1>
      </div>
    );
  }
}

export default App;
