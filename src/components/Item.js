import React from "react";

const Item = ({ item }) => {
  console.log(item.images.length);

  const randomIndex = Math.floor(Math.random() * item.images.length);

  return (
    <div className="item">
      <h3>{item.name}</h3>
      <img
        src={
          item.images.length < 1
            ? "https://www.bcpva.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
            : item.images[randomIndex].src
        }
        alt={item.name}
      />
      <p>{item.distric}</p>
    </div>
  );
};

export default Item;
