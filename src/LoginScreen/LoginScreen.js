import React, { Component } from 'react';
import { Form, Input, Icon, Avatar } from 'antd';
import './LoginScreen.css';
// import background from '../img/wallpapers/adwaita-day.jpg';
import background from '../img/wallpapers/ColdWarm.jpg';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showPassForm: false
    };

  }

  handleChangeUser(event) {
    if (event.key === "Enter") {
      this.setState({ showPassForm: true });
      let ret = window.lightdm.start_authentication(this.state.username);
      console.log(ret);
    }
    this.setState({ username: event.target.value });

  }

  handleChangePass(event) {
    if (event.key === "Enter")
      this.setState({ showPassForm: true });
    this.setState({ password: event.target.value });

  }

  render() {
    return (
      <div
        style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
        className="LoginScreen-container box blur-bgimage">
        <div
          className="status-bar">
          arcan-PC
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Avatar
            style={{margin: '1rem'}}
            size={96}
            icon={this.state.username ? undefined : "user"}>{this.state.username.toUpperCase()[0]}</Avatar>
          <Form.Item>
              {this.state.showPassForm ? (
              <Input
                className="login-input"
                onChange={this.handleChangePass.bind(this)}
                onKeyPress={this.handleChangePass.bind(this)}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Senha" type="password" value={this.state.password} />) :
                (
                  <Input
                    className="login-input"
                    onChange={this.handleChangeUser.bind(this)}
                    onKeyPress={this.handleChangeUser.bind(this)}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Usuário" type="text" value={this.state.username}/>
                )
              }
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginScreen;
