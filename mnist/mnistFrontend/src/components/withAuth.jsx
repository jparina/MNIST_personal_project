import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const isLoggedIn = isAuthenticated(props.user?.token);

    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/" replace />;
    }
  };
};

export default withAuth;