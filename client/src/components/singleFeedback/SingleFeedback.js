import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FeedbackItem from "../feedback/FeedbackItem";
import Spinner from "../common/Spinner";
import { getFeedback } from "../../actions/feedbackAction";
import CommentFrom from "./CommentFrom";
import CommentFeed from "./CommentFeed";

class SingleFeedback extends Component {
  componentDidMount() {
    this.props.getFeedback(this.props.match.params.id);
  }
  render() {
    const { feedback, loading } = this.props.feedback;
    let feedbackContent;
    if (feedback === null || loading || Object.keys(feedback).length === 0) {
      feedbackContent = <Spinner />;
    } else {
      feedbackContent = (
        <div>
          <FeedbackItem feedback={feedback} showActions={false} />
          <CommentFrom feedbackId={feedback._id} />
          <CommentFeed feedbackId={feedback._id} comments={feedback.comments} />
        </div>
      );
    }
    return (
      <div className="feedback">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Tout les avis
              </Link>
              {feedbackContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SingleFeedback.propTypes = {
  getFeedback: PropTypes.func.isRequired,
  feedback: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  feedback: state.feedback
});
export default connect(
  mapStateToProps,
  { getFeedback }
)(SingleFeedback);
