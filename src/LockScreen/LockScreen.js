import React, { Component } from 'react';
import './LockScreen.css';
import * as moment from 'moment';
import background from '../img/wallpapers/adwaita-day.jpg';

class LockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      timeFormat: 'h:mm:ss',
      date: '',
      dateFormat: 'dddd, MMMM Do YYYY',
      fontSize: '5'
    };
  }

  componentWillMount() {
    this.setState({ time: moment().format(this.state.timeFormat),
                    date: moment().format(this.state.dateFormat),});
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: moment().format(this.state.timeFormat),
                      date: moment().format(this.state.dateFormat),});
    }, 1000);
  }

  render () {
    return (
      <div style={{ backgroundImage: `url("${background}")` }} className="box Lock-container">
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
