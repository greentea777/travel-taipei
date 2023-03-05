import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { database, auth } from "../config/firebase";
import Comments from "./Comments";

const SingleItem = ({ travelData, commentList, setRerender, authUser }) => {
  const [isParagraph, setIsParagraph] = useState(false);
  const { itemid } = useParams();
  const singleItem = travelData.find((item) => item.id == itemid);
  const [comment, setComment] = useState("");

  const handleParagraphShow = () => {
    setIsParagraph(!isParagraph);
  };

  const commentCollectionRef = collection(database, "comments");

  let date = new Date();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const formatDate = (current_datetime) => {
    let formatted_date =
      ("0" + date.getDate()).slice(-2) +
      "/" +
      months[date.getMonth()] +
      "/" +
      date.getFullYear() +
      " " +
      ("0" + current_datetime.getHours()).slice(-2) +
      ":" +
      ("0" + current_datetime.getMinutes()).slice(-2);
    return formatted_date;
  };

  const [isEdit, setIsEdit] = useState(false);

  const createComment = async (e) => {
    e.preventDefault();
    if (!auth.currentUser || comment < 1) {
      return;
    }
    const time = formatDate(date);

    await addDoc(commentCollectionRef, {
      comment,
      author: {
        name: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
      },
      itemId: itemid,
      time: time,
      order: commentList.length + 1,
    });

    setRerender((prev) => !prev);
    setIsTextareaOn(false);
    setIsEdit(false);
    setSelectId("");
    setComment("");
  };

  const ref = useRef();
  const deleteComment = async (id) => {
    const commentPost = doc(database, "comments", id);

    await deleteDoc(commentPost);
    setComment("");
    setSelectId("");
    setIsTextareaOn(false);
    setIsEdit(false);

    setRerender((prev) => !prev);
  };
  const [isTextareaOn, setIsTextareaOn] = useState(false);

  const handleTextarea = () => {
    if (!auth.currentUser) {
      alert("Please sign in to add a comment!");
    }

    if (isTextareaOn) {
      return;
    }
    setIsTextareaOn(!isTextareaOn);
  };

  const closeTextarea = () => {
    setIsTextareaOn(false);
    setIsEdit(false);
    setSelectId("");
    setComment("");
  };

  const [selectId, setSelectId] = useState("");

  const editComment = async (item, id) => {
    ref.current?.focus();
    setSelectId(id);
    setIsEdit(true);
    setIsTextareaOn(true);
    setComment(item);
  };

  const saveComment = async (item, id) => {
    const commentPost = doc(database, "comments", id);
    await updateDoc(commentPost, { comment: item });
    setIsTextareaOn(false);
    setIsEdit(false);
    setSelectId("");
    setComment("");
    setRerender((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="singleItem">
      <section className="info-section">
        <h1 className="singleItem-title">{singleItem.name}</h1>
        <img
          className="singleItem-img"
          src={
            singleItem.images.length < 1
              ? "https://www.bcpva.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
              : singleItem.images[0].src
          }
          alt={singleItem.name}
        />
        <p className="singleItem-introduction">
          {!isParagraph && singleItem.introduction.length > 200
            ? singleItem.introduction.slice(0, 200)
            : singleItem.introduction}
          {!isParagraph && singleItem.introduction.length > 200 ? (
            <span onClick={handleParagraphShow}> View More</span>
          ) : singleItem.introduction.length < 200 ? (
            ""
          ) : (
            <span onClick={handleParagraphShow}>View Less</span>
          )}
        </p>
        <h2>Information</h2>
        <h3>Category</h3>
        <p className="tag-container">
          {singleItem.category.map((category, index) => (
            <span key={index} className="item-category nowrap">
              {category.name}
            </span>
          ))}
        </p>
        <h3>Services</h3>
        <p className="tag-container">
          {singleItem.service.map((service, index) => (
            <span key={index} className="item-category nowrap">
              {service.name}
            </span>
          ))}
        </p>
        <h3>Address</h3>
        <p>{singleItem.address}</p>
        <h3>Friendly Reminder</h3>
        <p>{singleItem.remind > 0 ? singleItem.remind : "none"}</p>
      </section>

      <section className="comment-section">
        <h2>
          {`${
            commentList.filter((item) => item.itemId === itemid).length < 2
              ? "Comment"
              : "Comments"
          }`}{" "}
          ({commentList.filter((item) => item.itemId === itemid).length})
        </h2>
        {commentList
          .sort((a, b) => a.order - b.order)
          .map(
            (item) =>
              item.itemId === itemid && (
                <Comments
                  key={item.id}
                  item={item}
                  deleteComment={() => deleteComment(item.id)}
                  editComment={editComment}
                  authUser={authUser}
                  saveComment={saveComment}
                  comment={comment}
                  isEdit={isEdit}
                  selectId={selectId}
                />
              )
          )}

        {authUser && isTextareaOn ? (
          <>
            <form className="form-container" onSubmit={createComment}>
              <textarea
                ref={ref}
                cols="30"
                rows="10"
                placeholder="comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </form>

            {isEdit && commentList.find((a) => a.id === selectId) ? (
              <button
                className="saveBtn"
                onClick={() => saveComment(comment, selectId)}
              >
                Save
              </button>
            ) : (
              <button className="submitBtn" onClick={createComment}>
                Submit
              </button>
            )}
            <button className="cancleBtn" onClick={closeTextarea}>
              Cancel
            </button>
          </>
        ) : (
          <button
            className="addBtn"
            style={{ marginBottom: "200px" }}
            onClick={handleTextarea}
          >
            Add a comment
          </button>
        )}
      </section>
    </div>
  );
};

export default SingleItem;
