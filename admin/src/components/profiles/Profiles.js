import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileAction";
import ProfileItem from "./ProfileItem";
import axios from 'axios';
import Lottie from 'react-lottie';

class Profiles extends Component {

  state = {
    usersTab:[],
    isStopped: true,
    isPaused: true,
    adminsTab:[],
    };
  componentDidMount() {
    //this.props.getProfiles();
    const url = `/api/admin/getUsers`;

    //getRequestForColumnCharts
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ usersTab: data })
     })

     const urlAdmin = `/api/admin/getAdmins`;
     //getRequestForUsers
     axios.get(urlAdmin).then(response => response.data)
     .then((data) => {
       this.setState({ adminsTab: data })
      })

  }

  renderLottie()
  {
    const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: require('../../animations/blink.json'),
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
    };
if (this.state.usersTab && this.state.usersTab.length==0)
return (
  <Lottie options={defaultOptions}
      height={400}
      width={400}
      isStopped={this.state.isStopped}
      isPaused={this.state.isPaused}/>
);
}
  render() {
    const { profile, loading } = this.props.profile;
    let profileItems;
    if (profile === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profile.length > 0) {
        profileItems = profile.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found ...</h4>;
      }
    }
    return (
      <div className="card shadow mb-4 col-md-10">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            All my users
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
          {this.renderLottie()}
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>First Name Last Name</th>
                  <th>Username</th>
                  <th>Created Date</th>
                  <th>Level</th>
                </tr>
              </thead>
              {this.state.usersTab.map((user) => (
              <tbody>
                <tr>
                <td>
                <i class="fas fa-user fa-5x" ></i>
                </td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.createdDate}</td>
                  <td>{user.lesson}</td>
                </tr>
              </tbody>
              ))}
            </table>
          </div>
        </div>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            All my admins
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
          {this.renderLottie()}
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Date</th>
                </tr>
              </thead>
              {this.state.adminsTab.map((user) => (
              <tbody>
                <tr>
                <td>
                <i class="fas fa-user fa-5x" ></i>
                </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.date}</td>
                </tr>
              </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
