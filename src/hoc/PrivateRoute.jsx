import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const privateRoute = ({ component: Component, protect, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      protect === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

privateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  protect: PropTypes.bool.isRequired
};

export default privateRoute;
