import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as AuthService from "../../services/AuthService";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import RegistrationForm from "./RegistrationForm";

function Registration({registration, ...props}) {
  const [registrationForm, setRegistrationForm] = useState({
    ...props.registrationForm,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  function handleChange(event) {
    const {name, value} = event.target;
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function formIsValid() {
    const {username, password, email} = registrationForm;
    const errors = {};

    if (!username) errors.username = "Username is required.";
    if (!password) errors.password = "Password is required.";
    if (!email) errors.email = "Email is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    AuthService.registration(registrationForm)
      .then((message) => {
        toast.success(message);
        history.push("/");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({onSubmit: error.message});
      });
  }

  return (
    <RegistrationForm
      onChange={handleChange}
      errors={errors}
      onSubmit={handleSubmit}
      saving={saving}
      registrationForm={registrationForm}
    />
  );
}

Registration.propTypes = {
  registrationForm: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const registrationForm = {
    username: "",
    password: "",
    email: "",
  };
  return {
    registrationForm
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
