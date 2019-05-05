import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearProfileLoading } from "../../actions/profilesAction";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearProfileLoading();
    this.props.logoutUser();
  };

  render() {
    const bgColors = {
      Default: "#2b3131",
      Blue: "#00B1E1",
      Cyan: "#37BC9B",
      Green: "#8CC152",
      Red: "#E9573F",
      Yellow: "#F6BB42"
    };

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Avis
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Profil & Panier
          </Link>
        </li>

        <li className="nav-item">
          <a href="#" onClick={this.onLogoutClick} className="nav-link">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{
                width: "25px",
                marginRight: "5px",
                color: "white"
              }}
              title="Yout must have a gravatar Connected to your email "
            />
            Se deconnecter
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            S'inscrire
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Se connecter
          </Link>
        </li>
      </ul>
    );
    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark  mb-4"
        style={{ backgroundColor: bgColors.Default }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            LA PATTISERIE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  {" "}
                  Produit
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearProfileLoading }
)(Navbar);
