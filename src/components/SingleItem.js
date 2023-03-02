import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database, auth } from "../config/firebase";
import Comments from "./Comments";

const SingleItem = ({ travelData, commentList, setRerender }) => {
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
    setComment("");
  };

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
        <h2>Comment ({commentList.length})</h2>
        {commentList
          .sort((a, b) => a.order - b.order)
          .map(
            (item) =>
              item.itemId === itemid && <Comments key={item.id} item={item} />
          )}

        <form onSubmit={createComment}>
          <textarea
            cols="30"
            rows="10"
            placeholder="comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button>leave a comment</button>
        </form>
      </section>
    </div>
  );
};

export default SingleItem;
