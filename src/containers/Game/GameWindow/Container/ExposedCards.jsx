import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './ExposedCardsStyled';
import Card from './ExposedCardsComponents/Card';
import { changeGameStatus } from '../../../../actions/gameStatus';
import guessNarratorCard from '../../../../actions/guessNarratorCard';

class ExposedCards extends Component {
  componentDidUpdate() {
    const { props } = this.props;
    const { playersNumber, changeGameStatus, masterMadeStep } = this.props;
    if (masterMadeStep && props.length === playersNumber) {
      let exposedCards = document.querySelectorAll('.exposedCard');
      let time = 0;
      exposedCards = [].slice.call(exposedCards);
      exposedCards.forEach(e => {
        time += 1000;
        setTimeout(function animate() {
          e.classList.add('animateExposed');
        }, time);
      });
      setTimeout(() => {
        changeGameStatus(`Waiting till all players guess the narrator card..`);
      }, 2000);
    }
  }

  handleImageLoaded = e => {
    const div = e.target.parentElement.parentElement;
    div.classList.remove('hidden');
  };

  handleClick = e => {
    const { guessNarratorCard, master, socketId } = this.props;
    let selecteds = document.querySelectorAll('.selected');
    if (selecteds.length > 0) {
      selecteds = [].slice.call(selecteds);
      selecteds.forEach(e => {
        e.classList.remove('selected');
      });
    }
    e.currentTarget.classList.add('selected');
    guessNarratorCard(e.target.src, master, socketId);
  };

  render() {
    const { props } = this.props;

    const ExposedCards =
      // eslint-disable-next-line no-nested-ternary
      props.length > 0
        ? props.map(e => {
            return (
              <Card
                src={e}
                key={e}
                loadImages={this.handleImageLoaded}
                click={this.handleClick}
              />
            );
          })
        : null;

    return (
      <Wrapper>
        <div className="cardsField">{ExposedCards}</div>
      </Wrapper>
    );
  }
}

ExposedCards.defaultProps = { length: 0, socketId: null };

ExposedCards.propTypes = {
  props: PropTypes.arrayOf(PropTypes.string).isRequired,
  playersNumber: PropTypes.number.isRequired,
  length: PropTypes.number,
  master: PropTypes.bool.isRequired,
  masterMadeStep: PropTypes.bool.isRequired,
  socketId: PropTypes.string,
  changeGameStatus: PropTypes.func.isRequired,
  guessNarratorCard: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    playersNumber: state.ratingReducer.players.playersNumber,
    master: state.ratingReducer.players.master,
    masterMadeStep: state.ratingReducer.players.masterMadeStep,
    socketId: state.userInfoReducer.user.socketId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeGameStatus: status => dispatch(changeGameStatus(status)),
    guessNarratorCard: (src, master, socketId) =>
      dispatch(guessNarratorCard(src, master, socketId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExposedCards);
