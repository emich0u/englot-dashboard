import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body  bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md4 col-8">
            <h3> {profile.user.name} </h3>
            <p>{profile.tell}</p>
            <p>{profile.adress}</p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              Voir le profile
            </Link>
          </div>
          <div className="col-md-3 d-none d-md-block">
            <h4>Commende :</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <i className="fa fa-check pr-1" />
              </li>
              <li className="list-group-item">
                <i className="fa fa-check pr-1" />
              </li>
              <li className="list-group-item">
                <i className="fa fa-check pr-1" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileItem;
