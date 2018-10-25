import React, { Component } from 'react';
import { Form, Input, Icon, Avatar, Menu, Dropdown, Button } from 'antd';
import './LoginScreen.css';
import * as moment from 'moment';
import background from '../img/wallpapers/adwaita-day.jpg';
// import background from '/usr/share/backgrounds/gnome/ColdWarm.jpg';

async function wait(fun, time, ...args) {
  function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  await timeout(time)
  return fun(...args);
}

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showPassForm: false,
      time: '',
      timeFormat: 'HH:mm',
      isInAuth: false
    };

    window.lightdm.authenticate();

  }

  componentWillMount() {
    this.setState({ time: moment().format(this.state.timeFormat) });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: moment().format(this.state.timeFormat) });
    }, 1000);
  }

  submitUser(username) {
    window.lightdm.respond(username);
    if(username.length > 0){
      this.setState({ showPassForm: true });
    }else{
      document.getElementById('username').style.border = "2px solid red";
      document.getElementById('username-warning').style.display = 'block';
      document.getElementById('username-warning').innerText = 'Username Cannot be Empty';
    }
  }

  submitPass(password) {
    this.setState({ showPassForm: true });
    window.lightdm.respond(password);
    if(password.length > 0){
      this.startDefaultSession()
    }else{
      document.getElementById('password').style.border = "2px solid red";
      document.getElementById('password-warning').style.display = 'block';
      document.getElementById('password-warning').innerHTML = 'Password Cannot be Empty';
    }
  }

  handleChangeUser(event) {
    this.setState({ username: event.target.value });
    if(event.target.value.length < 1){
      document.getElementById('username').style.border = "2px solid red";
    }else{
      document.getElementById('username').style.border = "2px solid green";
      if (event.key === "Enter") {
        this.submitUser(this.state.username)
      }
    }

  }

  handleChangePass(event) {
    this.setState({ password: event.target.value });
    if(event.target.value.length < 1){
      document.getElementById('password').style.border = "2px solid red";
    }else{
      document.getElementById('password').style.border = "2px solid green";
      if (event.key === "Enter") {
        this.submitPass(this.state.password)
      } else if (event.keyCode === 27) {
        this.cancelAuthentication();
      }
    }
  }

  cancelAuthentication() {
    window.lightdm.cancel_authentication();
    this.setState({ showPassForm: false, username: '', password: '' });
    this.setState({  isInAuth: false });
    window.lightdm.authenticate();
  }

  startDefaultSession(count = 0) {
    if (window.lightdm.is_authenticated) {
      window.lightdm.start_session()
    } else if (count < 5) {
      this.setState({ isInAuth: true })
      wait(this.startDefaultSession.bind(this), (2**count)*1000, count + 1)
    } else {
      this.cancelAuthentication();
    }

  }

  render() {
    const menu = (
      <Menu>
        {window.lightdm.can_hibernate ?
          (<Menu.Item key="0">
          <a href="#" onClick={() => window.lightdm.hibernate()}><Icon type="pause-circle-o" /> Hibernar</a>
        </Menu.Item>) : ""}
        {window.lightdm.can_suspend ?
          (<Menu.Item key="1">
          <a href="#" onClick={() => window.lightdm.suspend()}><Icon type="minus-circle-o" /> Suspender</a>
        </Menu.Item>) : ""}
        {window.lightdm.can_restart ?
          (<Menu.Item key="2">
          <a href="#" onClick={() => window.lightdm.restart()}><Icon type="reload" /> Reiniciar</a>
        </Menu.Item>) : ""}
        {window.lightdm.can_shutdown ?
          (<Menu.Item key="3">
          <a href="#" onClick={() => window.lightdm.shutdown()}><Icon type="poweroff" /> Desligar</a>
        </Menu.Item>) : ""}

        <Menu.Divider />
        <Menu.Item key="4"><a href="#" onClick={this.props.lock}><Icon type="lock" /> Bloquear</a></Menu.Item>
      </Menu>
    )

    return (
      <div
        style={{ backgroundImage: `url("${this.props.getWallpaper()}"), url(${this.props.getWallpaper()})`, backgroundSize: 'cover' }}
        className="LoginScreen-container box blur-bgimage">
        <div
          className="status-bar">
          <div className="status-bar-item-1  menu-p" style={{ textAlign: 'left' }}>{window.lightdm.hostname}</div>
          <div className="status-bar-item-2  menu-p">{this.state.time}</div>
          <div className="status-bar-item-1" style={{ textAlign: 'right' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <span className="power-dropdown menu-p" href="#">
              <Icon type="poweroff" /> <Icon type="down" />
            </span>
          </Dropdown>
          </div>
        </div>
        <Form style={{ minWidth: !this.state.isInAuth ? '375px' : '0px', minHeight: !this.state.isInAuth ? '290px' : '0px' }} className="login-form">
          <Avatar
            style={{margin: '2rem', fontSize: 48}}
            size={96}
            icon={this.state.username ? undefined : "user"}>{this.state.username.toUpperCase()[0]}</Avatar><br/>
          {!this.state.isInAuth ?
            (<Form.Item>
              {this.state.showPassForm ? (
                  <div>
                  <span style={{ fontSize: '1.5rem', textAlign: 'left' }} className="font-white">{this.state.username}</span>
                  <br/>
                  <label id="password-warning"></label>
                  <Input.Group compact>
                    <Input
                    required
                      autoFocus
                      style={{ width: '80%' }}
                      className="login-input"
                      id="password"
                      onChange={this.handleChangePass.bind(this)}
                      onKeyPress={this.handleChangePass.bind(this)}
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Senha" type="password" value={this.state.password} />
                    <Button
                      onClick={() => this.submitPass(this.state.password)}
                      style={{ width: '15%' }} type="primary"><Icon type="right" /></Button>
                  </Input.Group>
                  </div>

                ) :
                (
                  <Input.Group compact>
                  <label id="username-warning"></label>
                  <br/>
                    <Input
                       autofocus
                      style={{ width: '80%' }}
                      className="login-input"
                      id="username"
                      onChange={this.handleChangeUser.bind(this)}
                      onKeyPress={this.handleChangeUser.bind(this)}
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Usuário" type="text" value={this.state.username}/>
                    <Button
                      onClick={() => this.submitUser(this.state.username)}
                      style={{ width: '15%' }} type="primary"><Icon type="right" /></Button>
                  </Input.Group>
                )
              }
          </Form.Item>) :
          (
            <Icon className="font-white" style={{ fontSize: '25px' }} type="loading" />
          )
        }
        </Form>
      </div>
    );
  }
}

export default LoginScreen;
