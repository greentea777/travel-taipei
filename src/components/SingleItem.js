import React, { useState } from "react";
import { useParams } from "react-router-dom";

const SingleItem = ({ travelData }) => {
  const [isParagraph, setIsParagraph] = useState(false);
  const { itemid } = useParams();
  const singleItem = travelData.find((item) => item.id == itemid);

  const handleParagraphShow = () => {
    setIsParagraph(!isParagraph);
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
        <h2>Comment</h2>
      </section>
    </div>
  );
};

export default SingleItem;
