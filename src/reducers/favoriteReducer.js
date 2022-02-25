import {
  ADD_FAVORITE,
  FETCH_FAVORITE,
  DELETE_FAVORITE,
  CLEAR_FAVORITE,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_FAVORITE:
      return { ...action.payload };
    case ADD_FAVORITE:
      return { ...state, ...action.payload };
    case DELETE_FAVORITE:
      const { [action.payload]: deletedValue, ...updated } = state;
      return updated;
    case CLEAR_FAVORITE:
      return {};
    default:
      return state;
  }
}
