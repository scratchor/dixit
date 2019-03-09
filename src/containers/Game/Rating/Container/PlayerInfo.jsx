import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './PlayerInfoStyled';

import Score from './Components/Score';
import PlayerNameStat from './Components/PlayerNameStat';
import Avatar from './Components/Avatar';
import Scorehighliter from './Components/scoreHighliter';

const playerInfo = ({ avatar, name, status, score, addScore, id }) => {
  return (
    <Wrapper>
      <Avatar imgObj={{ url: avatar }} />
      <Score score={score} />
      <Scorehighliter addScore={addScore} id={id} />
      <PlayerNameStat name={name} status={status} />
    </Wrapper>
  );
};

playerInfo.defaultProps = {
  addScore: null
};

playerInfo.propTypes = {
  avatar: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  addScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default playerInfo;
