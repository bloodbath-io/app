import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth'

interface CustomerRouteProps extends RouteProps {
  children: React.ReactNode
  unauthorizedTo: string
}

const DEFAULT_REDIRECT = '/signin'

const CustomerRoute: React.FC<CustomerRouteProps> = ({ children, unauthorizedTo, ...rest }) => {

  const redirect = unauthorizedTo || DEFAULT_REDIRECT

  return (
    <Route {...rest} >
      {isAuthenticated() ? (
        children
      ) : (
        <Redirect to={redirect} />
      )}
    </Route>
  );
};
export default CustomerRoute;