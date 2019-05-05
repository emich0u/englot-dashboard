import { ADD_PRODUCT, GET_PRODUCT, DELETE_PRODUCT } from "../actions/types";

const initialState = {
  products: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
