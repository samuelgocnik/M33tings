import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../../store/auth-context';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Redirect to="/meetings" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PublicRoute;
