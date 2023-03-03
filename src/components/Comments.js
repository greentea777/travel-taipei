import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, database } from "../config/firebase";

const Comments = ({
  item,
  deleteComment,
  authUser,
  editComment,
  saveComment,
  comment,
  isEdit,
  selectId,
}) => {
  const selectedStyle = {
    backgroundColor: selectId === item.id ? "rgba(128, 128, 128, 0.275)" : "",
  };

  return (
    <div className="comment-container" style={selectedStyle}>
      <div className="comment-name-container">
        <h3>{item.author.name}</h3>
        <time>{item.time}</time>
      </div>
      <p className="comment-content">{item.comment}</p>

      <div className="comment-button-container">
        {authUser && item.author.userId === auth.currentUser.uid && (
          <>
            {!isEdit && (
              <button
                className="editBtn"
                onClick={() => editComment(item.comment, item.id)}
              >
                Edit
              </button>
            )}
            {isEdit && selectId === item.id && (
              <button
                className="saveBtn"
                onClick={() => saveComment(comment, item.id)}
              >
                Save
              </button>
            )}
            <button className="deleteBtn" onClick={deleteComment}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
