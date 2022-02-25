import { USER_AUTH, USER_LOGIN, USER_SIGNUP } from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case USER_AUTH:
      return action.payload;
    case USER_SIGNUP:
      return action.payload;
    case USER_LOGIN:
      return action.payload;
    default:
      return state;
  }
}
