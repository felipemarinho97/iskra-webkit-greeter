import React, { Component } from 'react';
import './LockScreen.css';
import * as moment from 'moment';
import background from '../img/wallpapers/adwaita-day.jpg';

if (window.moment === undefined)
  window.moment = moment

class LockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      timeFormat: 'HH:mm:ss',
      date: '',
      dateFormat: 'dddd, MMMM Do YYYY',
      fontSize: '5',
      clickXlocation: this.props.vpHeight,
      release: false
    };
    moment.locale(this.props.locale);
  }

  componentWillMount() {
    this.setState({ time: window.moment().format(this.state.timeFormat),
                    date: window.moment().format(this.state.dateFormat),});
  }

  componentDidMount() {
    this.focusLockScreen()
    setInterval(() => {
      this.setState({ time: window.moment().format(this.state.timeFormat),
                      date: window.moment().format(this.state.dateFormat),});
    }, 1000);
  }

  componentWillReceiveProps() {
    this.setState({ release: this.getRelease() });
    this.props.lkInt.setRelease = this.setRelease.bind(this)
  }

  focusLockScreen() {
    if (this.lockScreen)
      this.lockScreen.focus()
  }

  getMousePercentage(clickY) {
    let total = this.state.clickXlocation;
    if (this.isMousePressed())
      total = this.props.vpHeight;
    let percentage = parseInt((100 * this.props.y)/ total, 10);
    if (percentage > 100)
      percentage = 100;

    return percentage;
  }

  getTransformPercentage() {
    let mousePercentage = 100-this.getMousePercentage();
    if (this.isMousePressed())
        return 0;
    else if (this.state.release)
        return 110;

    return mousePercentage;
  }

  isMousePressed() {
    return Number.isNaN(this.state.clickXlocation);
  }

  getRelease() {
    if (this.getTransformPercentage() > 50) {
      return true;
    } else {
      return false;
    }
  }

  setRelease(release) {
    this.setState({ release })
    console.log(`LockScreen: Release set to ${release}`)
    this._onMouseUp()
    if (!release)
      this.focusLockScreen()
  }

  _onMouseDown(event) {
    this.setState({ clickXlocation: event.screenY });
  }

  _onMouseUp(event) {
    this.setState({ clickXlocation: NaN });
  }

  _onScroll(event) {
    console.log(event.deltaY, event.deltaX, event.deltaZ, event.deltaMode);
  }

  _handleKeyPress(event) {
    switch (event.keyCode) {
      case 13:
      case 32:
        this.setRelease(true)
        // Don't know why, but this is necessary to the release works.
        this.setState({ clickXlocation: 0 })
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <div
        tabIndex="0"
        onKeyDown={this._handleKeyPress.bind(this)}
        ref={lockScreen => { this.lockScreen = lockScreen }}
        onMouseDown={this._onMouseDown.bind(this)}
        onMouseUp={this._onMouseUp.bind(this)}
        onWheel={this._onScroll.bind(this)}
        style={{ backgroundImage: `url(${background}), url("${this.props.getWallpaper()}")`,
                 transform: `translateY(-${this.getTransformPercentage()}%)`,
                 backgroundSize: 'cover'}}
        className="box Lock-container">
        <div className="">
          <span style={{fontSize: this.state.fontSize + 'rem', color: 'white', textShadow: '2px 2px 2px #474747'}}>
            {this.state.time}
          </span><br/>
          <span style={{fontSize: this.state.fontSize/2 + 'rem', color: 'white', textShadow: '2px 2px 2px #474747'}}>
            {this.state.date}
          </span>
        </div>
      </div>
    );
  }
}

export default LockScreen;
