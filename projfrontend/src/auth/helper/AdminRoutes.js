import React from "react";
import {Route, Link, Redirect} from "react-router-dom";
import UserDashboard from "../../user/UserDashBoard";
import {isAutheticated} from "./index";

const AdminRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() && isAutheticated().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
