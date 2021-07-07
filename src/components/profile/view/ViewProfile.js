import React, { useEffect, useState } from "react";
import * as UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import { newUserDetails } from "../../../model/User";
import ProfileViewFromat from "./ViewProfileFormat";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import * as SearchService from "../../../services/SearchService";
import * as CampaignService from "../../../services/CampaignService";
import PostList from "../../post/view/PostList";
import { Pagination } from "@material-ui/lab";
import CampaignViewList from "../../campaign/view/CampaignViewList";

function ViewProfile({ username, me, role }) {
  const [user, setUser] = useState(newUserDetails);
  const [numOfPage, setNumOfPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [campaings, setCampaings] = useState([]);
  const sizeOfPage = 21;
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
    loadCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, numOfPage]);

  function loadUser() {
    UserService.getByUsername(username)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function loadPosts() {
    if (
      !user.private ||
      user.friend ||
      (username === undefined && user.username !== "")
    ) {
      const param = username ? username : me;
      SearchService.user(param, numOfPage - 1, sizeOfPage)
        .then((data) => {
          setPosts(data["content"]);
          setTotalPages(data["totalPages"]);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }

  function loadCampaigns() {
    const param = username ? username : me;
    CampaignService.getCampaings(param)
      .then((data) => {
        setCampaings(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const handleChangePage = (event, value) => {
    setNumOfPage(value);
  };

  function handleOnAddPost(event) {
    event.preventDefault();
    history.push("/post/add");
  }

  function handleOnAddCampaign(event) {
    event.preventDefault();
    history.push("/campaign/add");
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

  function handleReaction(value) {
    history.push("/post/reaction/" + value);
  }

  return (
    <>
      <ProfileViewFromat
        user={user}
        myProfile={username === undefined}
        role={role}
        onAddPost={handleOnAddPost}
        onAddCampaign={handleOnAddCampaign}
        onFollowRequests={handleOnFollowRequests}
        onFollow={handleFollow}
        onMute={handleMute}
        onUnfollow={handleUnfollow}
        onUnmute={handleUnmute}
        onReaction={handleReaction}
      />
      <CampaignViewList campaigns={campaings} />
      {(!user.private ||
        user.friend ||
        (username === undefined && user.username !== "")) && (
        <>
          <PostList posts={posts} />
          {totalPages > 0 && (
            <div style={{ justifyContent: "center", display: "flex" }}>
              <Pagination
                count={totalPages}
                page={numOfPage}
                onChange={handleChangePage}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

ViewProfile.propTypes = {
  username: PropTypes.string,
  me: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  const username = ownProps.match.params.username;
  return {
    username,
    me: state.username,
    role: state.userRole,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
