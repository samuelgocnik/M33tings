import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedIn = !!useSelector((state) => state.auth.token);
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
