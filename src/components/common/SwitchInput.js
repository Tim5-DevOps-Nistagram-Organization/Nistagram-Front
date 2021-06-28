import React from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const SwitchInput = ({ name, label, onChange, value }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={onChange}
          name={name}
          color="primary"
        />
      }
      label={label}
    />
  );
};

SwitchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default SwitchInput;