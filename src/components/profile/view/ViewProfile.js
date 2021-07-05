import React, { useEffect, useState } from "react";
import * as UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import { newUserDetails } from "../../../model/User";
import ProfileViewFromat from "./ViewProfileFormat";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function ViewProfile({ username, role }) {
  const [user, setUser] = useState(newUserDetails);
  const history = useHistory();

  useEffect(() => {
    if (username) {
      loadUser();
    } else {
      UserService.meDetails()
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  function loadUser() {
    UserService.getByUsername(username)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function handleOnAddPost(event) {
    event.preventDefault();
    history.push("/post/add");
  }

  function handleOnFollowRequests(event) {
    event.preventDefault();
    history.push("/follow/requests");
  }

  function handleFollow(event) {
    event.preventDefault();
    UserService.follow(username)
      .then((message) => {
        toast.success(message);
        loadUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function handleUnfollow(event) {
    event.preventDefault();
    UserService.unfollow(username)
      .then((message) => {
        toast.success(message);
        loadUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function handleMute(event) {
    event.preventDefault();
    UserService.mute(username)
      .then((message) => {
        toast.success(message);
        loadUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function handleUnmute(event) {
    event.preventDefault();
    UserService.unmute(username)
      .then((message) => {
        toast.success(message);
        loadUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <ProfileViewFromat
      user={user}
      myProfile={username === undefined}
      role={role}
      onAddPost={handleOnAddPost}
      onFollowRequests={handleOnFollowRequests}
      onFollow={handleFollow}
      onMute={handleMute}
      onUnfollow={handleUnfollow}
      onUnmute={handleUnmute}
    />
  );
}

ViewProfile.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  const username = ownProps.match.params.username;
  return {
    username,
    role: state.userRole,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
