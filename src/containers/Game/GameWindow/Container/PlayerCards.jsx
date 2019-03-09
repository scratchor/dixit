import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './PlayerCardsStyled';
import PlayerCard from './PlayerCards/PlayerCard';
import writePlayerCardIndex from '../../../../actions/writePlayerCardIndex';
import transportPlayerCardToExposedCards from '../../../../actions/transportPlayerCardToExposedCards';

class PlayerCards extends Component {
  state = {
    loadImages: [],
    click: false
  };

  shouldComponentUpdate(nextProps) {
    const cardsNew = nextProps.props;
    const { props } = this.props;
    return !cardsNew.every((e, i) => {
      return e === props[i];
    });
    // return true;
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
          e.classList.remove('view');
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
    const { click } = this.state;
    const { players } = this.props;
    const { masterMadeStep } = players;
    if (masterMadeStep && !click) {
      this.setState({
        click: true
      });
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
      // setTimeout(function async() {
      //   return transportPlayerCardToExposedCards(src);
      // }, 1000);
      transportPlayerCardToExposedCards(src);
    }
  };

  render() {
    console.log(this.props);
    const { props } = this.props;
    const array = props;
    const PlayerCards =
      array.length > 0 ? (
        array.map((e, i) => {
          console.log(e);
          return (
            <PlayerCard
              src={e}
              key={i}
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
  transportPlayerCardToExposedCards: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    players: state.ratingReducer.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    writePlayerCardIndex: i => dispatch(writePlayerCardIndex(i)),
    transportPlayerCardToExposedCards: src =>
      dispatch(transportPlayerCardToExposedCards(src))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerCards);
