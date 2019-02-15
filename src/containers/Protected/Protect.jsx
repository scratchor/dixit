import React, { Component } from 'react';

class Protect extends Component {
  componentDidMount() {
    console.log(`[Protect] componentDidMount`);
  }

  render() {
    return <div>Hello from Protected!</div>;
  }
}

export default Protect;
