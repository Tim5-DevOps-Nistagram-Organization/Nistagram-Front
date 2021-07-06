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

function PostList({ posts }) {
  const [post, setPost] = useState(newPostDetails);
  const [open, setOpen] = useState(false);

  function handleOnView(postId) {
    PostService.getById(postId)
      .then((data) => {
        setPost(data);
        setOpen(true);
      })
      .catch((error) => toast.error(error.message));
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
      />
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(object).isRequired,
};

export default PostList;
