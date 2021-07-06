import React from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import {
  ThumbUp,
  ThumbUpOutlined,
  ThumbDown,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { ROLE_AGENT, ROLE_REGULAR } from "../../../model/Role";

function PostView({
  post,
  baseUrl,
  open,
  role,
  onClose,
  onLike,
  onDislike,
  onDelete,
}) {
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
        {(role === ROLE_AGENT || role === ROLE_REGULAR) && (
          <p>
            {post.reaction !== null && post.reaction.reaction === "LIKE" ? (
              <Button onClick={() => onDelete()}>
                <ThumbUp color="primary" />
              </Button>
            ) : (
              <Button onClick={() => onLike()}>
                <ThumbUpOutlined color="primary" />
              </Button>
            )}
            {post.reaction !== null && post.reaction.reaction === "DISLIKE" ? (
              <Button onClick={() => onDelete()}>
                <ThumbDown color="primary" />
              </Button>
            ) : (
              <Button onClick={() => onDislike()}>
                <ThumbDownOutlined color="primary" />
              </Button>
            )}
          </p>
        )}
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
  role: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostView;
