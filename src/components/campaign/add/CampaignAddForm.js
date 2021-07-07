import React from "react";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import TextInput from "../../common/TextInput";
import "../../common/Form.css";
import PropTypes from "prop-types";
import MediaInput from "../../common/MediaInput";

function CampaignAddForm({
  form,
  mediaUploaded,
  errors,
  saving,
  onSubmit,
  onChange,
  onUpload,
  onAddAdd,
}) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Add campaign</h2>
      {errors.onSubmit && <Alert severity="error">{errors.onSubmit}</Alert>}
      <TextInput
        name="startDate"
        label="Start date"
        value={form.startDate}
        onChange={onChange}
        type="date"
        error={errors.startDate}
      />
      <TextInput
        name="endDate"
        label="End date"
        value={form.endDate}
        onChange={onChange}
        type="date"
        error={errors.endDate}
      />
      <TextInput
        name="numShowsPerDay"
        label="Num show per day"
        value={form.numShowsPerDay}
        onChange={onChange}
        type="number"
        error={errors.numShowsPerDay}
      />
      {form.advertisements.map((_, index) => (
        <div key={index}>
          <TextInput
            name={"advertisements[" + index + "].websiteUrl"}
            label="Website url"
            value={form.advertisements[index].websiteUrl}
            onChange={onChange}
          />
          <MediaInput
            disabled={form.advertisements.length - 1 > index}
            hide={form.advertisements.length - 1 > index}
            label="Media"
            onChange={onChange}
            onUpload={onUpload}
            name={"advertisements[" + index + "].mediaId"}
            mediaUploaded={mediaUploaded}
          />
        </div>
      ))}
      {form.advertisements[form.advertisements.length - 1].mediaId !== null && (
        <Button
          variant="outlined"
          color="primary"
          className="field"
          onClick={onAddAdd}
        >
          Add one more advertisement
        </Button>
      )}
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

CampaignAddForm.propTypes = {
  form: PropTypes.object.isRequired,
  mediaUploaded: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  onAddAdd: PropTypes.func.isRequired,
};

export default CampaignAddForm;
