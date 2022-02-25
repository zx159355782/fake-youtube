import React from "react";
import { connect } from "react-redux";

import Login from "./Login";
import Signup from "./Singup";

const Modal = (props) => {
  return (
    <div className="modal" style={{ display: props.modal ? "block" : "none" }}>
      {props.modal === "signup" ? <Signup /> : <Login />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

export default connect(mapStateToProps, {})(Modal);
