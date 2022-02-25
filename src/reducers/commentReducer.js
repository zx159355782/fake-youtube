import {
  FETCH_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...action.payload };
    case ADD_COMMENT: {
      return { ...state, ...action.payload };
    }
    case DELETE_COMMENT: {
      const { [action.payload]: deleted, ...updated } = state;
      return { ...updated };
    }
    case EDIT_COMMENT: {
      state[action.payload.key].comment = action.payload.editContent;
      return { ...state };
    }
    default:
      return state;
  }
}
