import { FETCH_VIDEO } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_VIDEO:
      return action.payload;
    default:
      return state;
  }
}
