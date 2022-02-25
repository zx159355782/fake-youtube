import { VIDEO_PLAYING } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case VIDEO_PLAYING:
      return action.payload;
    default:
      return state;
  }
}
