import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";

function PostView({ post, baseUrl, open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={"body"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <img
          src={baseUrl + post.mediaId}
          alt={"Ups"}
          style={{ width: "100%" }}
        />
        <p>
          <b>{post.username}</b> {post.description}
        </p>
      </DialogContent>
    </Dialog>
  );
}

PostView.propTypes = {
  post: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PostView;
