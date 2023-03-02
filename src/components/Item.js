import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const Item = ({ item, handleCategorySearch }) => {
  const randomIndex = Math.floor(Math.random() * item.images.length);

  return (
    // <Link to={`/attraction/${item.id}`}>
    <div className="item">
      <img
        src={
          item.images.length < 1
            ? "https://www.bcpva.com/wp-content/themes/consultix/images/no-image-found-360x260.png"
            : item.images[0].src
        }
        alt={item.name}
      />
      <div className="item-content">
        <h3 className="item-title">{item.name}</h3>
        <p className="item-distric">
          {<FaMapMarkerAlt />}
          {item.distric}
        </p>

        <p className="item-introduction">
          {item.introduction.slice(0, 10)}...
          <span>
            <Link to={`/attraction/${item.id}`}>read more</Link>
          </span>
        </p>
        <div className="category-container">
          {item.category.map((category, index) => (
            <span
              className="item-category nowrap"
              key={index}
              onClick={() => handleCategorySearch(category.name)}
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default Item;
