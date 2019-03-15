import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './RatingStyled';

import PlayerInfo from './Container/PlayerInfo';
import StartButton from './Container/StartButton';
import { changeGameStatus } from '../../../actions/gameStatus';
import infoAction from '../../../actions/infoMasterStartActions';

class Rating extends Component {
  state = {
    gameStatus: 'Waiting till minimum three players join the game...'
  };

  componentDidUpdate() {
    const { players } = this.props;
    const { changeGameStatus, infoAction } = this.props;
    const {
      master,
      playersNumber,
      ifGameStarted,
      masterMadeStep,
      infoMasterAboutStart
    } = players;
    if (
      !infoMasterAboutStart &&
      playersNumber === 3 &&
      master &&
      !ifGameStarted
    ) {
      infoAction();
    }
    const changeStatus = () => {
      const { gameStatus } = this.state;
      if (!ifGameStarted && playersNumber >= 3) {
        if (
          gameStatus !== `Waiting till ${players.username[0]} starts the game..`
        ) {
          changeGameStatus(
            `Waiting till ${players.username[0]} starts the game..`
          );
          this.setState({
            gameStatus: `Waiting till ${players.username[0]} starts the game..`
          });
        }
      } else if (ifGameStarted && playersNumber >= 3 && !masterMadeStep) {
        if (
          gameStatus !==
          `Waiting till ${players.username[0]} enter assosiation..`
        ) {
          changeGameStatus(
            `Waiting till ${players.username[0]} enter assosiation..`
          );
          this.setState({
            gameStatus: `Waiting till ${
              players.username[0]
            } enter assosiation..`
          });
        }
      } else if (ifGameStarted && playersNumber >= 3 && masterMadeStep) {
        if (
          gameStatus !==
          `Waiting till all players put card similiar with assosiation..`
        ) {
          changeGameStatus(
            `Waiting till all players put card similiar with assosiation..`
          );
          this.setState({
            gameStatus: `Waiting till all players put card similiar with assosiation..`
          });
        }
      }
    };
    changeStatus();
  }

  render() {
    const { players } = this.props;
    const playerInfoList = players.avatar.map((e, i) => {
      return (
        <PlayerInfo
          key={players.socketsId[i]}
          avatar={e}
          name={players.username[i]}
          addScore={players.addScore[i]}
          id={i}
          score={players.score[i]}
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
  }).isRequired,
  changeGameStatus: PropTypes.func.isRequired,
  infoAction: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    players: state.ratingReducer.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeGameStatus: status => dispatch(changeGameStatus(status)),
    infoAction: startGameInfo => dispatch(infoAction(startGameInfo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating);
