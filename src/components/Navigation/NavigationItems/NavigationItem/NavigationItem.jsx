import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Wrapper from './NavigationItemStyled';

const navigationItem = ({ path, name }) => {
  return (
    <Wrapper>
      <NavLink exact to={path} style={{ padding: '20px' }}>
        {name}
      </NavLink>
    </Wrapper>
  );
};

navigationItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default navigationItem;
