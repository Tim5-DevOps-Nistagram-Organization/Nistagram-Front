import React, {useEffect} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {logout, checkUserRole} from "../../redux/actions/userActions";
import * as Role from "../../model/Role"

function Header({role, logout, checkUserRole}) {
  const activeStyle = {color: "#fc9d7f"};

  const history = useHistory();

  useEffect(() => {
    checkUserRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogOut() {
    logout();
    toast.success("Successfully logged out.");
    history.push("/login");
  }

  return role === Role.UNLOGGED ? (
    <nav>
      <Button>
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
      </Button>
      {" | "}
      <Button>
        <NavLink to="/login" activeStyle={activeStyle}>
          Log In
        </NavLink>
      </Button>
    </nav>) : (
    <nav>
      <Button>
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>
      </Button>
      {" | "}
      <Button onClick={handleLogOut}>Log out</Button>
    </nav>
  )
}

Header.propTypes = {
  role: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  checkUserRole: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    role: state.userRole,
  };
}

const mapDispatchToProps = {
  logout,
  checkUserRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
