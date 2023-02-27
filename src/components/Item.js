import React from "react";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  const randomIndex = Math.floor(Math.random() * item.images.length);

  return (
    <Link to={`/attraction/${item.id}`}>
      <div className="item">
        <img
          src={
            item.images.length < 1
              ? "https://www.bcpva.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
              : item.images[0].src
          }
          alt={item.name}
        />
        <h3>{item.name}</h3>
        <p>{item.distric}</p>
      </div>
    </Link>
  );
};

export default Item;
