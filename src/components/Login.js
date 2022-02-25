import React, { useState } from "react";
import { connect } from "react-redux";

import { userLogin } from "../actions";
import { displayModal } from "../actions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    props.userLogin(email, password, props.displayModal);
  };

  return (
    <form
      className="account"
      onSubmit={(e) => {
        handleLogin(e);
      }}
    >
      <span className="title">登入</span>
      <input
        type="email"
        className="account-input"
        placeholder="電子信箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        className="account-input"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <div className="account-btn-group">
        <div
          className="change-btn"
          onClick={() => props.displayModal("signup")}
        >
          註冊帳號
        </div>
        <button className="account-btn">登入</button>
      </div>
      <span
        className="back"
        onClick={() => {
          props.displayModal("");
          setEmail("");
          setPassword("");
        }}
      >
        返回
      </span>
    </form>
  );
};

export default connect(null, { userLogin, displayModal })(Login);
