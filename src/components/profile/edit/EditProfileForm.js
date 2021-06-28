import React from "react";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import TextInput from "../../common/TextInput";
import "../../common/Form.css";
import PropTypes from "prop-types";

function EditProfileForm({ form, errors, saving, onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Edit profile</h2>
      {errors.onSubmit && <Alert severity="error">{errors.onSubmit}</Alert>}
      <TextInput
        name="username"
        label="Username"
        value={form.username}
        onChange={onChange}
        disabled={true}
      />

      <TextInput
        name="email"
        label="Email"
        value={form.email}
        onChange={onChange}
        type="email"
        disabled={true}
      />

      <TextInput
        name="name"
        label="Name"
        value={form.name}
        onChange={onChange}
      />

      <TextInput
        name="phone"
        label="Phone"
        value={form.phone}
        onChange={onChange}
      />

      <TextInput
        name="gender"
        label="Gender"
        value={form.gender}
        onChange={onChange}
      />

      <TextInput
        name="dateOfBirth"
        label="Date of birth"
        value={form.dateOfBirth}
        onChange={onChange}
        type="date"
      />

      <TextInput
        name="webSite"
        label="Web site"
        value={form.webSite}
        onChange={onChange}
      />

      <TextInput
        name="biography"
        label="Biography"
        value={form.biography}
        onChange={onChange}
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

EditProfileForm.propTypes = {
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditProfileForm;
