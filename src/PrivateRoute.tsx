import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = () => {
    if (localStorage.getItem('apiKey') !== null) return true
    return false
  }

  return (
    <Route {...rest} >
      {isAuthenticated() ? (
        children
      ) : (
        <Redirect to='/signin' />
      )}
    </Route>
  );
};
export default PrivateRoute;