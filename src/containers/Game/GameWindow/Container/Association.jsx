import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './AssosiationStyled';
import InfoInputFiled from './AssociationComponents/InfoInputFiled';
import AvatarButton from './AssociationComponents/AvatarButton';
import Name from './AssociationComponents/Name';

class Association extends Component {
  render() {
    const user = {};
    const { players } = this.props;
    const { master } = players;
    const url =
      players.avatar[0] ||
      'http://zabavnik.club/wp-content/uploads/Kartinki_pro_smaylik-ulybka_1_05172441.jpg';
    user.master = master;
    user.url = url;
    return (
      <Wrapper>
        <InfoInputFiled props={user} />
        <AvatarButton props={user} />
        {/* <Name /> */}
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
