import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import FeedbackForm from "./FeedbackForm";
import FeedbackFeed from "./FeedbackFeed";

import Spinner from "../common/Spinner";
import { getFeedbacks } from "../../actions/feedbackAction";

class Feedback extends Component {
  componentDidMount() {
    this.props.getFeedbacks();
  }

  render() {
    const { feedbacks, loading } = this.props.feedback;
    let feedbackContent;
    if (feedbacks === null || loading) {
      feedbackContent = <Spinner />;
    } else {
      feedbackContent = <FeedbackFeed feedbacks={feedbacks} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <FeedbackForm />
              {feedbackContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Feedback.propTypes = {
  feedback: PropTypes.object.isRequired,
  getFeedbacks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  feedback: state.feedback
});
export default connect(
  mapStateToProps,
  { getFeedbacks }
)(Feedback);
