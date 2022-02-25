import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SearchItem = (props) => {
  return (
    <Link to={`/video/${props.video.id.videoId}`}>
      <div className="search-item">
        <img
          src={props.video.snippet.thumbnails.medium.url}
          alt={props.video.snippet.title}
        />
        <div className="desc">
          <p className="title">{props.video.snippet.title}</p>
          <p className="channel-title">{props.video.snippet.channelTitle}</p>
          <p className="description">{props.video.snippet.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
