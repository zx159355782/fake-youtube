import { CHANGE_SELECTOR } from "../actions/types";

export default function (state = 0, action) {
  switch (action.type) {
    case CHANGE_SELECTOR:
      return action.payload;
    default:
      return state;
  }
}
