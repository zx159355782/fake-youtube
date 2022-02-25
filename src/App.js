import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { connect } from "react-redux";
import { userAuth, fetchFavorite, fetchPopulars } from "./actions";

import firebaseConfig from "./config/config";

import Header from "./components/Header";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SideNav from "./components/SideNav";
import Modal from "./components/Modal";
import Favorite from "./pages/Favorite";
import PlayVideo from "./pages/PlayVideo";
import ScrollToTop from "./components/ScrollToTop";

import "./style/App.css";
import "./style/fontawesome/css/all.css";

const App = ({
  userAuth,
  user,
  fetchFavorite,
  selector,
  fetchPopulars,
  nav,
}) => {
  initializeApp(firebaseConfig);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userAuth(user);
      } else {
        userAuth(null);
      }
    });
  }, [userAuth]);

  useEffect(() => fetchPopulars(selector), [selector]);

  useEffect(() => {
    if (user) {
      fetchFavorite(user.uid);
    }
  }, [user]);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <div>
          <Header />
          <div className={nav ? "page" : "page-padding"}>
            <SideNav />
            <Route
              exact
              path="/search/:searchResult"
              component={SearchResults}
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/user/favorite" component={Favorite} />
            <Route path="/video/:videoID" component={PlayVideo} />
          </div>
        </div>
        <Modal />
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user, selector: state.selector, nav: state.nav };
};

export default connect(mapStateToProps, {
  userAuth,
  fetchFavorite,
  fetchPopulars,
})(App);
