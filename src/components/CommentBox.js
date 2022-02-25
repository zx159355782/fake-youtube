import React, { useState } from "react";
import { connect } from "react-redux";

import { deleteComment, editComment } from "../actions";

const CommentBox = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(
    props.comments[props.comment].comment
  );

  const features = (comment, commentOwner) => {
    if (props.user) {
      if (props.user.uid === commentOwner) {
        return (
          <div className="features">
            <i
              className="fa-solid fa-pen"
              title="編輯"
              onClick={() => setIsEditing(true)}
            ></i>
            <i
              className="fas fa-trash-alt"
              title="刪除"
              onClick={() => props.deleteComment(props.videoID, comment)}
            ></i>
          </div>
        );
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    props.editComment(props.videoID, props.comment, editContent);
  };

  return (
    <div className="comment-box">
      <div className="user-photo">
        {props.comments[props.comment].user[0].toUpperCase()}
      </div>
      <div className="comment-content">
        <div className="comment-header">
          <span className="user-name">
            {props.comments[props.comment].user}
          </span>
          <span className="time">{props.time}</span>
        </div>
        {isEditing ? (
          <form className="edit" onSubmit={(e) => handleEdit(e)}>
            <input
              className="edit-input"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="輸入編輯留言..."
            />
            <button type="submit" className="submit">
              送出
            </button>
            <button
              type="button"
              className="cancle"
              onClick={() => {
                setIsEditing(false);
                setEditContent(props.comments[props.comment].comment);
              }}
            >
              取消
            </button>
          </form>
        ) : (
          <p className="comment">{props.comments[props.comment].comment}</p>
        )}
      </div>
      {!isEditing
        ? features(props.comment, props.comments[props.comment].userID)
        : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    comments: state.comments,
  };
};

export default connect(mapStateToProps, { deleteComment, editComment })(
  CommentBox
);
