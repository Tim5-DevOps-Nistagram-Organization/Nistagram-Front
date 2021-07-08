import React, { useEffect, useState } from "react";
import * as UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import EditProfileForm from "./EditProfileForm";
import { newUser, newUserRequest } from "../../../model/User";
import SettingsProfileForm from "./SettingsProfileForm";

function EditProfile() {
  const [form, setForm] = useState(newUser);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    UserService.me()
      .then((data) => {
        data.dateOfBirth =
          data.dateOfBirth == null ? "" : data.dateOfBirth.substring(0, 10);
        setForm(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  function handleChange(event) {
    const { name, value, checked } = event.target;
    if (name === "profileIsPrivate") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: checked,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    UserService.update(newUserRequest(form))
      .then((data) => {
        toast.success(data);
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  function handleSettingsSubmit(event) {
    event.preventDefault();
    setSaving(true);

    UserService.updateSettings(form.profileIsPrivate)
      .then((data) => {
        toast.success(data);
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSubmit: error.message });
      });
  }

  return (
    <>
      <EditProfileForm
        onChange={handleChange}
        errors={errors}
        onSubmit={handleSubmit}
        saving={saving}
        form={form}
      />
      <SettingsProfileForm
        onChange={handleChange}
        isPrivate={form.profileIsPrivate}
        onSubmit={handleSettingsSubmit}
        saving={saving}
      />
    </>
  );
}

export default EditProfile;
