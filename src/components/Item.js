import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addFavorite, deleteFavorite } from "../actions";
const Item = (props) => {
  let vc = 0;
  let pa = new Date().getTime() - Date.parse(props.video.snippet.publishedAt);

  const handleFavoriteBtn = (videoID) => {
    let same = false;
    for (let f in props.favorite) {
      if (videoID === props.favorite[f].id) {
        same = true;
      }
    }
    if (same) {
      return (
        <i
          className="fas fa-star star"
          onClick={(e) => {
            handleDeleteFavorite(e, props.video.id);
          }}
        ></i>
      );
    } else {
      return (
        <i
          className="far fa-star"
          onClick={(e) => props.addFavorite(e, props.user.uid, props.video)}
        ></i>
      );
    }
  };

  const handleDeleteFavorite = (e, videoID) => {
    e.preventDefault();
    for (let f in props.favorite) {
      if (videoID === props.favorite[f].id) {
        props.deleteFavorite(props.user.uid, f);
      }
    }
  };

  if (props.video.statistics.viewCount >= 10000) {
    vc = Math.ceil(props.video.statistics.viewCount / 10000) + "萬";
  } else if (props.video.statistics.viewCount >= 100000000) {
    vc = props.video.statistics.viewCount.toFixed(1) + "億";
  }

  if (pa < 60000) {
    pa = "剛剛";
  } else if (pa < 3600000) {
    pa = Math.ceil(pa / 60000) + "分鐘前";
  } else if (pa < 86400000) {
    pa = Math.ceil(pa / 3600000) + "小時前";
  } else if (pa < 2592000000) {
    pa = Math.ceil(pa / 86400000) + "天前";
  } else if (pa < 31104000000) {
    pa = Math.ceil(pa / 2592000000) + "個月前";
  } else {
    pa = Math.ceil(pa / 31104000000) + "年前";
  }

  return (
    <Link to={`/video/${props.video.id}`} className="item">
      <img
        src={props.video.snippet.thumbnails.medium.url}
        alt={props.video.snippet.title}
      />
      <p className="title">{props.video.snippet.title}</p>
      <p className="channelTitle">{props.video.snippet.channelTitle}</p>
      <div className="desc-container">
        <p className="desc">觀看次數:{`${vc}次 ‧ ${pa}`}</p>
        {handleFavoriteBtn(props.video.id)}
      </div>
    </Link>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    favorite: state.favorite,
  };
};

export default connect(mapStateToProps, {
  addFavorite,
  deleteFavorite,
})(Item);
