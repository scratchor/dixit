import React, { Component } from 'react';

class StartPage extends Component {
  componentDidMount() {
    console.log(`[StartPage] componentDidMount`);
  }

  render() {
    return <div>Hello from StartPage!</div>;
  }
}

export default StartPage;
