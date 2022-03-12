import React, { ComponentType } from "react";
import { Navigate } from "react-router-dom";

type RouteProps = {
  isAllowed: boolean;
  redirectTo?: string;
  compoment: ComponentType;
};

const ProtectedRoute = (props: RouteProps) => {
  if (!props.isAllowed) {
    return <Navigate to={props.redirectTo || "/login"} replace />;
  }
  return <props.compoment />;
};

export default ProtectedRoute;
