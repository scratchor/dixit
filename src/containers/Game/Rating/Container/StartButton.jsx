import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './StartButtonStyled';
import startGame from '../../../../actions/startGame';

class StartButton extends Component {
  state = {
    click: false
  };

  handleClick = () => {
    const { click } = this.state;
    if (!click) {
      this.setState({
        click: true
      });
      const { props } = this;
      props.startGame();
      setTimeout(() => {
        alert('Now you should enter your association and click "GO!"');
      }, 2000);
    }
  };

  render() {
    const { gameStatus } = this.props;
    const { players } = this.props;
    const { master } = players;
    const { playersNumber } = players;
    const { ifGameStarted } = players;
    if (master && !ifGameStarted && playersNumber >= 3) {
      return <Wrapper onClick={this.handleClick}>START!</Wrapper>;
    }
    return <p className="status">{gameStatus}</p>;
  }
}

StartButton.propTypes = {
  players: PropTypes.PropTypes.shape({
    master: PropTypes.bool,
    ifGameStarted: PropTypes.bool
  }).isRequired,
  gameStatus: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    players: state.ratingReducer.players,
    gameStatus: state.gameStatusReducer.gameStatus
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
