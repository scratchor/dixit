import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './RatingStyled';

import PlayerInfo from './Container/PlayerInfo';
import StartButton from './Container/StartButton';
import avatar from './Container/Components/Avatar';

class Rating extends Component {
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
