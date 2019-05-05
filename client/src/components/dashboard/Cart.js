import React, { Component } from "react";

class Cart extends Component {
  render() {
    return (
      <div className="row">
        <h4 className="mb-2">Panier</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Nom du produit</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Macarons</td>
              <td>1kg</td>
              <td>8.00DT</td>
              <td>
                <button className="btn btn-danger">Supprimer</button>
              </td>
            </tr>
            <tr>
              <td>Gateau aux pistache</td>
              <td>1P</td>
              <td>60.00dt</td>
              <td>
                <button className="btn btn-danger">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h4 className="mb-2 col-md-6">
          Quantité totale : <b>2</b>
        </h4>
        <h4 className="mb-2 col-md-">
          prix totale : <b>68.00dt</b>
        </h4>
      </div>
    );
  }
}
export default Cart;
