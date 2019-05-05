import axios from "axios";
import {
  ADD_FEEDBACK,
  GET_ERRORS,
  GET_FEDDBACKS,
  GET_FEDDBACK,
  FEEDBACK_LOADING,
  DELETE_FEEDBACK,
  CLEAR_ERRORS
} from "./types";

// add feedback
export const addFeedback = feedbackData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/feedback", feedbackData)
    .then(res =>
      dispatch({
        type: ADD_FEEDBACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Feedbacks
export const getFeedbacks = () => dispatch => {
  dispatch(setFeedbackLoading());
  axios
    .get("/api/feedback")
    .then(res =>
      dispatch({
        type: GET_FEDDBACKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FEDDBACKS,
        payload: null
      })
    );
};

// Delete feedback
export const deleteFeedback = id => dispatch => {
  axios
    .delete(`/api/feedback/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_FEEDBACK,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/feedback/like/${id}`)
    .then(res => dispatch(getFeedbacks()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// remove like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/feedback/unlike/${id}`)
    .then(res => dispatch(getFeedbacks()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set loading state
export const setFeedbackLoading = () => {
  return {
    type: FEEDBACK_LOADING
  };
};

// Get Feedback
export const getFeedback = id => dispatch => {
  dispatch(setFeedbackLoading());
  axios
    .get(`/api/feedback/${id}`)
    .then(res =>
      dispatch({
        type: GET_FEDDBACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FEDDBACK,
        payload: null
      })
    );
};

// add Comment

export const addComment = (feedbackId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/feedback/comment/${feedbackId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_FEDDBACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete comment
export const deleteComment = (feedbackId, commentId) => dispatch => {
  axios
    .delete(`/api/feedback/comment/${feedbackId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_FEDDBACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
