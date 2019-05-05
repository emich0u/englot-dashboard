import {
  ADD_FEEDBACK,
  GET_FEDDBACKS,
  FEEDBACK_LOADING,
  DELETE_FEEDBACK,
  GET_FEDDBACK
} from "../actions/types";

const initialState = {
  feedbacks: [],
  feedback: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FEEDBACK_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FEDDBACKS:
      return {
        ...state,
        feedbacks: action.payload,
        loading: false
      };
    case ADD_FEEDBACK:
      return {
        ...state,
        feedbacks: [action.payload, ...state.feedbacks]
      };
    case DELETE_FEEDBACK:
      return {
        ...state,
        feedbacks: state.feedbacks.filter(
          feedback => feedback._id !== action.payload
        )
      };
    case GET_FEDDBACK:
      return {
        ...state,
        feedback: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
