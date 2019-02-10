import React, { Component } from 'react';
import axios from 'axios';

import { List, Button } from './RegisterStyled';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { name, email, password, password2 } = this.state;

    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      password2
    };

    axios
      .post('http://localhost:5000/api/users/register', newUser)
      .then(response => console.log(response))
      .catch(err => console.log(err.response.data));
  };

  render() {
    const { errors } = this.state;

    return (
      <List onSubmit={this.onSubmit}>
        <h3>New Account?</h3>
        <input
          type="text"
          name="name"
          placeholder="Username"
          onChange={this.onChange}
        />
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
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          onChange={this.onChange}
        />
        <Button type="submit">Submit</Button>
      </List>
    );
  }
}

export default Register;
