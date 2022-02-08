import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Redirect to="/meetings" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PublicRoute;
