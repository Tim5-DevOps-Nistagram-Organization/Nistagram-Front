import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import RegistrationForm from "./RegistrationForm";
import RegistrationTabs from "./RegistrationTabs";

function Registration({ registration, ...props }) {
  const [tab, setTab] = useState(0);
  const [registrationForm, setRegistrationForm] = useState({
    ...props.registrationForm,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  function handleTabChange(event, value) {
    setTab(value);
    setErrors({});
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setRegistrationForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { username, password, email, websiteUrl } = registrationForm;
    const errors = {};

    if (!username) errors.username = "Username is required.";
    if (!password) errors.password = "Password is required.";
    if (!email) errors.email = "Email is required.";
    if (tab === 1 && !websiteUrl)
      errors.websiteUrl = "Web site url is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    if (tab === 0) {
      AuthService.registrationRegular(registrationForm)
        .then((message) => {
          toast.success(message);
          history.push("/");
        })
        .catch((error) => {
          setSaving(false);
          setErrors({ onSubmit: error.message });
        });
    } else if (tab === 1) {
      AuthService.registrationAgetn(registrationForm)
        .then((message) => {
          toast.success(message);
          history.push("/");
        })
        .catch((error) => {
          setSaving(false);
          setErrors({ onSubmit: error.message });
        });
    }
  }

  return (
    <>
      <RegistrationTabs onChange={handleTabChange} value={tab} />
      <RegistrationForm
        onChange={handleChange}
        tab={tab}
        errors={errors}
        onSubmit={handleSubmit}
        saving={saving}
        registrationForm={registrationForm}
      />
    </>
  );
}

Registration.propTypes = {
  registrationForm: PropTypes.object.isRequired,
};

function mapStateToProps() {
  const registrationForm = {
    username: "",
    password: "",
    email: "",
    websiteUrl: "",
  };
  return {
    registrationForm,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
