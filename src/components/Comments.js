import React from "react";

const Comments = ({ item }) => {
  return (
    <div className="comment-container">
      <div className="comment-name-container">
        <h3>{item.author.name}</h3>
        <time>{item.time}</time>
      </div>

      <p className="comment-content">{item.comment}</p>
    </div>
  );
};

export default Comments;
