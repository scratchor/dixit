import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './AssosiationStyled';
import InfoInputFiled from './AssociationComponents/InfoInputFiled';
import AvatarButton from './AssociationComponents/AvatarButton';
import ThinkTime from './AssociationComponents/ThinkTime';

class Association extends Component {
  render() {
    const user = {};
    const { players } = this.props;
    const { master, masterMadeStep, association, username } = players;
    const name = username[0];
    const url =
      players.avatar[0] ||
      'http://zabavnik.club/wp-content/uploads/Kartinki_pro_smaylik-ulybka_1_05172441.jpg';
    user.master = master;
    user.url = url;
    user.masterMadeStep = masterMadeStep;
    user.association = association;
    user.name = name;
    return (
      <Wrapper>
        <InfoInputFiled props={user} />
        <AvatarButton props={user} />
        <ThinkTime />
      </Wrapper>
    );
  }
}

Association.propTypes = {
  players: PropTypes.PropTypes.shape({
    avatar: PropTypes.array,
    master: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => {
  return {
    players: state.ratingReducer.players
  };
};

export default connect(mapStateToProps)(Association);
