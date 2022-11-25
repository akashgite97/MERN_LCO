import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { isAutheticated } from './index';

//Make Route Private
//...props to add component ex: User Dashboard
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
