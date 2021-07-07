import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import PostAddForm from "./PostAddForm";
import { newPost } from "../../../model/Post";
import * as mediaService from "../../../services/MediaService";
import * as postService from "../../../services/PostService";

function PostAdd() {
  const [form, setForm] = useState(newPost);
  const [media, setMedia] = useState({});
  const [mediaUploaded, setMediaUploaded] = useState(true);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "mediaId") {
      setMedia(files[0]);
      setMediaUploaded(false);
      return;
    }
    setForm((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function handleUpload() {
    setSaving(true);
    mediaService
      .upload(media)
      .then((data) => {
        setMediaUploaded(true);
        setForm((prevValue) => ({ ...prevValue, mediaId: data }));
        setSaving(false);
      })
      .catch((err) => {
        setErrors({ onSubmit: err.message });
        setSaving(false);
      });
  }

  function formIsValid() {
    const { mediaId } = form;
    const errors = {};

    if (!mediaId)
      errors.onSubmit = "Media is required. You need to upload media first.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function getTagsFromDescription() {
    let data = form;
    let text = data.description;
    let tags = [];
    while (true) {
      let indexStart = text.indexOf("#");
      if (indexStart === -1) break;
      let indexEnd = text.substring(indexStart).indexOf(" ");
      let tag =
        indexEnd !== -1
          ? text.substring(indexStart + 1, indexStart + indexEnd)
          : text.substring(indexStart + 1);
      tags.push({ title: tag });
      if (indexEnd === -1) break;
      text = text.substring(indexStart + indexEnd);
    }
    data.tags = tags;
    return data;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    const data = getTagsFromDescription();
    setSaving(true);

    postService
      .create(data)
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
    <PostAddForm
      onChange={handleChange}
      errors={errors}
      onSubmit={handleSubmit}
      saving={saving}
      form={form}
      onUpload={handleUpload}
      mediaUploaded={mediaUploaded}
    />
  );
}

export default PostAdd;
