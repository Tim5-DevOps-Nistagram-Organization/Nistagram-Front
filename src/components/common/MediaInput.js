import React, { useState } from "react";
import PropTypes, { number, string } from "prop-types";
import { Button } from "@material-ui/core";

const MediaInput = ({ name, label, mediaUploaded, onChange, onUpload }) => {
  const [value, setValue] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function loadImage(file) {
    return await toBase64(file);
  }

  function handleChange(event) {
    const { files } = event.target;
    loadImage(files[0]).then((data) => setValue(data));
    onChange(event);
  }

  return (
    <>
      <Button
        variant="contained"
        component="label"
        color={"primary"}
        style={{ width: "100%" }}
      >
        {label}
        <input
          name={name}
          onChange={handleChange}
          type="file"
          hidden
          accept="image/jpeg, image/png"
        />
      </Button>
      <br />
      {!mediaUploaded && (
        <Button
          variant="contained"
          component="label"
          color={"primary"}
          style={{ width: "100%", marginTop: "2px" }}
          onClick={onUpload}
        >
          Upload media
        </Button>
      )}
      <br />
      {value !== "" && (
        <img
          src={value}
          alt="Media doesn't have new value"
          style={{ width: "49%", marginLeft: "1%", marginTop: "2px" }}
        />
      )}
    </>
  );
};
MediaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mediaUploaded: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([string, number]),
};

export default MediaInput;
