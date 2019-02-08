import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Wrapper from './NavigationItemStyled';

const navigationItem = ({ name, path }) => {
  return (
    <Wrapper>
      <Link to={path} style={{ padding: '20px' }}>
        {name}
      </Link>
    </Wrapper>
  );
};

navigationItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default navigationItem;
