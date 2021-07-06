import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import PropTypes, { object } from "prop-types";
import { base } from "../../../services/Utils";
import { newPostDetails } from "../../../model/Post";
import PostView from "./PostView";
import * as PostService from "../../../services/PostService";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Reaction, ReactionCreate } from "../../../model/Reaction";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "80%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

function PostList({ posts, role }) {
  const [post, setPost] = useState(newPostDetails);
  const [open, setOpen] = useState(false);

  function handleOnView(postId) {
    loadPost(postId);
  }

  function loadPost(postId) {
    PostService.getById(postId)
      .then((data) => {
        setPost(data);
        setOpen(true);
      })
      .catch((error) => toast.error(error.message));
  }

  function createReaction(value) {
    PostService.createReaction(new ReactionCreate(post.id, value))
      .then(() => {
        loadPost(post.id);
      })
      .catch((error) => toast.error(error.message));
  }

  function updateReaction(value) {
    PostService.updateReaction(new Reaction(post.reaction.id, value))
      .then(() => {
        loadPost(post.id);
      })
      .catch((error) => toast.error(error.message));
  }

  function handleDeleteReaction() {
    PostService.deleteReaction(post.reaction.id)
      .then(() => {
        loadPost(post.id);
      })
      .catch((error) => toast.error(error.message));
  }

  function handleLike() {
    if (post.reaction === null) {
      createReaction(1);
    } else {
      updateReaction(1);
    }
  }

  function handleDislike() {
    if (post.reaction === null) {
      createReaction(2);
    } else {
      updateReaction(2);
    }
  }

  const classes = useStyles();
  const baseUrl = base + "media/media/";
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={3}>
        {posts.map((post, index) => (
          <GridListTile key={index}>
            <img
              src={baseUrl + post.mediaId}
              alt={"Ups"}
              onClick={() => handleOnView(post.postId)}
            />
          </GridListTile>
        ))}
      </GridList>
      <PostView
        post={post}
        baseUrl={baseUrl}
        onClose={() => setOpen(false)}
        open={open}
        role={role}
        onLike={handleLike}
        onDislike={handleDislike}
        onDelete={handleDeleteReaction}
      />
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(object).isRequired,
  role: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    role: state.userRole,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
