import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import SwitchInput from "../../common/SwitchInput";

function SettingsProfileForm({ isPrivate, saving, onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Edit profile settings</h2>
      <SwitchInput
        label="Profil is private"
        onChange={onChange}
        name="profileIsPrivate"
        value={isPrivate}
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
        {saving ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}

SettingsProfileForm.propTypes = {
  isPrivate: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SettingsProfileForm;
