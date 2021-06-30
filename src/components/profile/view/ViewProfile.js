import React, { useEffect, useState } from "react";
import * as UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import { newUserDetails } from "../../../model/User";
import ProfileViewFromat from "./ViewProfileFormat";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function ViewProfile({ username }) {
  const [user, setUser] = useState(newUserDetails);
  const history = useHistory();

  useEffect(() => {
    if (username) {
      UserService.getByUsername(username)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      UserService.meDetails()
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  });

  function handleOnAddPost(event) {
    event.preventDefault();
    history.push("/post/add");
  }

  return (
    <ProfileViewFromat
      user={user}
      myProfile={username === undefined}
      onAddPost={handleOnAddPost}
    />
  );
}

function mapStateToProps(state, ownProps) {
  const username = ownProps.match.params.username;
  return { username };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
