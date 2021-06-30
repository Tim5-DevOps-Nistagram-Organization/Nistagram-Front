import React from "react";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import TextInput from "../../common/TextInput";
import "../../common/Form.css";
import PropTypes from "prop-types";
import MediaInput from "../../common/MediaInput";

function PostAddForm({
  form,
  mediaUploaded,
  errors,
  saving,
  onSubmit,
  onChange,
  onUpload,
}) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Publish post</h2>
      {errors.onSubmit && <Alert severity="error">{errors.onSubmit}</Alert>}
      <MediaInput
        label="Media"
        onChange={onChange}
        onUpload={onUpload}
        name="mediaId"
        mediaUploaded={mediaUploaded}
      />
      <TextInput
        name="description"
        label="Description"
        value={form.description}
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

PostAddForm.propTypes = {
  form: PropTypes.object.isRequired,
  mediaUploaded: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default PostAddForm;
