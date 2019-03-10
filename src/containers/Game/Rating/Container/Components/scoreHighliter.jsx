import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './scoreHighliterStyled';

class Scorehighliter extends Component {
  componentDidUpdate() {
    const { id } = this.props;
    const highliter = document.getElementById(`addScore${id}`);
    if (highliter) {
      highliter.classList.add('showAndHide');
      setTimeout(function asa() {
        //const highliter = document.getElementById(`addScore${id}`);
        highliter.classList.remove('showAndHide');
      }, 9000);
    }
  }

  render() {
    const { addScore, id } = this.props;

    if (addScore) {
      return <Wrapper id={`addScore${id}`}>+{addScore}</Wrapper>;
    }
    return null;
  }
}

Scorehighliter.defaultProps = {
  addScore: null
};

Scorehighliter.propTypes = {
  addScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.number.isRequired
};
export default Scorehighliter;
