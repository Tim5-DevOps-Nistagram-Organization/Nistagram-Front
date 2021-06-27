import React, {useEffect, useState} from "react";
import * as UserService from "../../../services/UserService"
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import EditProfileForm from "./EditProfileForm";
import {newUser, newUserRequest} from "../../../model/User";

function EditProfile() {
  const [form, setForm] = useState(newUser);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  useEffect(() => {
    UserService.me().then((data) => {
      data.dateOfBirth = data.dateOfBirth == null ? "" : data.dateOfBirth.substring(0, 10);
      setForm(data);
    }).catch((error) => {
      toast.error(error.message);
    });
  }, [])

  function handleChange(event) {
    const {name, value} = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    UserService.update(newUserRequest(form))
      .then((data) => {
        toast.success(data);
        //todo redirect to profile
        history.push("/");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({onSubmit: error.message});
      });
  }

  return (
    <EditProfileForm
      onChange={handleChange}
      errors={errors}
      onSubmit={handleSubmit}
      saving={saving}
      form={form}
    />
  );
}


export default EditProfile;
