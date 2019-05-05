import React, { Component } from "react";
import PropTypes from "prop-types";

import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, feedbackId } = this.props;
    return comments.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
        feedbackId={feedbackId}
      />
    ));
  }
}
CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  feedbackId: PropTypes.string.isRequired
};

export default CommentFeed;
