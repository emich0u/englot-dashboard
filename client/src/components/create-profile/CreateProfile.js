import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfile } from "../../actions/profilesAction";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      adress: "",
      tell: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      adress: this.state.adress,
      tell: this.state.tell
    };
    this.props.createProfile(profileData, this.props.history);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="create-profile">
        <div className="conatiner">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-q text-center">Crée votre profile</h1>
              <p className="lead text-center">
                ces information nous aide a bien recevoir votre commende
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Votre Pseudo"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="c'est un unique pseudo pour votre profile URL "
                />

                <TextFieldGroup
                  placeholder="* Votre tell"
                  name="tell"
                  value={this.state.tell}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Votre Adress"
                  name="adress"
                  value={this.state.adress}
                  onChange={this.onChange}
                  error={errors.adress}
                />

                <button className="btn btn-info btn-block mt-4">Crée</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.protoType = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
