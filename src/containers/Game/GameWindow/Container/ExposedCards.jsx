import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './ExposedCardsStyled';
import Card from './ExposedCardsComponents/Card';

class ExposedCards extends Component {
  componentDidUpdate() {
    const { props } = this.props;
    const { playersNumber } = this.props;
    if (props.length === playersNumber) {
      let exposedCards = document.querySelectorAll('.exposedCard');
      let time = 0;
      exposedCards = [].slice.call(exposedCards);
      exposedCards.forEach(e => {
        time += 1000;
        setTimeout(function() {
          e.classList.add('animateExposed');
        }, time);
      });
    }
  }

  handleImageLoaded = e => {
    const div = e.target.parentElement.parentElement;
    div.classList.remove('hidden');
    // div.classList.add('animation');
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
                // click={this.handleClick}
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

ExposedCards.propTypes = {
  props: PropTypes.arrayOf(PropTypes.string).isRequired,
  playersNumber: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    playersNumber: state.ratingReducer.players.playersNumber
  };
};

export default connect(mapStateToProps)(ExposedCards);
