import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchComments,
  addComment,
  addFavorite,
  deleteFavorite,
  videoPlaying,
} from "../actions";
import { Link } from "react-router-dom";

import CommentBox from "../components/CommentBox";

const PlayVideo = (props) => {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    props.fetchComments(props.match.params.videoID);
    props.videoPlaying(props.match.params.videoID);
  }, [props.match.params.videoID, props.videoPlaying]);

  const handleDeleteFavorite = (e, videoID) => {
    e.preventDefault();
    for (let f in props.favorite) {
      if (videoID === props.favorite[f].id) {
        props.deleteFavorite(props.user.uid, f);
      }
    }
  };

  const handleFavorite = () => {
    let inFavorite = false;
    for (let f in props.favorite) {
      if (props.match.params.videoID === props.favorite[f].id) {
        inFavorite = true;
      }
    }
    if (inFavorite) {
      return (
        <button
          className="favorite-btn"
          onClick={(e) => handleDeleteFavorite(e, props.playing.id)}
        >
          <i
            className="fa-solid fa-heart"
            style={{ color: "rgb(255, 98, 190)" }}
          ></i>{" "}
          已加入我的最愛
        </button>
      );
    } else {
      return (
        <button
          className="favorite-btn"
          onClick={(e) => props.addFavorite(e, props.user.uid, props.playing)}
        >
          <i className="fa-solid fa-heart"></i> 加入我的最愛
        </button>
      );
    }
  };

  const renderList = () => {
    if (props.videoes) {
      let inSearch = false;
      if (props.search) {
        inSearch = props.search.items.find((i) => {
          return i.id.videoId === props.match.params.videoID;
        });
      }
      if (inSearch) {
        return props.search.items
          .filter((i) => {
            return i.id.videoId !== props.match.params.videoID;
          })
          .map((i) => {
            return (
              <Link to={`/video/${i.id.videoId}`} key={i.id.videoId}>
                <div className="play-list-item">
                  <img
                    src={i.snippet.thumbnails.default.url}
                    alt={i.snippet.title}
                  />
                  <div className="desc">
                    <p className="title">{i.snippet.title}</p>
                    <p className="channel-title">{i.snippet.channelTitle}</p>
                  </div>
                </div>
              </Link>
            );
          });
      } else {
        return props.videoes.items
          .filter((i) => {
            return i.id !== props.match.params.videoID;
          })
          .map((i) => {
            return (
              <Link to={`/video/${i.id}`} key={i.id}>
                <div className="play-list-item">
                  <img
                    src={i.snippet.thumbnails.default.url}
                    alt={i.snippet.title}
                  />
                  <div className="desc">
                    <p className="title">{i.snippet.title}</p>
                    <p className="channel-title">{i.snippet.channelTitle}</p>
                  </div>
                </div>
              </Link>
            );
          });
      }
    }
  };

  const videoData = () => {
    if (props.videoes) {
      return props.videoes.items.find((i) => {
        return i.id === props.match.params.videoID;
      });
    }
  };

  const getSearchData = () => {
    if (props.search) {
      return props.search.items.find((i) => {
        return i.id.videoId === props.match.params.videoID;
      });
    }
  };

  const getFavoriteData = () => {
    if (props.favorite) {
      return Object.keys(props.favorite).find((i) => {
        return props.favorite[i].id === props.match.params.videoID;
      });
    }
  };

  const getFinalData = () => {
    if (videoData()) {
      return videoData().snippet.title;
    } else if (getSearchData()) {
      return getSearchData().snippet.title;
    } else if (getFavoriteData()) {
      return props.favorite[getFavoriteData()].snippet.title;
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (props.user && input) {
      props.addComment(
        props.match.params.videoID,
        props.user.displayName,
        input,
        new Date().getTime(),
        props.user.uid
      );
      setInput("");
    }
  };

  const renderCommentBox = () => {
    if (props.comments) {
      return Object.keys(props.comments).map((comment) => {
        let time = new Date().getTime() - props.comments[comment].date;
        if (time < 60000) {
          time = "剛剛";
        } else if (time < 3600000) {
          time = Math.ceil(time / 60000) + "分鐘前";
        } else if (time < 86400000) {
          time = Math.ceil(time / 3600000) + "小時前";
        } else if (time < 2592000000) {
          time = Math.ceil(time / 86400000) + "天前";
        } else if (time < 31104000000) {
          time = Math.ceil(time / 2592000000) + "個月前";
        } else {
          time = Math.ceil(time / 31104000000) + "年前";
        }
        return (
          <CommentBox
            comment={comment}
            time={time}
            videoID={props.match.params.videoID}
            key={props.comments[comment].comment + props.comments[comment].date}
          />
        );
      });
    }
  };

  return (
    <div className="playvideo">
      <div className="video-primary">
        <div className="videobox">
          <iframe
            src={`https://www.youtube.com/embed/${props.match.params.videoID}`}
            frameBorder="0"
            title="youtube"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-desc">
          <h1 className="video-title">{getFinalData()}</h1>
          {handleFavorite()}
        </div>
        <p className="count">{Object.keys(props.comments).length} 則留言</p>
        <form className="add-box" onSubmit={(e) => handleAddComment(e)}>
          <div className="user-photo">
            {props.user ? props.user.displayName[0].toUpperCase() : ""}
          </div>
          <input
            type="text"
            className="add-input"
            placeholder="新增留言..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setTyping(true)}
            onBlur={() => setTyping(false)}
          />
          {typing ? (
            <React.Fragment>
              <button type="submit" className="submit">
                送出
              </button>
              <button type="button" className="cancle">
                取消
              </button>
            </React.Fragment>
          ) : (
            ""
          )}
        </form>
        <div className="comment-container">{renderCommentBox()}</div>
      </div>
      <div className="video-list">{renderList()}</div>
    </div>
  );
};

const mapStateToprops = (state) => {
  return {
    user: state.user,
    videoes: state.videoes,
    comments: state.comments,
    search: state.search,
    favorite: state.favorite,
    playing: state.playing,
  };
};

export default connect(mapStateToprops, {
  fetchComments,
  addComment,
  addFavorite,
  deleteFavorite,
  videoPlaying,
})(PlayVideo);
