import React, { Component } from 'react';
import { Form, Input, Icon, Avatar, Menu, Dropdown, Button } from 'antd';
import './LoginScreen.css';
import * as moment from 'moment';
import { FormattedMessage } from 'react-intl';

async function wait(fun, time, ...args) {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await timeout(time);
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
      isInAuth: false,
      validateStatus: '',
      warningText: ''
    };

    window.lightdm.authenticate();

    this.handleKeyPress = this.handleKeyPress.bind(this);
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
    if (username) {
      window.lightdm.respond(username);
      this.setState({
        showPassForm: true,
        validateStatus: '',
        warningText: ''
      });
    } else {
      this.setState({
        validateStatus: 'warning',
        warningText: <FormattedMessage id="LoginScreen.UsernameWarning" />
      });
    }
  }

  focusLoginScreen() {
    if (this.loginScreen) {
      this.loginScreen.focus();
    }
  }

  submitPass(password) {
    if (password) {
      this.setState({
        showPassForm: true,
        validateStatus: '',
        warningText: ''
      });
      window.lightdm.respond(password);
      this.startDefaultSession();
    } else {
      this.setState({
        validateStatus: 'warning',
        warningText: <FormattedMessage id="LoginScreen.PasswordWarning" />
      });
    }
  }

  handleChangeUser(event) {
    if (event.key === 'Enter') {
      this.submitUser(this.state.username);
    }

    this.setState({ username: event.target.value });
  }

  handleChangePass(event) {
    if (event.key === 'Enter') {
      this.submitPass(this.state.password);
    }

    this.setState({ password: event.target.value });
  }

  handleKeyPress(event) {
    if (event.keyCode === 27) {
      // ESC
      this.cancelAuthentication();
    }
  }

  cancelAuthentication() {
    window.lightdm.cancel_authentication();
    this.setState({ showPassForm: false, username: '', password: '' });
    this.setState({ isInAuth: false });
    window.lightdm.authenticate();
  }

  startDefaultSession(count = 0) {
    if (window.lightdm.is_authenticated) {
      window.lightdm.start_session();
    } else if (count === 0 || (count < 5 && this.state.isInAuth)) {
      this.setState({ isInAuth: true });
      this.focusLoginScreen();
      wait(this.startDefaultSession.bind(this), 2 ** count * 1000, count + 1);
    } else {
      this.cancelAuthentication();
    }
  }

  render() {
    // to inject formated messages into components, we need to us a function like this:
    const oUserInput = (
      <FormattedMessage id="LoginScreen.UserPlaceholder">
        {UserPlaceholder => (
          <Input
            style={{ width: '80%' }}
            className="login-input"
            onChange={this.handleChangeUser.bind(this)}
            onKeyPress={this.handleChangeUser.bind(this)}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={UserPlaceholder}
            type="text"
            value={this.state.username}
          />
        )}
      </FormattedMessage>
    );

    const oPasswordInput = (
      <FormattedMessage id="LoginScreen.PasswordPlaceholder">
        {PasswordPlaceholder => (
          <Input
            autoFocus
            style={{ width: '80%' }}
            className="login-input"
            onChange={this.handleChangePass.bind(this)}
            onKeyPress={this.handleChangePass.bind(this)}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder={PasswordPlaceholder}
            type="password"
            value={this.state.password}
          />
        )}
      </FormattedMessage>
    );

    const menu = (
      <Menu>
        {window.lightdm.can_hibernate ? (
          <Menu.Item key="0">
            <a onClick={() => window.lightdm.hibernate()}>
              <Icon type="pause-circle-o" />{' '}
              <FormattedMessage id="LoginScreen.Hibernate" />
            </a>
          </Menu.Item>
        ) : (
          ''
        )}
        {window.lightdm.can_suspend ? (
          <Menu.Item key="1">
            <a onClick={() => window.lightdm.suspend()}>
              <Icon type="minus-circle-o" />{' '}
              <FormattedMessage id="LoginScreen.Suspend" />
            </a>
          </Menu.Item>
        ) : (
          ''
        )}
        {window.lightdm.can_restart ? (
          <Menu.Item key="2">
            <a onClick={() => window.lightdm.restart()}>
              <Icon type="reload" />{' '}
              <FormattedMessage id="LoginScreen.Restart" />
            </a>
          </Menu.Item>
        ) : (
          ''
        )}
        {window.lightdm.can_shutdown ? (
          <Menu.Item key="3">
            <a onClick={() => window.lightdm.shutdown()}>
              <Icon type="poweroff" />{' '}
              <FormattedMessage id="LoginScreen.Shutdown" />
            </a>
          </Menu.Item>
        ) : (
          ''
        )}

        <Menu.Divider />
        <Menu.Item key="4">
          <a onClick={this.props.lock}>
            <Icon type="lock" /> <FormattedMessage id="LoginScreen.Lock" />
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div
        tabIndex="0"
        style={{
          backgroundImage: `url("${this.props.getWallpaper()}"), url(${this.props.getWallpaper()})`,
          backgroundSize: 'cover'
        }}
        className="LoginScreen-container box blur-bgimage"
        onKeyDown={this.handleKeyPress}
        ref={loginScreen => {
          this.loginScreen = loginScreen;
        }}
      >
        <div className="status-bar">
          <div
            className="status-bar-item-1  menu-p"
            style={{ textAlign: 'left' }}
          >
            {window.lightdm.hostname}
          </div>
          <div className="status-bar-item-2  menu-p">{this.state.time}</div>
          <div className="status-bar-item-1" style={{ textAlign: 'right' }}>
            <Dropdown overlay={menu} trigger={['click']}>
              <span className="power-dropdown menu-p" href="#">
                <Icon type="poweroff" /> <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        </div>
        <Form
          style={{
            minWidth: !this.state.isInAuth ? '375px' : '0px',
            minHeight: !this.state.isInAuth ? '290px' : '0px'
          }}
          className="login-form"
        >
          <Avatar
            style={{ margin: '2rem', fontSize: 48 }}
            size={96}
            icon={this.state.username ? undefined : 'user'}
          >
            {this.state.username.toUpperCase()[0]}
          </Avatar>
          <br />
          {!this.state.isInAuth ? (
            <Form.Item
              validateStatus={this.state.validateStatus}
              help={this.state.warningText}
            >
              {this.state.showPassForm ? (
                <div>
                  <span
                    style={{ fontSize: '1.5rem', textAlign: 'left' }}
                    className="font-white"
                  >
                    {this.state.username}
                  </span>
                  <Input.Group compact>
                    {oPasswordInput}
                    <Button
                      onClick={() => this.submitPass(this.state.password)}
                      style={{ width: '15%' }}
                      type="primary"
                    >
                      <Icon type="right" />
                    </Button>
                  </Input.Group>
                </div>
              ) : (
                <Input.Group compact>
                  {oUserInput}
                  <Button
                    onClick={() => this.submitUser(this.state.username)}
                    style={{ width: '15%' }}
                    type="primary"
                  >
                    <Icon type="right" />
                  </Button>
                </Input.Group>
              )}
            </Form.Item>
          ) : (
            <Icon
              className="font-white"
              style={{ fontSize: '25px' }}
              type="loading"
            />
          )}
        </Form>
      </div>
    );
  }
}

export default LoginScreen;
