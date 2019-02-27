import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './RatingStyled';

import PlayerInfo from './Container/PlayerInfo';
import StartButton from './Container/StartButton';

class Rating extends Component {
  componentDidUpdate() {
    const { players } = this.props;
    const { master, playersNumber, ifGameStarted } = players;
    if (master && !ifGameStarted && playersNumber === 3) {
      setTimeout(() => {
        return alert(
          'Hello! We already have free players in the room! And now you can start the game! ' +
            'To start - click the button "START!" at the upper left corner of the screen!'
        );
      }, 1000);
    }
  }

  render() {
    const { players } = this.props;
    const playerInfoList = players.avatar.map((e, i) => {
      return (
        <PlayerInfo
          key={players.socketsId[i]}
          avatar={e}
          name={players.username[i]}
          status="everythig is oook"
        />
      );
    });

    return (
      <Wrapper>
        <StartButton />
        {playerInfoList}
      </Wrapper>
    );
  }
}

Rating.propTypes = {
  players: PropTypes.PropTypes.shape({
    playersNumber: PropTypes.number,
    type: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => {
  return {
    players: state.ratingReducer.players
  };
};

export default connect(mapStateToProps)(Rating);
