import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import PropTypes, { object } from "prop-types";
import { newPostDetails } from "../../../model/Post";
import PostView from "./PostView";
import * as PostService from "../../../services/PostService";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Reaction, ReactionCreate } from "../../../model/Reaction";
import { UnappropriatedContent } from "../../../model/UnappropriatedContent";
import { baseUrl } from "../../../services/MediaService";
import { Comment } from "../../../model/Comment";

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
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({});

  function handleOnView(postId) {
    loadPost(postId);
    loadComments(postId);
  }

  function loadPost(postId) {
    PostService.getById(postId)
      .then((data) => {
        setPost(data);
        setOpen(true);
      })
      .catch((error) => toast.error(error.message));
  }

  function loadComments(postId) {
    PostService.getCommentsByPostId(postId)
      .then((data) => {
        setComments(data);
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

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "comment") {
      setCommentText(value);
    } else {
      setReason(value);
    }
  }

  function formIsValid() {
    const errors = {};

    if (!reason) errors.reason = "Reason is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleReport(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    PostService.unappropriatedContent(
      new UnappropriatedContent(post.id, reason)
    )
      .then((message) => {
        toast.success(message);
        setShow(false);
        setReason("");
      })
      .catch((error) => {
        setErrors({ onSubmit: error.message });
      });
  }

  function formIsValidComment() {
    const errors = {};

    if (!commentText) errors.onSubmitComment = "Commment text is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleAddComment(event) {
    event.preventDefault();
    if (!formIsValidComment()) return;

    PostService.createComment(new Comment(commentText, post.id))
      .then((data) => {
        setComments((prevValue) => [...prevValue, data]);
        setCommentText("");
      })
      .catch((error) => {
        setErrors({ onSubmitComment: error.message });
      });
  }

  const classes = useStyles();
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
        comments={comments}
        commentText={commentText}
        baseUrl={baseUrl}
        onClose={() => setOpen(false)}
        open={open}
        role={role}
        show={show}
        reason={reason}
        errors={errors}
        onLike={handleLike}
        onDislike={handleDislike}
        onDelete={handleDeleteReaction}
        onOpenReport={() => setShow(true)}
        onReport={handleReport}
        onChange={handleChange}
        onAddComment={handleAddComment}
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
