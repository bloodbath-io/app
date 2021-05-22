import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth'

interface GuestRouteProps extends RouteProps {
  children: React.ReactNode
  unauthorizedTo: string // TODO: make it optional
}

const DEFAULT_REDIRECT = '/events'

const GuestRoute: React.FC<GuestRouteProps> = ({ children, unauthorizedTo, ...rest }) => {
  const redirect = unauthorizedTo || DEFAULT_REDIRECT

  return (
    <Route {...rest} >
      {!isAuthenticated() ? (
        children
      ) : (
        <Redirect to={redirect} />
      )}
    </Route>
  );
};
export default GuestRoute;