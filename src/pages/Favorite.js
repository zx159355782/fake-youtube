import React from "react";
import { connect } from "react-redux";
import { deleteFavorite } from "../actions";
import { Link } from "react-router-dom";

const Favorite = (props) => {
  const handleDeleteFavorite = (e, videoID) => {
    e.preventDefault();
    for (let f in props.favorite) {
      if (videoID === props.favorite[f].id) {
        props.deleteFavorite(props.user.uid, f);
      }
    }
  };

  const renderFavoriteList = () => {
    if (props.favorite) {
      return Object.keys(props.favorite).map((f) => {
        return (
          <Link
            to={`/video/${props.favorite[f].id}`}
            key={props.favorite[f].id}
          >
            <div className="list-item">
              <span className="index">
                {Object.keys(props.favorite).indexOf(f) + 1}
              </span>
              <div className="list-description">
                <img
                  src={props.favorite[f].snippet.thumbnails.medium.url}
                  className="list-img"
                />
                <div className="list-text">
                  <p className="video-title">
                    {props.favorite[f].snippet.title}
                  </p>
                  <p className="channel">
                    {props.favorite[f].snippet.channelTitle}
                  </p>
                </div>
              </div>
              <div
                className="delete-favorite"
                onClick={(e) => {
                  handleDeleteFavorite(e, props.favorite[f].id);
                }}
              ></div>
            </div>
          </Link>
        );
      });
    }
  };

  return (
    <div className="favorite">
      <div className="sidebar">
        <div className="first-contaner">
          <img
            src={
              props.favorite[Object.keys(props.favorite)[0]]
                ? props.favorite[Object.keys(props.favorite)[0]].snippet
                    .thumbnails.medium.url
                : "https://i.ytimg.com/img/no_thumbnail.jpg"
            }
          />
          <div className="overlay">我的最愛</div>
        </div>
        <h1>我的最愛</h1>
        <div
          style={{ fontSize: "1.4rem", color: "#aaaaaa", marginTop: "1rem" }}
        >
          共{props.favorite ? Object.keys(props.favorite).length : 0}部影片
        </div>
      </div>
      <div className="primary">{renderFavoriteList()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favorite: state.favorite,
    user: state.user,
  };
};

export default connect(mapStateToProps, { deleteFavorite })(Favorite);
