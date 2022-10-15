import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface Props {
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
}

export function ProtectedRoute({ component, exact, path }: Props) {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <div />,
      })}
      exact={exact}
      path={path}
    />
  );
}
