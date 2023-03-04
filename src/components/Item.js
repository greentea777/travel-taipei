import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { database, auth } from "../config/firebase";

const Item = ({ item, handleCategorySearch, likeList, setRerender }) => {
  // const randomIndex = Math.floor(Math.random() * item.images.length);
  const [isLike, setIsLike] = useState(false);
  const likeCollectionRef = collection(database, "likeList");

  // a bug needs to be solved: Preventing click events on double click
  const handleLikeBtn = async (id) => {
    let nextIsLike = !isLike;

    if (auth.currentUser) {
      setIsLike(nextIsLike);

      if (auth.currentUser.uid !== isMatch[0]?.author.userId) {
        nextIsLike = true;
        await addDoc(likeCollectionRef, {
          isLike: nextIsLike,
          itemId: item.id,
          author: {
            name: auth.currentUser.displayName,
            userId: auth.currentUser.uid,
          },
        });

        setRerender((prev) => !prev);
      } else if (isMatch[0]?.itemId === item.id) {
        const likeListData = doc(database, "likeList", id);
        await updateDoc(likeListData, { isLike: nextIsLike });
        setRerender((prev) => !prev);
      }
    }
  };

  useEffect(() => {
    const deleteLikeList = async (id) => {
      if (!auth.currentUser) {
        return;
      }

      if (auth.currentUser.uid !== isMatch[0]?.author.userId) {
        return;
      }
      const likeListData = doc(database, "likeList", id);
      await deleteDoc(likeListData);
      setIsLike(false);
    };

    deleteLikeList(isMatch[0]?.id);
    return () => deleteLikeList(isMatch[0]?.id);
  }, [isLike]);

  const isMatch = likeList.filter((list) => {
    if (auth.currentUser) {
      return (
        list.itemId === item.id && list.author.userId == auth.currentUser?.uid
      );
    }
  });

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
        {/* <span
          style={{
            backgroundColor:
              auth.currentUser &&
              isMatch[0]?.isLike &&
              auth.currentUser.uid === isMatch[0].author.userId
                ? "red"
                : "green",
          }}
          onClick={() => handleLikeBtn(isMatch[0]?.id)}
        >
          <FaRegHeart />
        </span> */}

        <div className="distric-likeBtn-container">
          <p className="item-distric">
            {<FaMapMarkerAlt />}
            {item.distric}
          </p>
          <span
            className="likeBtn"
            onClick={() => handleLikeBtn(isMatch[0]?.id)}
          >
            {auth.currentUser &&
            isMatch[0]?.isLike &&
            auth.currentUser.uid === isMatch[0].author.userId ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </span>
        </div>

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
