import React from "react";
import { Link } from "react-router-dom";

const ProfileAction = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" />
        Modifier votre profile
      </Link>
      <Link to="/product" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Ajouter des choses au panier
      </Link>
    </div>
  );
};
export default ProfileAction;
