import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as mediaService from "../../../services/MediaService";
import CampaignAddForm from "./CampaignAddForm";
import { Advetisment, newCampaign } from "../../../model/Campaign";
import * as campaingService from "../../../services/CampaignService";

function CampaignAdd() {
  const [form, setForm] = useState(newCampaign);
  const [media, setMedia] = useState({});
  const [mediaUploaded, setMediaUploaded] = useState(true);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name.includes("[")) {
      const index = parseInt(
        name.substring(name.indexOf("[") + 1, name.indexOf("]"))
      );
      const param = name.substring(name.indexOf(".") + 1);
      if (param === "mediaId") {
        setMedia(files[0]);
        setMediaUploaded(false);
        return;
      }
      let data = form.advertisements;
      data[index][param] = value;
      setForm((prevValue) => ({ ...prevValue, advertisements: data }));
    } else {
      setForm((prevValue) => ({ ...prevValue, [name]: value }));
    }
  }

  function handleUpload() {
    setSaving(true);
    mediaService
      .upload(media)
      .then((data) => {
        setMediaUploaded(true);
        const adds = form.advertisements;
        adds[adds.length - 1].mediaId = data;
        setForm((prevValue) => ({ ...prevValue, advertisements: adds }));
        setSaving(false);
      })
      .catch((err) => {
        setErrors({ onSubmit: err.message });
        setSaving(false);
      });
  }

  function handleAddAdd() {
    const adds = form.advertisements;
    adds.push(new Advetisment("", null));
    setForm((prevValue) => ({ ...prevValue, advertisements: adds }));
  }

  function formIsValid() {
    const { startDate, endDate, numShowsPerDay, advertisements } = form;
    const errors = {};

    if (!startDate) errors.startDate = "Start date is requiered.";
    if (endDate && endDate <= startDate)
      errors.endDate = "End date must be after start date.";
    if (numShowsPerDay < 1)
      errors.numShowsPerDay = "Num of shows per day must be greater then 0";
    if (endDate && numShowsPerDay < 2)
      errors.numShowsPerDay = "Num of shows per day must be greater then 1";

    for (let a of advertisements) {
      if (!a.websiteUrl) {
        errors.onSubmit = "Web site is required.";
        break;
      } else if (!a.mediaId) {
        errors.onSubmit = "Media is required. You need to upload media first.";
        break;
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);

    campaingService
      .create(form)
      .then((message) => {
        toast.success(message);
        history.push("/");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  return (
    <CampaignAddForm
      onChange={handleChange}
      errors={errors}
      onSubmit={handleSubmit}
      saving={saving}
      form={form}
      onUpload={handleUpload}
      mediaUploaded={mediaUploaded}
      onAddAdd={handleAddAdd}
    />
  );
}

export default CampaignAdd;
