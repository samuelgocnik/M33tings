import React, { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/use-selector";

type RouteProps = {
  isAllowed: boolean;
  redirectTo?: string;
  compoment: ComponentType;
};

const PublicRoute = (props: RouteProps) => {
  if (!props.isAllowed) {
    return <Navigate to={props.redirectTo || "/meetings"} replace />;
  }
  return <props.compoment />;
};

export default PublicRoute;
