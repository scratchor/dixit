import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wrapper from './AvatarButtonStyled';
import reportAssociation from '../../../../../actions/reportAssociation';

class AvatarButton extends Component {
  componentDidUpdate() {
    const { props } = this.props;
    const { master, masterMadeStep } = props;
    if (master && !masterMadeStep) {
      const elem = document.querySelector('.fancy-button');
      elem.addEventListener('mousedown', () => {
        elem.addEventListener('animationend', () => {
          elem.classList.remove('active');
        });
        elem.classList.add('active');
      });
    }
  }

  handleClick = () => {
    const { ifGameStarted } = this.props;
    if (ifGameStarted) {
      const input = document.getElementById('association');
      const { reportAssociation } = this.props;
      reportAssociation(input.value);
    }
  };

  render() {
    const { props } = this.props;
    const { master, url, masterMadeStep, name } = props;
    const Elem =
      master && !masterMadeStep ? (
        <div className="fancy-button">
          <div className="left-frills frills" />
          <button className="button" onClick={this.handleClick} type="button" />
          <div className="right-frills frills" />
        </div>
      ) : (
        <div className="avatarName">
          <div className="avatar" style={{ backgroundImage: `url(${url})` }} />
          <span className="name">{name || 'name'}</span>
        </div>
      );
    return <Wrapper>{Elem}</Wrapper>;
  }
}

AvatarButton.defaultProps = {
  props: PropTypes.shape({
    url: PropTypes.string,
    master: PropTypes.bool.isRequired
  }),
  master: false,
  masterMadeStep: false
};

AvatarButton.propTypes = {
  props: PropTypes.shape({}),
  master: PropTypes.bool,
  masterMadeStep: PropTypes.bool,
  reportAssociation: PropTypes.func.isRequired,
  ifGameStarted: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    ifGameStarted: state.ratingReducer.players.ifGameStarted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reportAssociation: value => dispatch(reportAssociation(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarButton);
