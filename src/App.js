import React, { Component } from 'react';
import logo from './logo.svg';
import mock from './js/mock2'
import LockScreen from './LockScreen/LockScreen';
import LoginScreen from './LoginScreen/LoginScreen';
import './App.css';

const WALLPAPERS_DIR = "/usr/share/lightdm-webkit/themes/iskra-webkit-greeter/src/img/wallpapers"
const WALLPAPERS_LIST = window.theme_utils.dirlist(WALLPAPERS_DIR);
const WALLPAPER_INDEX = getRandomArbitrary(0, WALLPAPERS_LIST.length)
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function getRandomWallpaper() {
  return WALLPAPERS_LIST[WALLPAPER_INDEX]
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0, y: 0, width: 0, height: 0, lkInt: {},focus:false,
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
    this.setState({ x: e.screenX, y: e.screenY, focus:true });
  }

  render() {
    return (
      <div  onMouseMove={this._onMouseMove.bind(this)} className="App App-container">
        <LockScreen lkInt={this.state.lkInt} getWallpaper={getRandomWallpaper} y={this.state.y} vpHeight={this.state.height}/>
        <LoginScreen lock={() => this.state.lkInt.setRelease(false)} getWallpaper={getRandomWallpaper} focus={this.state.focus}/>
      </div>
    );
  }
}

export default App;
