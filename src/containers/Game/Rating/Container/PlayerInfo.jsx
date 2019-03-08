import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './PlayerInfoStyled';

import Score from './Components/Score';
import PlayerNameStat from './Components/PlayerNameStat';
import Avatar from './Components/Avatar';

const playerInfo = ({ avatar, name, status, score }) => {
  return (
    <Wrapper>
      <Avatar imgObj={{ url: avatar }} />
      <Score score={score} />
      <PlayerNameStat name={name} status={status} />
    </Wrapper>
  );
};

playerInfo.propTypes = {
  avatar: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default playerInfo;
