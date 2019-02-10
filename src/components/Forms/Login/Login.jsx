import React, { Component } from 'react';

import axios from 'axios';
import { List, Button } from './LoginStyled';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { email, password } = this.state;

    e.preventDefault();

    const user = {
      email,
      password
    };

    axios
      .post('http://localhost:5000/api/users/login', user)
      .then(response => {
        console.log(response.data);
        axios.defaults.headers.common.Authorization = response.data.token;
        // axios
        //   .get('http://localhost:5000/api/users/current', {
        //     Authorization: response.data.token
        //   })
        //   .then(authUser => console.log(authUser))
        //   .catch(error => console.log(error));
      })
      .catch(err => console.log(err.response.data));
  };

  render() {
    return (
      <List onSubmit={this.onSubmit}>
        <h3>Login</h3>
        <input
          type="text"
          name="email"
          placeholder="Mail"
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.onChange}
        />
        <Button type="submit">Submit</Button>
      </List>
    );
  }
}

export default Login;
