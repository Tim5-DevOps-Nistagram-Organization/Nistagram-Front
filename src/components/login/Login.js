import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "./LoginForm";

function Login({ login, role, ...props }) {
  const [loginForm, setLoginForm] = useState({
    ...props.loginForm,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { username, password } = loginForm;
    const errors = {};

    if (!username) errors.username = "Username is required.";
    if (!password) errors.password = "Password is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    login(loginForm)
      .then((role) => {
        toast.success("Successfully logged in.");
        history.push("/");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  return (
    <LoginForm
      onChange={handleChange}
      errors={errors}
      onSubmit={handleSubmit}
      saving={saving}
      loginForm={loginForm}
    />
  );
}

Login.propTypes = {
  loginForm: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const loginForm = {
    username: "",
    password: "",
  };
  return {
    loginForm,
    role: state.userRole,
  };
}

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
