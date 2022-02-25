import { combineReducers } from "redux";
import videoesReducer from "./videoesReducer";
import selectorReducer from "./selectorReducer";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import modalReducer from "./modalReducer";
import favoriteReducer from "./favoriteReducer";
import commentReducer from "./commentReducer";
import navReducer from "./navReducer";
import videoPlayingReducer from "./videoPlayingReducer";

export default combineReducers({
  videoes: videoesReducer,
  selector: selectorReducer,
  search: searchReducer,
  user: userReducer,
  modal: modalReducer,
  favorite: favoriteReducer,
  comments: commentReducer,
  nav: navReducer,
  playing: videoPlayingReducer,
});
