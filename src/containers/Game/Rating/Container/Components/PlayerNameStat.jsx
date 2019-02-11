import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './PlayerNameStatStyled';
import Status from './PlayerNameStat/Status';
import Name from './PlayerNameStat/Name';

const PlayerNameStat = ({ name, status }) => {
  return (
    <Wrapper>
      <Name name={name} />
      <Status status={status} />
    </Wrapper>
  );
};

PlayerNameStat.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default PlayerNameStat;
