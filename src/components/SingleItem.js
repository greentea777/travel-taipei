import React from "react";
import { useParams } from "react-router-dom";

const SingleItem = ({ travelData }) => {
  const { itemid } = useParams();
  const singleItem = travelData.find((item) => item.id == itemid);
  console.log(singleItem);
  return (
    <div>
      <h1>{singleItem.name}</h1>
      <img
        src={
          singleItem.images.length < 1
            ? "https://www.bcpva.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
            : singleItem.images[0].src
        }
        alt={singleItem.name}
      />
      <p>{singleItem.introduction}</p>
    </div>
  );
};

export default SingleItem;
