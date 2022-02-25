import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  FETCH_VIDEO,
  SEARCH_VIDEO,
  CHANGE_SELECTOR,
  USER_AUTH,
  USER_SIGNUP,
  USER_LOGIN,
  DISPLAY_MODAL,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  FETCH_FAVORITE,
  CLEAR_FAVORITE,
  FETCH_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  TOGGLE_NAV,
  VIDEO_PLAYING,
} from "./types";

export const fetchSearch = (search) => async (dispatch) => {
  const res = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
    params: {
      key: "AIzaSyDiRa97hYHhtfOlXHUw3PnObWe29inaAqw",
      part: "snippet",
      type: "video",
      maxResults: 50,
      q: search,
    },
  });
  dispatch({ type: SEARCH_VIDEO, payload: res.data });
};

export const fetchPopulars =
  (categoryId = 0) =>
  async (dispatch) => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          key: "AIzaSyDiRa97hYHhtfOlXHUw3PnObWe29inaAqw",
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          videoCategoryId: categoryId,
          regionCode: "TW",
          maxResults: 50,
        },
      }
    );
    dispatch({ type: FETCH_VIDEO, payload: res.data });
  };

export const changeSelector = (type) => {
  return {
    type: CHANGE_SELECTOR,
    payload: type,
  };
};

export const userAuth = (user) => {
  return {
    type: USER_AUTH,
    payload: user,
  };
};

export const userSignup =
  (email, password, name, setModal) => async (dispatch) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      dispatch({
        type: USER_SIGNUP,
        payload: userCredential.user,
      });
      setModal("");
      alert("註冊成功並登入");
    } catch (error) {
      alert(error.message);
    }
  };

export const userLogin = (email, password, setModal) => async (dispatch) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch({
      type: USER_LOGIN,
      payload: userCredential.user,
    });
    setModal("");
    alert("成功登入");
  } catch (error) {
    alert("帳號或密碼錯誤");
  }
};

export const displayModal = (modal) => {
  return {
    type: DISPLAY_MODAL,
    payload: modal,
  };
};

export const fetchFavorite = (userID) => async (dispatch) => {
  const res = await axios.get(
    `https://fake-yt-337110-default-rtdb.firebaseio.com/user/${userID}/favorite.json`
  );
  dispatch({ type: FETCH_FAVORITE, payload: res.data });
};

export const addFavorite = (e, userID, video) => async (dispatch) => {
  e.preventDefault();
  const res = await axios.post(
    `https://fake-yt-337110-default-rtdb.firebaseio.com/user/${userID}/favorite.json`,
    video
  );
  dispatch({ type: ADD_FAVORITE, payload: { [res.data.name]: video } });
};

export const deleteFavorite = (userID, key) => async (dispatch) => {
  await axios.delete(
    `https://fake-yt-337110-default-rtdb.firebaseio.com/user/${userID}/favorite/${key}.json`
  );
  dispatch({ type: DELETE_FAVORITE, payload: key });
};

export const clearFavorite = () => {
  return { type: CLEAR_FAVORITE };
};

export const fetchComments = (videoID) => async (dispatch) => {
  const res = await axios.get(
    `https://fake-yt-337110-default-rtdb.firebaseio.com/video/${videoID}/comments.json`
  );
  dispatch({ type: FETCH_COMMENTS, payload: res.data });
};

export const addComment =
  (videoID, user, comment, date, userID) => async (dispatch) => {
    const res = await axios.post(
      `https://fake-yt-337110-default-rtdb.firebaseio.com/video/${videoID}/comments.json`,
      {
        user,
        comment,
        date,
        userID,
      }
    );
    dispatch({
      type: ADD_COMMENT,
      payload: {
        [res.data.name]: {
          user,
          comment,
          date,
          userID,
        },
      },
    });
  };

export const deleteComment = (videoID, key) => async (dispatch) => {
  await axios.delete(
    `https://fake-yt-337110-default-rtdb.firebaseio.com/video/${videoID}/comments/${key}.json`
  );
  dispatch({ type: DELETE_COMMENT, payload: key });
};

export const editComment = (videoID, key, editContent) => async (dispatch) => {
  const res = axios.patch(
    `https://fake-yt-337110-default-rtdb.firebaseio.com/video/${videoID}/comments/${key}/.json`,
    { comment: editContent }
  );
  dispatch({ type: EDIT_COMMENT, payload: { key, editContent } });
};

export const toggleNav = () => {
  return { type: TOGGLE_NAV };
};

export const videoPlaying = (videoID) => async (dispatch) => {
  const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
    params: {
      key: "AIzaSyDiRa97hYHhtfOlXHUw3PnObWe29inaAqw",
      part: "snippet",
      id: videoID,
    },
  });
  dispatch({ type: VIDEO_PLAYING, payload: res.data.items[0] });
};
