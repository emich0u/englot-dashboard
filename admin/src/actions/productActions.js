// ADMIN SIDE

import axios from "axios";

import { ADD_PRODUCT, GET_PRODUCT, DELETE_PRODUCT, GET_ERRORS } from "./types";

// Add product
export const addPorduct = (productData, history) => dispatch => {
  axios
    .post("/api/products", productData)
    .then(res => history.push("/products"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
