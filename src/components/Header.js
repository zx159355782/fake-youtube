import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Route, useHistory } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";

import {
  fetchSearch,
  changeSelector,
  displayModal,
  clearFavorite,
  toggleNav,
} from "../actions";

import TypeSelector from "./TypeSelector";
import PhoneSearch from "./PhoneSearch";
import ScrollContainer from "react-indiana-drag-scroll";

const Header = (props) => {
  let history = useHistory();
  const [input, setInput] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

  const out = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("已成功登出");
      })
      .catch(() => {
        alert("登出失敗");
      });
  };

  const types = [
    { name: "全部", id: 0 },
    { name: "遊戲", id: 20 },
    { name: "運動", id: 17 },
    { name: "娛樂", id: 24 },
    { name: "科技", id: 28 },
    { name: "People & Blogs", id: 22 },
    { name: "寵物與動物", id: 15 },
    { name: "汽車和交通工具", id: 2 },
    { name: "音樂", id: 10 },
    { name: "新聞", id: 25 },
    { name: "電影和動畫", id: 1 },
    { name: "教育", id: 27 },
  ];
  const renderSelectors = () => {
    return types.map((type) => (
      <TypeSelector
        type={type.name}
        changeSelector={props.changeSelector}
        id={type.id}
        key={type.id}
      />
    ));
  };

  const renderhHeaderBottom = () => {
    return (
      <ScrollContainer
        className={`scroll-container ${
          props.nav ? "header-bottom" : "header-bottom-padding"
        }`}
      >
        <div className="selector-container">{renderSelectors()}</div>
      </ScrollContainer>
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input) {
      props.fetchSearch(input);
      history.push(`/search/${input}`);
    }
  };

  return (
    <div className="header">
      <div className="header-top">
        {toggleSearch ? (
          <PhoneSearch
            handleSearch={handleSearch}
            setInput={setInput}
            setToggleSearch={setToggleSearch}
          />
        ) : (
          ""
        )}
        <div>
          <div className="bars">
            <i className="fa fa-bars" onClick={() => props.toggleNav()}></i>
          </div>
          <Link to="/" className="title">
            <i className="fab fa-youtube "></i>{" "}
            <span className="title-name">Fake-YouTube</span>
          </Link>
        </div>

        <form onSubmit={(e) => handleSearch(e)}>
          <input
            className="searchbar"
            type="text"
            placeholder="搜尋"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button className="btn">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <button className="search-btn" onClick={() => setToggleSearch("true")}>
          <i className="fas fa-search"></i>
        </button>
        <ul className="account-btn">
          {!props.user ? (
            <li
              className="login-btn"
              onClick={() => props.displayModal("login")}
            >
              <i className="far fa-user-circle"></i> 登入
            </li>
          ) : (
            <React.Fragment>
              <li
                style={{ marginLeft: "10px" }}
              >{`Hi! ${props.user.displayName}`}</li>
              <li
                className="login-btn"
                onClick={() => {
                  out();
                  props.clearFavorite();
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
                登出
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
      <Route exact path="/" component={renderhHeaderBottom} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    nav: state.nav,
  };
};

export default connect(mapStateToProps, {
  fetchSearch,
  changeSelector,
  displayModal,
  clearFavorite,
  toggleNav,
})(Header);
