import React from "react";
import { connect } from "react-redux";

import Item from "./Item";

const MostPopular = (props) => {
  const renderResults = () => {
    if (props.videoes)
      return props.videoes.items.map((video) => {
        return <Item video={video} key={video.id} />;
      });
  };

  return <div className="items">{renderResults()}</div>;
};

const mapStateToProps = (state) => {
  return {
    videoes: state.videoes,
  };
};

export default connect(mapStateToProps)(MostPopular);
