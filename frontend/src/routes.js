import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import {
  SignIn,
  SignUp,
  Todo,
  TodoAdd,
  TodoEdit,
  TodoArchives,
} from './containers/Index';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const from = props.location.pathname;
      if (from === '/login' || from === '/signup') {
        return authenticated ? (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        );
      }
      return authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    }}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const Routers = props => (
  <div>
    <AuthRoute exact path="/" component={Todo} {...props} />
    <AuthRoute path="/login" component={SignIn} {...props} />
    <AuthRoute path="/signup" component={SignUp} {...props} />
    <AuthRoute path="/todo/add" component={TodoAdd} {...props} />
    <AuthRoute path="/todo/archives" component={TodoArchives} {...props} />
    <AuthRoute path="/todo/:id/edit" component={TodoEdit} {...props} />
  </div>
);

export default Routers;

Routers.defaultProps = {
  authenticated: false,
};
Routers.propTypes = {
  authenticated: PropTypes.bool,
};
