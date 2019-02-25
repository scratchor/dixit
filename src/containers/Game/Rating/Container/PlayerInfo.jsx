import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Wrapper from './PlayerInfoStyled';

import Score from './Components/Score';
import PlayerNameStat from './Components/PlayerNameStat';
import Avatar from './Components/Avatar';

const playerInfo = props => {
  return (
    <Wrapper>
      <Avatar imgObj={{ url: props.avatar }} />
      <Score score="23" />
      <PlayerNameStat name={props.name} status={props.status} />
    </Wrapper>
  );
};

// const mapStateToProps = state => {
//   return {
//     avatar: state.avatarRating.avatar
//   };
// };

// export default connect(mapStateToProps)(playerInfo);
export default playerInfo;
