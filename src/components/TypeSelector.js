import React from "react";
import { connect } from "react-redux";

const TypeFilter = (props) => {
  return (
    <button
      className={
        props.selector === props.id ? `selector-active` : `selector-inactive`
      }
      onClick={() => props.changeSelector(props.id)}
    >
      {props.type}
    </button>
  );
};

const mapStateToProps = (state) => {
  return {
    selector: state.selector,
  };
};

export default connect(mapStateToProps)(TypeFilter);
