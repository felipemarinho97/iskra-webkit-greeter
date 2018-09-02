import React, { Component } from 'react';
import logo from './logo.svg';
import LockScreen from './LockScreen/LockScreen';
import LoginScreen from './LoginScreen/LoginScreen';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0, y: 0, width: 0, height: 0
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.outerWidth, height: window.outerHeight });
  }

  _onMouseMove(e) {
    this.setState({ x: e.screenX, y: e.screenY });
  }

  render() {
    return (
      <div  onMouseMove={this._onMouseMove.bind(this)} className="App App-container">
        <LockScreen y={this.state.y} vpHeight={this.state.height}/>
        <LoginScreen />
      </div>
    );
  }
}

export default App;
