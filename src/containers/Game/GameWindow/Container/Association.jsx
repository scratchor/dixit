import React, { Component } from 'react';
import Wrapper from './AssosiationStyled';
import InfoInputFiled from './AssociationComponents/InfoInputFiled';
import AvatarButton from './AssociationComponents/AvatarButton';
import Name from './AssociationComponents/Name';
import Avatar from '../../Rating/Container/PlayerInfo';

class Association extends Component {
  state = {
    user: {
      master: true,
      url:
        'http://www.qwesa.ru/wp-content/uploads/2013/06/chto-takoe-smajlik-qwesa.ru-02.jpg'
    }
  };

  render() {
    const { user } = this.state;

    return (
      <Wrapper>
        <InfoInputFiled props={user} />
        <AvatarButton props={user} />
        {/* <Name /> */}
      </Wrapper>
    );
  }
}

export default Association;
