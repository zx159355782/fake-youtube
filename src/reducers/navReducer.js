import { TOGGLE_NAV } from "../actions/types";

export default function (state = true, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return !state;
    default:
      return state;
  }
}
