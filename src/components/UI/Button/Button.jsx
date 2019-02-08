import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from './ButtonStyled';
import { AppContext } from '../../../App';

const button = ({ name }) => {
  return (
    <AppContext>
      {context => <Wrapper onClick={() => context(name)}>{name}</Wrapper>}
    </AppContext>
  );
};

button.propTypes = {
  name: PropTypes.string.isRequired
};

export default button;
