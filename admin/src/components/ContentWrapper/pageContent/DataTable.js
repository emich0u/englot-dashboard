import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import Lottie from 'react-lottie';
import data from '../../../animations/data.json';
import blink from '../../../animations/blink.json';
import loading0 from '../../../animations/loading0.json';
import loading1 from '../../../animations/loading1.json';


class DataTable extends Component {

  state = {
      users: [],
      isStopped: true,
      isPaused: true,
    };

    componentDidMount() {
      this.state = {isStopped: false, isPaused: false};
        const url = `/api/admin/getUsers`;
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ users: data })
          console.log(this.state.users)
         })
      }
      renderLottie()
      {
        const defaultOptions = {
              loop: true,
              autoplay: true,
              animationData: require('../../../animations/blink.json'),
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
        };
    if (this.state.users && this.state.users.length==0)
    return (
      <Lottie options={defaultOptions}
          height={400}
          width={400}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}/>
    );
  }

  render() {


    return (
      <div className="card shadow mb-4 col-md-10">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Users' informations
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
              {this.state.users.map((user) => (
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
      </div>
    );
  }
}
export default DataTable;
