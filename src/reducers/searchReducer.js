import { SEARCH_VIDEO } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case SEARCH_VIDEO:
      return action.payload;
    default:
      return state;
  }
}
