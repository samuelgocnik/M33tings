import React from "react";
import { Navigate } from "react-router-dom";

type RouteProps = {
  isAllowed: boolean;
  children: any;
  redirectTo?: string;
};

const PublicRoute = (props: RouteProps) => {
  if (!props.isAllowed) {
    return <Navigate to={props.redirectTo || "/meetings"} replace />;
  }
  return props.children ? props.children : <></>;
};

export default PublicRoute;
