import React, { Component } from 'react';
import logo from './logo.svg';
import LockScreen from './LockScreen/LockScreen';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App App-container">
      <LockScreen />
      </div>
    );
  }
}

export default App;
