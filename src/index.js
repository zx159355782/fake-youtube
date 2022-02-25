import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

import App from "./App";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //工具
const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
