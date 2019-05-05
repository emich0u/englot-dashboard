import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addFeedback } from "../../actions/feedbackAction";
class FeedbackForm extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;

    const newFeedback = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addFeedback(newFeedback);
    this.setState({ text: "" });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Partager votre avis avec les autres clients{" "}
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Donner votre avis"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Partager votre avis !
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

FeedbackForm.propTypes = {
  addFeedback: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addFeedback }
)(FeedbackForm);
