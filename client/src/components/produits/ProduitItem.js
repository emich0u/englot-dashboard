import React, { Component } from "react";

class ProduitItem extends Component {
  render() {
    return (
      <div className="card card-product col-md-4 mb-2 ml-0">
        <div className="img-wrap">
          <img src="https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/06/15092400/Brown-Cake-PNG-Image-883x1024.png" />
        </div>

        <figcaption className="info-wrap">
          <h4 className="title">Gateau chocolat</h4>
          <p className="desc">lorem</p>
          {/* <div className="rating-wrap">
            <div className="label-rating">132 reviews</div>
            <div className="label-rating">154 orders </div>
          </div> */}
        </figcaption>
        <div className="bottom-wrap">
          <a href="" className="btn btn-sm btn-primary float-right">
            Ajouter au panier
          </a>
          <div className="price-wrap h5">
            <span className="price-new">1280dt</span>{" "}
            {/* <del className="price-old">1980dt</del> */}
          </div>
        </div>
      </div>
    );
  }
}
export default ProduitItem;
