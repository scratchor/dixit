import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './StartButtonStyled';
import startGame from '../../../../actions/startGame';

class StartButton extends Component {
  handleClick = () => {
    const { props } = this;
    props.startGame();
    setTimeout(() => {
      alert('Now you should enter your association and click "GO!"');
    }, 2000);
  };

  render() {
    const { players } = this.props;
    const { master } = players;
    const { playersNumber } = players;
    const { ifGameStarted } = players;
    if (master && !ifGameStarted && playersNumber >= 3) {
      return <Wrapper onClick={this.handleClick}>START!</Wrapper>;
    }
    return null;
  }
}

StartButton.propTypes = {
  players: PropTypes.PropTypes.shape({
    master: PropTypes.bool,
    ifGameStarted: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => {
  return {
    players: state.ratingReducer.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch(startGame())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartButton);
