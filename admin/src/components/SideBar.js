import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class SideBar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div>
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Welcome to Englot dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <li className="nav-item">
          <Link className="nav-link" to="addProduct">
          <i className="fas fa-fw fa-table" />

            <span>Englot exercises</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/products">
            <i className="fas fa-fw fa-chart-area" />
            <span>Check users' statistics</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/user">
            <i className="fas fa-fw fa-table" />
            <span>My users</span>
          </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
      </div>
    );
    const guestLinks = (
      <div>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-chart-area" />
            <span>Login</span>
          </Link>
        </li>
      </div>
    );
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-smile fa-10x mx-3 fa-spin"></i>
          </div>
          <li><span class="fa-li" ><i class="fas fa-check-square"></i></span>Englot dashboard</li>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        {isAuthenticated ? authLinks : guestLinks}
        {/* <!-- Sidebar Toggler (Sidebar) --> */}
      </ul>
    );
  }
}
SideBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(SideBar);
