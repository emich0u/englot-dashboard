import axios from "axios";
import { GET_ERRORS } from "./types";


export const addExercice = (exerciceData, history) => dispatch => {
  axios
    .post("/api/exercicef/add", exerciceData)
    .then(res => history.push("/exercicef"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
