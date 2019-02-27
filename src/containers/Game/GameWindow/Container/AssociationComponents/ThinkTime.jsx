import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wrapper from './ThinkTimeStyled';
import reportAssociation from '../../../../../actions/reportAssociation';

class ThinkTime extends Component {
  componentDidMount() {
    function timer() {
      const div = document.getElementById('timer');
      const time = div.innerHTML;
      const arr = time.split(':');
      let m = +arr[0];
      let s = +arr[1];
      if (s === 0) {
        if (m === 0) {
          alert('Время вышло');
          return;
        }
        m -= 1;
        s = 59;
      } else s -= 1;
      if (s < 10) s = `0${s}`;
      document.getElementById('timer').innerHTML = `${m}:${s}`;
      setTimeout(timer, 1000);
    }
    timer();
  }

  handleClick = () => {
    const input = document.getElementById('association');
    const { reportAssociation } = this.props;
    reportAssociation(input.value);
  };

  render() {
    return (
      <Wrapper>
        <div id="timer">05:00</div>
      </Wrapper>
    );
  }
}

// AvatarButton.defaultProps = {
//   props: PropTypes.shape({
//     url: PropTypes.string,
//     master: PropTypes.bool.isRequired
//   }),
//   master: false,
//   masterMadeStep: false
// };
//
// AvatarButton.propTypes = {
//   props: PropTypes.shape({}),
//   master: PropTypes.bool,
//   masterMadeStep: PropTypes.bool,
//   reportAssociation: PropTypes.func.isRequired
// };

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    reportAssociation: value => dispatch(reportAssociation(value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThinkTime);
