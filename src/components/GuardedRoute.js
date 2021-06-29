import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes, { func, object } from "prop-types";

const GuardedRoute = ({
  component: Component,
  userRole,
  roles,
  redirect,
  ...rest
}) => {
  return (
    userRole !== "INIT" && (
      <Route
        {...rest}
        render={(props) =>
          roles.includes(userRole) ? (
            <Component {...props} />
          ) : (
            <Redirect to={redirect} />
          )
        }
      />
    )
  );
};

GuardedRoute.propTypes = {
  userRole: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
  redirect: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([object, func]).isRequired,
};

function mapStateToProps(state) {
  return {
    userRole: state.userRole,
  };
}

export default connect(mapStateToProps, {})(GuardedRoute);
