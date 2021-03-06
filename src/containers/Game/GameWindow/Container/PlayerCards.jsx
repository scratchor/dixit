import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './PlayerCardsStyled';
import PlayerCard from './PlayerCards/PlayerCard';
import writePlayerCardIndex from '../../../../actions/writePlayerCardIndex';
import transportPlayerCardToExposedCards from '../../../../actions/transportPlayerCardToExposedCards';
import playerCardsClickAction from '../../../../actions/playerCardsClick';

class PlayerCards extends Component {
  state = {
    loadImages: []
  };

  shouldComponentUpdate(nextProps) {
    const cardsNew = nextProps.props;
    const { props } = this.props;
    return !cardsNew.every((e, i) => {
      return e === props[i];
    });
  }

  componentDidUpdate() {
    this.setState(prevState => ({
      loadImages: prevState.loadImages
    }));
  }

  handleImageLoaded = e => {
    const { loadImages } = this.state;
    loadImages.push(e.target);
    this.setState({
      loadImages
    });
    const { state } = this;
    if (state.loadImages.length === 5) {
      console.log('КАРТИНКИ ЗАГРУЖЕНЫ');
      let imgs = document.querySelectorAll('.playerCard');
      imgs = [].slice.call(imgs);
      let time = 0;
      imgs.forEach(e => {
        time += 500;
        setTimeout(function() {
          e.classList.remove('hidden');
          e.classList.add('animation');
        }, time);
      });
    } else if (state.loadImages.length > 5) {
      console.log('КАРТИНКА ЗАГРУЖЕНА');
      const img = state.loadImages.pop();
      img.classList.remove('hidden');
      img.classList.add('animation');
    }
  };

  handleClick = e => {
    const { players, playerCardsClickAction } = this.props;
    const { masterMadeStep, playerCardsClick } = players;
    if (masterMadeStep && !playerCardsClick) {
      playerCardsClickAction();
      const {
        props,
        writePlayerCardIndex,
        transportPlayerCardToExposedCards
      } = this.props;
      const i = props.indexOf(e.target.src);
      e.target.classList.remove('animation');
      e.target.classList.add('hidden');
      writePlayerCardIndex(i);
      const { src } = e.target;
      transportPlayerCardToExposedCards(src);
    }
  };

  render() {
    const { props } = this.props;
    const array = props;
    const PlayerCards =
      array.length > 0 ? (
        array.map(e => {
          return (
            <PlayerCard
              src={e}
              key={e}
              loadImages={this.handleImageLoaded}
              click={this.handleClick}
            />
          );
        })
      ) : (
        <div>
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div>
      );
    return <Wrapper>{PlayerCards}</Wrapper>;
  }
}

PlayerCards.propTypes = {
  props: PropTypes.arrayOf(PropTypes.string).isRequired,
  players: PropTypes.shape({}).isRequired,
  writePlayerCardIndex: PropTypes.func.isRequired,
  transportPlayerCardToExposedCards: PropTypes.func.isRequired,
  playerCardsClickAction: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    players: state.ratingReducer.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    writePlayerCardIndex: i => dispatch(writePlayerCardIndex(i)),
    playerCardsClickAction: () => dispatch(playerCardsClickAction()),
    transportPlayerCardToExposedCards: src =>
      dispatch(transportPlayerCardToExposedCards(src))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerCards);
