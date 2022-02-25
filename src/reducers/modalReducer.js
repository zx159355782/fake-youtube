import { DISPLAY_MODAL } from "../actions/types";

export default function (state = "", action) {
  switch (action.type) {
    case DISPLAY_MODAL:
      return action.payload;
    default:
      return state;
  }
}
