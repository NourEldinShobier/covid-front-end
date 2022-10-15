import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

export interface Props {
  children: React.ReactNode;
}

export function Auth0ProviderWithHistory({ children }: Props) {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE!;

  const history = useHistory();

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={audience}
      onRedirectCallback={(appState) => {
        history.push(appState?.returnTo || window.location.pathname);
      }}
    >
      {children}
    </Auth0Provider>
  );
}
