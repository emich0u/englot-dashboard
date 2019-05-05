import React, { Component } from "react";
import PropTypes from "prop-types";
import FeedbackItem from "./FeedbackItem";
class FeedbackFeed extends Component {
  render() {
    const { feedbacks } = this.props;
    return feedbacks.map(feedback => (
      <FeedbackItem key={feedback._id} feedback={feedback} />
    ));
  }
}
FeedbackFeed.propTypes = {
  feedbacks: PropTypes.array.isRequired
};
export default FeedbackFeed;
