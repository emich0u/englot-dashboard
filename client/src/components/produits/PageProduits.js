import React, { Component } from "react";
import ProduitItem from "./ProduitItem";

class PageProduits extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <ProduitItem />
          <ProduitItem />
          <ProduitItem />
          <ProduitItem />
          <ProduitItem />
          <ProduitItem />
          <ProduitItem />
          <ProduitItem />
          <ProduitItem />
        </div>
      </div>
    );
  }
}
export default PageProduits;
