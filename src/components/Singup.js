import React, { useState } from "react";
import { connect } from "react-redux";

import { userSignup, displayModal } from "../actions";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    props.userSignup(email, password, name, props.displayModal);
  };

  const alert = () => {
    if (password !== checkPassword && checkPassword) {
      return <p className="alert">密碼不相同!!</p>;
    } else if (password.length < 6 && password) {
      return <p className="alert">密碼長度須至少6個字!!</p>;
    }
  };

  return (
    <form className="account" onSubmit={(e) => handleSignup(e)}>
      <span className="title">註冊帳號</span>
      <input
        type="name"
        className="account-input"
        placeholder="暱稱"
        onChange={(e) => setName(e.target.value)}
        required
      ></input>
      <input
        type="email"
        className="account-input"
        placeholder="電子信箱"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        className="account-input"
        placeholder="密碼"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input
        type="password"
        className="account-input"
        placeholder="確認密碼"
        onChange={(e) => setCheckPassword(e.target.value)}
      ></input>
      {alert()}
      <div className="account-btn-group">
        <div className="change-btn" onClick={() => props.displayModal("login")}>
          返回登入
        </div>
        <button className="account-btn">註冊</button>
      </div>
      <span
        className="back"
        onClick={() => {
          props.displayModal("");
        }}
      >
        回到主頁
      </span>
    </form>
  );
};

export default connect(null, { userSignup, displayModal })(Signup);
