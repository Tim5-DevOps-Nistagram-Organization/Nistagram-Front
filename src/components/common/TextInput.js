import React from "react";
import PropTypes, { number, string } from "prop-types";
import { TextField } from "@material-ui/core";

const TextInput = ({
  name,
  label,
  onChange,
  type = "text",
  placeholder,
  value,
  error,
  disabled = false
}) => {
  return !error ? (
    <TextField
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      label={label}
      className="field"
      disabled={disabled}
    />
  ) : (
    <TextField
      error
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      label={label}
      helperText={error}
      className="field"
      disabled={disabled}
    />
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([string, number]),
  error: PropTypes.string,
  disabled: PropTypes.bool
};

export default TextInput;
