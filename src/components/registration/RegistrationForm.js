import React from "react";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import TextInput from "../common/TextInput";
import "../common/Form.css";
import PropTypes from "prop-types";

function RegistrationForm({
  registrationForm,
  errors,
  saving,
  onSubmit,
  onChange,
}) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Registration</h2>
      {errors.onSubmit && <Alert severity="error">{errors.onSubmit}</Alert>}
      <TextInput
        name="username"
        label="Username"
        value={registrationForm.username}
        onChange={onChange}
        error={errors.username}
      />

      <TextInput
        name="password"
        label="Password"
        value={registrationForm.password}
        onChange={onChange}
        error={errors.password}
        type="password"
      />

      <TextInput
        name="email"
        label="Email"
        value={registrationForm.email}
        onChange={onChange}
        error={errors.email}
        type="email"
      />

      <br />
      <br />
      <Button
        type="submit"
        disabled={saving}
        variant="outlined"
        color="primary"
        className="field"
      >
        {saving ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}

RegistrationForm.propTypes = {
  registrationForm: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RegistrationForm;
