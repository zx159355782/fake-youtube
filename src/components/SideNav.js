import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SideNav = ({ nav }) => {
  return (
    <div className={nav ? "nav" : "hide-nav"}>
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-home"></i>
            <br />
            首頁
          </Link>
        </li>
        <li>
          <Link to="/user/favorite">
            <i className="fas fa-box"></i>
            <br />
            我的最愛
          </Link>
        </li>
      </ul>
    </div>
  );
};

const mapStatToProps = (state) => {
  return {
    nav: state.nav,
  };
};

export default connect(mapStatToProps)(SideNav);
