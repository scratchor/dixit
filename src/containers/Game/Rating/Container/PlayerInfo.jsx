import React, { Component } from 'react';
import Wrapper from './PlayerInfoStyled';

import Score from './Components/Score';
import PlayerNameStat from './Components/PlayerNameStat';
import Avatar from './Components/Avatar';

const playerInfo = () => {
  return (
    <Wrapper>
      <Avatar
        imgObj={{
          url: 'http://pravda-team.ru/pravda/image/article/3/8/5/300385.jpeg'
        }}
      />
      <Score score="23" />
      <PlayerNameStat name="Vlad" status="everythig is oook" />
    </Wrapper>
  );
};

export default playerInfo;
